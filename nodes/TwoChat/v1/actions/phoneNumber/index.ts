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
				name: 'Check',
				value: 'check',
				description: 'Check a phone number',
				action: 'Check a phone number',
			},
		],
		default: 'check',
	},
	...check.description,
];
