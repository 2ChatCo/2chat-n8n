import type { WabaProperties } from '../../types';

export const wabaSendDescription: WabaProperties = [
	{
		displayName: 'WABA Number Name or ID',
		name: 'wabaNumber',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWabaNumbers',
		},
		options: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The WABA number you have connected to 2Chat. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'To Number',
		name: 'toNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The number you want to send your message to',
	},
	{
		displayName: 'Message Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The content of the message you want to send. Either this or URL must be provided.',
	},
];
