import type { WabaProperties } from '../../types';

export const wabaSendTemplateDescription: WabaProperties = [
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
				operation: ['sendTemplate'],
			},
		},
		default: '',
		description: 'The WABA number you have connected to 2Chat. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Template Name or ID',
		name: 'templateUuid',
		type: 'options',
		typeOptions: {
			loadOptionsDependsOn: ['wabaNumber'],
			loadOptionsMethod: 'getWabaTemplates',
		},
		options: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendTemplate'],
			},
		},
		default: '',
		description: 'The approved message template to send. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'To Number',
		name: 'toNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendTemplate'],
			},
		},
		default: '',
		description: 'The number you want to send your message to',
	},
	{
		displayName: 'Body Parameters',
		name: 'bodyParams',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendTemplate'],
			},
		},
		default: {},
		description: 'Values to replace template placeholders ({{1}}, {{2}}, etc.) in order',
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value for the next template placeholder',
					},
				],
			},
		],
	},
	{
		displayName: 'Header Parameters',
		name: 'headerParams',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendTemplate'],
			},
		},
		default: {},
		description: 'Values to replace template headers ({{1}}, {{2}}, etc.) in order',
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value for the next template placeholder',
					},
				],
			},
		],
	},
];
