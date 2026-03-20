import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function sendTemplate(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const wabaNumber = this.getNodeParameter('wabaNumber', index) as string;
	const toNumber = this.getNodeParameter('toNumber', index) as string;
	const templateUuid = this.getNodeParameter('templateUuid', index) as string;
	const bodyParams = this.getNodeParameter('bodyParams', index, {}) as IDataObject;
	const headerParams = this.getNodeParameter('headerParams', index, {}) as IDataObject;

	const body: IDataObject = {
		from_number: wabaNumber,
		to_number: toNumber,
		template_uuid: templateUuid,
	};

	const values = (bodyParams.values as IDataObject[]) ?? [];
	if (values.length > 0) {
		body.params = { body: values.map((v) => v.value) };
	}

	const headers = (headerParams.values as IDataObject[]) ?? [];
	if (headers.length > 0) {
		body.params = { ...(body.params as IDataObject), headers: headers.map((h) => h.value) };
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
