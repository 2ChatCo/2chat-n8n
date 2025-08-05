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
			description: 'Your 2Chat API key from the developers section',
		},
		{
			displayName: '2Chat APIServer',
			name: 'server',
			type: 'string',
			default: 'http://host.docker.internal:8085/open',
			description: 'The server to connect to. Only has to be set if 2Chat API is used.',
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
			baseURL: 'http://host.docker.internal:8085/open',
			url: '/info',
			method: 'GET'
		},
	};
}
