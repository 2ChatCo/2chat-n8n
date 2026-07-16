import type { WabaProperties } from '../../types';

export const wabaSendInteractiveDescription: WabaProperties = [
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
				operation: ['sendInteractive'],
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
				operation: ['sendInteractive'],
			},
		},
		default: '',
		description: 'The number you want to send your message to',
	},
	{
		displayName: 'Interactive Type',
		name: 'interactiveType',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
			},
		},
		options: [
			{
				name: 'Call-To-Action URL Button',
				value: 'cta_url',
				description: 'A single button that opens a URL',
			},
			{
				name: 'List Message',
				value: 'list',
				description: 'A button that opens a list of selectable options, grouped into sections',
			},
			{
				name: 'Reply Buttons',
				value: 'button',
				description: 'Up to 3 quick-reply buttons',
			},
		],
		default: 'button',
		description: 'The type of interactive message to send',
	},
	{
		displayName: 'Body Text',
		name: 'bodyText',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
			},
		},
		default: '',
		description: 'The main text content of the message',
	},
	{
		displayName: 'Header Text',
		name: 'headerText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
			},
		},
		default: '',
		description: 'Optional text shown above the body',
	},
	{
		displayName: 'Footer Text',
		name: 'footerText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
			},
		},
		default: '',
		description: 'Optional text shown below the body',
	},
	// Call-To-Action URL Button
	{
		displayName: 'Button Display Text',
		name: 'ctaDisplayText',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
				interactiveType: ['cta_url'],
			},
		},
		default: '',
		description: 'The text shown on the call-to-action button',
	},
	{
		displayName: 'Button URL',
		name: 'ctaUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
				interactiveType: ['cta_url'],
			},
		},
		default: '',
		placeholder: 'https://example.com',
		description: 'The URL opened when the button is tapped',
	},
	// Reply Buttons
	{
		displayName: 'Buttons',
		name: 'buttons',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
				interactiveType: ['button'],
			},
		},
		default: {},
		description: 'Up to 3 quick-reply buttons',
		options: [
			{
				name: 'values',
				displayName: 'Button',
				values: [
					{
						displayName: 'Button ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Unique identifier returned in the reply webhook when this button is tapped',
					},
					{
						displayName: 'Button Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'The text shown on the button (max 20 characters)',
					},
				],
			},
		],
	},
	// List Message
	{
		displayName: 'List Button Text',
		name: 'listButtonText',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
				interactiveType: ['list'],
			},
		},
		default: '',
		description: 'The text on the button that opens the list of options',
	},
	{
		displayName: 'Sections',
		name: 'sections',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['waba'],
				operation: ['sendInteractive'],
				interactiveType: ['list'],
			},
		},
		default: {},
		description: 'Groups of selectable rows (10 rows max across all sections)',
		options: [
			{
				name: 'values',
				displayName: 'Section',
				values: [
					{
						displayName: 'Section Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Required when there is more than one section',
					},
					{
						displayName: 'Rows',
						name: 'rows',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						options: [
							{
								name: 'values',
								displayName: 'Row',
								values: [
									{
										displayName: 'Row ID',
										name: 'id',
										type: 'string',
										default: '',
										description: 'Unique identifier returned in the reply webhook when this row is selected',
									},
									{
										displayName: 'Row Title',
										name: 'title',
										type: 'string',
										default: '',
										description: 'The text shown for this row (max 24 characters)',
									},
									{
										displayName: 'Row Description',
										name: 'description',
										type: 'string',
										default: '',
										description: 'Optional secondary text shown for this row (max 72 characters)',
									},
								],
							},
						],
					},
				],
			},
		],
	},
];
