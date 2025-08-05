import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type TwoChatMap = {
	message: 'send' | 'sendToGroup';
	phoneNumber: 'check';
};

export type TwoChat = AllEntities<TwoChatMap>;

export type TwoChatMessage = Entity<TwoChatMap, 'message'>;

export type TwoChatPhoneNumber = Entity<TwoChatMap, 'phoneNumber'>;

export type MessageProperties = PropertiesOf<TwoChatMessage>;

export type PhoneNumberProperties = PropertiesOf<TwoChatPhoneNumber>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
