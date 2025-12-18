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
    description: 'Triggers on 2Chat events (messages, phone calls, status updates, etc.)',
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
        name: 'event',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'New Participant Joined Whatsapp Group',
            value: 'whatsapp.group.join',
            description: 'Triggers when someone joins a group',
          },
          {
            name: 'New Whatsapp Conversation Started',
            value: 'whatsapp.conversation.new',
            description: 'Triggers when a new WhatsApp conversation is started',
          },
          {
            name: 'New Whatsapp Message Sent or Received',
            value: 'whatsapp.message.new',
            description:
              'Triggers when a new message is either sent or received on 2Chat. Works for messages sent by agents or sent by your users/customers.',
          },
          {
            name: 'Participant Left Whatsapp Group',
            value: 'whatsapp.group.leave',
            description: 'Triggers when someone leaves a group',
          },
          {
            name: 'Participant Removed From Whatsapp Group',
            value: 'whatsapp.group.remove',
            description: 'Triggers when someone is kicked/removed from a group',
          },
          {
            name: 'Phone Call - Incoming Completed',
            value: 'call.incoming.completed',
            description: 'Triggers when an incoming phone call is completed (answered or missed)',
          },
          {
            name: 'Phone Call - Outbound Completed',
            value: 'call.outgoing.completed',
            description: 'Triggers when an outbound phone call is completed (answered or failed)',
          },
          {
            name: 'Phone Call - Status Update',
            value: 'call.status.update',
            description: 'Triggers when a phone call status changes (e.g., ringing, answered, ended)',
          },
          {
            name: 'Whatsapp Call Made',
            value: 'whatsapp.call.made',
            description:
              'Triggers when a new WhatsApp call is made using the WhatsApp application for your connected number',
          },
          {
            name: 'Whatsapp Call Received',
            value: 'whatsapp.call.received',
            description:
              'Triggers when a new WhatsApp call is received or missed on your connected number',
          },
          {
            name: 'Whatsapp Group Message Reaction Received',
            value: 'whatsapp.group.message.reaction',
            description: 'Triggers when a group participant reacts to a message',
          },
          {
            name: 'Whatsapp Group Message Received',
            value: 'whatsapp.group.message.received',
            description: 'Triggers when a new WhatsApp Group Message is received on the configured group',
          },
          {
            name: 'Whatsapp Message Edited',
            value: 'whatsapp.message.edited',
            description:
              'Triggers when a message is edited. It will also trigger for group messages being edited.',
          },
          {
            name: 'Whatsapp Message Reaction Received',
            value: 'whatsapp.message.reaction',
            description: 'Triggers when a WhatsApp message is reacted to',
          },
          {
            name: 'Whatsapp Message Received',
            value: 'whatsapp.message.received',
            description: 'Triggers when a WhatsApp message is received on your 2Chat connected number',
          },
          {
            name: 'Whatsapp Message Sent',
            value: 'whatsapp.message.sent',
            description: 'Triggers when a WhatsApp message is sent from your 2Chat connected number',
          },
        ],
        default: 'whatsapp.message.new',
        required: true,
        description: 'The events to listen for',
      },
			{
        displayName: 'WhatsApp Number Name or ID',
        name: 'whatsappNumber',
        type: 'options',
        displayOptions: {
					hide: {
            event: [
							'call.outgoing.completed',
							'call.incoming.completed',
							'call.status.update'
						],
					}
				},
        typeOptions: {
					loadOptionsMethod: 'getNumbers',
				},
        default: '',
        required: true,
        description: 'Limit the triggers to this WhatsApp Number. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
			{
        displayName: 'WhatsApp Group Name or ID',
        name: 'on_group',
        type: 'options',
				displayOptions: {
					show: {
						event: [
							'whatsapp.group.message.received',
							'whatsapp.group.message.reaction',
							'whatsapp.group.join',
							'whatsapp.group.leave',
							'whatsapp.group.remove'
						],
					},
					hide: {
						whatsappNumber: [''],
					}
				},
        typeOptions: {
					loadOptionsDependsOn: ['whatsappNumber'],
					loadOptionsMethod: 'getGroups',
				},
        default: '',
        description: 'Limit the triggers to this WhatsApp Group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Virtual Number Name or ID',
        name: 'virtualNumber',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getVirtualNumbers',
        },
        displayOptions: {
					show: {
						event: [
							'call.outgoing.completed',
							'call.incoming.completed',
							'call.status.update'
						],
					}
				},
        default: '',
        description: 'Limit the triggers to this Virtual Number. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
			{
        displayName: 'Time Period Value',
        name: 'time_period',
        type: 'options',
        options: [
          { name: 'All Time', value: 'all-time' },
          { name: 'Day', value: 'day' },
          { name: 'Hour', value: 'hour' },
          { name: 'Month', value: 'month' },
          { name: 'Week', value: 'week' },
          { name: 'Year', value: 'year' },
        ],
				displayOptions: {
					show: {
						event: ['whatsapp.conversation.new'],
					},
				},
        default: 'all-time',
        description: 'The time period of your preference to consider a conversation new. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
					const event = this.getNodeParameter('event') as string;
					const response = await apiRequest.call(this, 'GET', 'webhooks', {});

          if (!Array.isArray(response)) {
            this.logger.debug('Invalid response from webhook check', { response });
            return false;
          }

          return response.some((webhook: { hook_url: string, event_name: string }) =>
						 webhook.hook_url === webhookUrl && event === webhook.event_name
					);
        } catch (error) {
          this.logger.error('Error checking webhook existence', { error });
          throw new NodeApiError(this.getNode(), error);
        }
      },

      async create(this: IHookFunctions): Promise<boolean> {
        try {
					const webhookData = this.getWorkflowStaticData('node');

          const event = this.getNodeParameter('event') as string;
          if (!event) {
            throw new NodeOperationError(this.getNode(), 'At least one event must be selected');
          }

          const webhookUrl = this.getNodeWebhookUrl('default');
					const onGroup = this.getNodeParameter('on_group', '') as string;

					const payload: Record<string, any> = {
						hook_url: webhookUrl,
						on_number: this.getNodeParameter('whatsappNumber', '') as string,
					};

					if (onGroup && onGroup !== 'all') {
						payload.to_group_uuid = onGroup;
					}

					switch (event) {
						case 'whatsapp.conversation.new': {
							const timePeriod = this.getNodeParameter('time_period', '') as string;
							if (timePeriod) {
								payload.time_period = timePeriod;
							}
							break;
						}
						case 'call.outgoing.completed':
						case 'call.incoming.completed':
						case 'call.status.update': {
							payload.channel_uuid = this.getNodeParameter('virtualNumber', '') as string;
							break;
						}
					}

					const response = await apiRequest.call(this, 'POST', `webhooks/subscribe/${event}`, payload);

					if (!response || !response.success) {
						throw new NodeOperationError(this.getNode(), 'Failed to create webhook');
					}

					webhookData.webhookId = response.data.uuid;

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
