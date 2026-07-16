import type { INodeProperties } from 'n8n-workflow';

import * as send from './send';
import * as sendInteractive from './sendInteractive';
import * as sendTemplate from './sendTemplate';

export { send, sendTemplate, sendInteractive };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['waba'],
			},
		},
		options: [
			{
				name: 'Send a WABA Message',
				value: 'send',
				description: 'Sends a message via a WhatsApp Business API number',
				action: 'Send a WABA message',
			},
			{
				name: 'Send Template Message',
				value: 'sendTemplate',
				description: 'Sends an approved template message via a WABA number',
				action: 'Send a WABA template message',
			},
			{
				name: 'Send Interactive Message',
				value: 'sendInteractive',
				description: 'Sends a call-to-action URL button, reply buttons, or a list message via a WABA number',
				action: 'Send a WABA interactive message',
			},
		],
		default: 'send',
	},
	...send.description,
	...sendTemplate.description,
	...sendInteractive.description,
];
