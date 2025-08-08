import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function check(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const phoneNumber = this.getNodeParameter('phoneNumber', index) as string;
	const phoneNumberToCheck = this.getNodeParameter('phoneNumberToCheck', index) as string;

	const endpoint = `whatsapp/check-number/${phoneNumber}/${phoneNumberToCheck}`;

	const response = await apiRequest.call(this, 'GET', endpoint);

	return this.helpers.returnJsonArray(response as IDataObject[]);
}
