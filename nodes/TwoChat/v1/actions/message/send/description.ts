import type { MessageProperties } from '../../types';

export const messageSendDescription: MessageProperties = [
	{
		displayName: 'WhatsApp Number Name or ID',
		name: 'whatsappNumber',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getNumbers',
		},
		options: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'sendToGroup'],
			},
		},
		default: '',
		description: 'The WhatsApp number you have connected to 2Chat. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'To Number',
		name: 'toNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The number you want to send your message to',
	},
	{
		displayName: 'WhatsApp Group Name or ID',
		name: 'whatsappGroupUuid',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendToGroup'],
			},
		},
		typeOptions: {
			loadOptionsDependsOn: ['whatsappNumber'],
			loadOptionsMethod: 'getGroups',
		},
		default: '',
		required: true,
		description: 'The WhatsApp group name or ID you intend to send the message to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Message Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'sendToGroup'],
			},
		},
		default: '',
		description: 'The content of the message you want to send. Either this or Pin Location must be provided.',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'sendToGroup'],
			},
		},
		default: '',
		placeholder: 'https://uploads-ssl.webflow.com/6281a9c52303343ff7c3b269/62a1648ee0273340bf38e3a9_logo-2C.svg',
		description: 'The URL of the media file you want to attach to the message. This value is optional.',
	},
	{
		displayName: 'Pin Location',
		name: 'pinLocation',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'sendToGroup'],
			},
		},
		default: {},
		description: 'The location of the pin you want to attach to the message. This value is optional.',
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
			},
		],
	},
];
