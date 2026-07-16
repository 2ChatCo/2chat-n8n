import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { apiRequestAllItems } from '../transport';

// Get all the available numbers
export async function getNumbers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'whatsapp/get-numbers';
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint, {});

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];

	for (const data of responseData) {
		if (data && Array.isArray(data.numbers)) {
			for (const number of data.numbers) {
				if (number && number.friendly_name && number.phone_number) {
					const connectionStatus = number.connection_status === 'C' ? '🟢 Connected' : '🔴 Disconnected';

					returnData.push({
						name: `${number.friendly_name}`,
						value: number.phone_number,
						description: `${connectionStatus} | ${number.formatted_phone_number || number.phone_number} | ${number.iso_country_code || ''}`,
					});
				}
			}
		}
	}

	return sortOptions(returnData);
}

export async function getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const whatsappNumber = this.getNodeParameter('whatsappNumber') as string;
	if (!whatsappNumber) {
		return [];
	}

	const endpoint = `whatsapp/groups/${whatsappNumber}`;
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint);

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [
		{
			name: 'All Groups',
			value: 'all',
			description: 'Send to all available groups'
		}
	];

	for (const response of responseData) {
		if (response && Array.isArray(response.data)) {
			for (const group of response.data) {
				if (group && group.wa_group_name && group.uuid) {

					const groupName = group.is_muted ? 'Muted' : 'Unmuted';
					const readOnly = group.read_only ? 'Read Only' : 'Read Write';

					returnData.push({
						name: `${group.wa_group_name}`,
						value: group.uuid,
						description: `${groupName} | ${readOnly}`,
					});
				}
			}
		}
	}

	return sortOptions(returnData);
}

export async function getVirtualNumbers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'voip/virtual-numbers';
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint);

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];

	for (const data of responseData) {
		if (data && Array.isArray(data.numbers)) {
			for (const number of data.numbers) {
				if (number && number.friendly_name && number.phone_number) {
					const connectionStatus = number.status === 1 && number.status_text === 'ACTIVE' ? '🟢 Active' : '🔴 Inactive';

					returnData.push({
						name: `${number.friendly_name}`,
						value: number.uuid,
						description: `${connectionStatus} | ${number.formatted_phone_number || number.phone_number} | ${number.iso_country_code || ''}`,
					});
				}
			}
		}
	}

	return sortOptions(returnData);
}

export async function getWabaNumbers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'waba/numbers';
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint);

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];

	for (const data of responseData) {
		if (data && Array.isArray(data.numbers)) {
			for (const number of data.numbers) {
				if (number && number.friendly_name && number.phone_number) {
					const connectionStatus = number.connection_status === 'C' ? '🟢 Active' : '🔴 Inactive';

					returnData.push({
						name: `${number.friendly_name}`,
						value: number.phone_number,
						description: `${connectionStatus} | ${number.phone_number} | ${number.iso_country_code || ''}`,
					});
				}
			}
		}
	}

	return sortOptions(returnData)
}

export async function getWabaTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const wabaNumber = this.getNodeParameter('wabaNumber') as string;
	if (!wabaNumber) {
		return [];
	}

	const endpoint = 'waba/templates';
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint, {}, { phone_number: wabaNumber.replace(/^\+/, '') });

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];

	for (const data of responseData) {
		if (data && Array.isArray(data.templates)) {
			for (const template of data.templates) {
				if (template && template.name && template.uuid) {
					returnData.push({
						name: template.name,
						value: template.uuid,
						description: template.status ?? '',
					});
				}
			}
		}
	}

	return sortOptions(returnData);
}

function sortOptions(options: INodePropertyOptions[]): INodePropertyOptions[] {
	return options.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
}
