import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function send(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const wabaNumber = this.getNodeParameter('wabaNumber', index) as string;
	const toNumber = this.getNodeParameter('toNumber', index) as string;
	const text = this.getNodeParameter('text', index, '') as string;
	const url = this.getNodeParameter('url', index, '') as string;

	if (!text && !url) {
		throw new Error('Either "Message Text" or "URL" must be provided');
	}

	const body: IDataObject = {
		from_number: wabaNumber,
		to_number: toNumber,
	};

	if (text) {
		body.text = text;
	}

	if (url) {
		body.url = url;
	}

	const responseData = await apiRequest.call(
		this,
		'POST',
		'waba/send-message',
		body,
		{},
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
