import {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  NodeConnectionType,
  NodeApiError,
  NodeOperationError
} from 'n8n-workflow';

import { apiRequest } from '../TwoChat/v1/transport';
import { loadOptions } from '../TwoChat/v1/methods';


export class TwoChatTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: '2Chat Trigger',
    name: 'twoChatTrigger',
    icon: 'file:2chat.svg',
    group: ['trigger'],
    version: 1,
    description: 'Triggers on 2Chat events (messages, status updates, etc.)',
    defaults: {
      name: '2Chat Trigger',
    },
    inputs: [],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'twoChatApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: [
          {
						name: 'Whatsapp Message Received',
						value: 'whatsapp.message.received',
						description: 'Triggers when a WhatsApp message is received on your 2Chat connected number'
					},
          { name: 'Whatsapp Message',
						value: 'whatsapp.message.new',
						description: 'Triggers when a new message is either sent or received on 2Chat. Works for messages sent by agents or sent by your users/customers.'
					}
        ],
        default: ['whatsapp.message.new'],
        required: true,
        description: 'The events to listen for',
      },
			{
        displayName: 'WhatsApp Number Name or ID',
        name: 'on_number',
        type: 'options',
        typeOptions: {
					loadOptionsMethod: 'getNumbers',
				},
        default: '',
        required: true,
        description: 'Limit the triggers to this WhatsApp Number. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
    ],
  };

	methods = {
		loadOptions: loadOptions
	};

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        try {

          const webhookUrl = this.getNodeWebhookUrl('default');
					const events = this.getNodeParameter('events') as string[];
					const response = await apiRequest.call(this, 'GET', 'webhooks', {});

          if (!Array.isArray(response)) {
            this.logger.debug('Invalid response from webhook check', { response });
            return false;
          }

          return response.some((webhook: { hook_url: string, event_name: string }) =>
						 webhook.hook_url === webhookUrl && events.includes(webhook.event_name)
					);
        } catch (error) {
          this.logger.error('Error checking webhook existence', { error });
          throw new NodeApiError(this.getNode(), error);
        }
      },

      async create(this: IHookFunctions): Promise<boolean> {
        try {
					const webhookData = this.getWorkflowStaticData('node');

          const events = this.getNodeParameter('events', []) as string[];
          if (!events.length) {
            throw new NodeOperationError(this.getNode(), 'At least one event must be selected');
          }

          const webhookUrl = this.getNodeWebhookUrl('default');
					const existingWebhooks = await apiRequest.call(this, 'GET', 'webhooks', {});

          if (Array.isArray(existingWebhooks)) {
            return true;
          }

					for (const event of events) {
						const response = await apiRequest.call(this, 'POST', `webhooks/subscribe/${event}`, {
							hook_url: webhookUrl,
							on_number: this.getNodeParameter('on_number') as string,
						});

						if (!response || !response.success) {
							throw new NodeOperationError(this.getNode(), 'Failed to create webhook');
						}

						webhookData.webhookId = response.data.uuid;

					}

          return true;
        } catch (error) {
          this.logger.error('Error creating webhook', { error });
          throw new NodeApiError(this.getNode(), error);
        }
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        try {

					const webhookData = this.getWorkflowStaticData('node');

					if (webhookData.webhookId !== undefined) {
						const endpoint = `webhooks/${webhookData.webhookId}`;

						const response = await apiRequest.call(this, 'DELETE', endpoint);

						if (!response.success) {
							return false;
						}

						delete webhookData.webhookId;
					}
					return true;

        } catch (error) {
          this.logger.error('Error deleting webhook', { error });
          throw new NodeApiError(this.getNode(), error);
        }
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    let body = req.body;

    if (body) {
      body = {
        ...body,
        receivedAt: new Date().toISOString(),
        webhookEvent: body.event || 'unknown',
      };

      this.logger.debug('Received webhook', { event: body.event });
    }

    return {
      workflowData: [this.helpers.returnJsonArray([body])],
    };
  }
}
