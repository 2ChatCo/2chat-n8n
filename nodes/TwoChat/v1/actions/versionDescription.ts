import { NodeConnectionTypes, type INodeTypeDescription } from 'n8n-workflow';

import * as message from './message';
import * as phoneNumber from './phoneNumber';
import * as waba from './waba';

export const versionDescription: Pick<
	INodeTypeDescription,
	'version' | 'defaults' | 'inputs' | 'outputs' | 'credentials' | 'properties'
> = {
	version: 1,
	defaults: {
		name: '2Chat',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
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
