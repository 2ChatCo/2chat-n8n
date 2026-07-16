import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TwoChatApi implements ICredentialType {
	name = 'twoChatApi';
	displayName = '2Chat API';
	documentationUrl = 'https://developers.2chat.co/docs/intro';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your 2Chat API key from the developers section.',
		},
		{
			displayName: '2Chat API Server URL',
			name: 'server',
			type: 'string',
			default: 'https://api.p.2chat.io/open',
			description: 'The server URL of the 2Chat API to connect to.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-User-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.p.2chat.io/open',
			url: '/info',
			method: 'GET'
		},
	};
}
