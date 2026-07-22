import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { router } from './actions/router';
import { versionDescription } from './actions/versionDescription';
import { loadOptions } from './methods';

export class TwoChatV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
			icon: { light: 'file:2chat.svg', dark: 'file:2chat-dark.svg' },
			usableAsTool: true,
		};
	}

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		try {
			return await router.call(this);
		} catch (error) {
			const nodeError = new NodeApiError(this.getNode(), error as JsonObject);

			if (this.continueOnFail()) {
				const executionData: INodeExecutionData = {
					json: { error: nodeError.message },
					error: nodeError,
					pairedItem: { item: 0 },
				};

				return [[executionData]];
			}

			throw nodeError;
		}
	}
}
