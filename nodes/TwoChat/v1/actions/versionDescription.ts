/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'n8n-workflow';


import * as message from './message';
import * as phoneNumber from './phoneNumber';
import * as waba from './waba';

export const versionDescription: INodeTypeDescription = {
	displayName: '2Chat',
	name: 'twoChat',
	icon: 'file:2chat.svg',
	group: ['output'],
	version: 1,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Sends data to 2Chat',
	defaults: {
		name: '2Chat',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'twoChatApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Message',
					value: 'message',
				},
				{
					name: 'Phone Number',
					value: 'phoneNumber',
				},
				{
					name: 'WABA',
					value: 'waba',
				},
			],
			default: 'message',
		},
		...message.descriptions,
		...phoneNumber.descriptions,
		...waba.descriptions,
	],
};
