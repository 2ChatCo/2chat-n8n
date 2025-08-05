import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import type { TwoChat } from './types';
import * as message from './message';
import * as phoneNumber from './phoneNumber';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<TwoChat>('resource', i);
		const operation = this.getNodeParameter('operation', i);

		const twochat = {
			resource,
			operation,
		} as TwoChat;

		try {
			if (twochat.resource === 'message') {
				if (twochat.operation === 'send' || twochat.operation === 'sendToGroup') {
					responseData = await message.send.execute.call(this, i);
				}
			} else if (twochat.resource === 'phoneNumber') {
				responseData = await phoneNumber[twochat.operation].execute.call(this, i);
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [operationResult];
}
