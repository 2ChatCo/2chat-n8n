import type { INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';
import { VersionedNodeType } from 'n8n-workflow';

import { TwoChatV1 } from './v1/TwoChatV1.node';

export class TwoChat extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: '2Chat',
			name: 'twoChat',
			icon: 'file:2chat.svg',
			group: ['output'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Sends data to 2Chat',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new TwoChatV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
