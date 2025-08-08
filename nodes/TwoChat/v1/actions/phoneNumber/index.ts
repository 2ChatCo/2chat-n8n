import type { INodeProperties } from 'n8n-workflow';

import * as check from './check';

export { check };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['phoneNumber'],
			},
		},
		options: [
			{
				name: 'Check a Phone Number for WhatsApp Account',
				value: 'check',
				description: 'Check a phone number for a WhatsApp account',
				action: 'Check a phone number for whatsapp account',
			},
		],
		default: 'check',
	},
	...check.description,
];
