import type { INodeProperties } from 'n8n-workflow';

import * as send from './send';

export { send };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['message'],
			},
		},
		options: [
			{
				name: 'Send a WhatsApp Message',
				value: 'send',
				description: 'Sends a message to a WhatsApp-enabled phone number',
				action: 'Send a whatsapp message',
			},
			{
				name: 'Send a Message to a WhatsApp Group',
				value: 'sendToGroup',
				description: 'Sends message to the specified WhatsApp group',
				action: 'Send a message to a whatsapp group',
			},
		],
		default: 'send',
	},
	...send.description,
];
