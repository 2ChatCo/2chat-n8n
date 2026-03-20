import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type TwoChatMap = {
	message: 'send' | 'sendToGroup';
	phoneNumber: 'check';
	waba: 'send' | 'sendTemplate';
};

export type TwoChat = AllEntities<TwoChatMap>;

export type TwoChatMessage = Entity<TwoChatMap, 'message'>;

export type TwoChatPhoneNumber = Entity<TwoChatMap, 'phoneNumber'>;

export type TwoChatWaba = Entity<TwoChatMap, 'waba'>;

export type MessageProperties = PropertiesOf<TwoChatMessage>;

export type PhoneNumberProperties = PropertiesOf<TwoChatPhoneNumber>;

export type WabaProperties = PropertiesOf<TwoChatWaba>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
