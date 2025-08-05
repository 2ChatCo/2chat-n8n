import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function send(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const fromNumber = this.getNodeParameter('fromNumber', index) as string;
	const text = this.getNodeParameter('text', index, '') as string;
	const url = this.getNodeParameter('url', index, '') as string;
	const pinLocation = this.getNodeParameter('pinLocation', index, {}) as IDataObject;
	const whatsappGroupUuid = this.getNodeParameter('whatsappGroupUuid', index, '') as string;
	let toNumber = '';

	try {
		toNumber = this.getNodeParameter('toNumber', index, '') as string;
	} catch (error) {
	}

	const hasPinLocation = Object.keys(pinLocation).length > 0;
	if (!text && !url && !hasPinLocation) {
		throw new Error('Either "Message Text", "URL" or "Pin Location" must be provided');
	}

	if (!toNumber && !whatsappGroupUuid) {
		throw new Error('Either "To Number" or "Whatsapp Group UUID" must be provided');
	}

	const body: IDataObject = {
		from_number: fromNumber,
	};

	if (text) {
		body.text = text;
	}

	if (url) {
		body.url = url;
	}

	if (hasPinLocation) {
		if (text) {
			body.text = '';
		}
		body.pin = pinLocation;
	}

	if (whatsappGroupUuid && !toNumber) {
		body.to_group_uuid = whatsappGroupUuid;
	} else if (toNumber) {
		body.to_number = toNumber;
	}

	// Make API request
	const responseData = await apiRequest.call(
		this,
		'POST',
		'whatsapp/send-message',
		body,
		{},
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
