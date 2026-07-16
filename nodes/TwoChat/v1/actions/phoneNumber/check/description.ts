import type { PhoneNumberProperties } from '../../types';

export const checkPhoneNumberDescription: PhoneNumberProperties = [
	{
		displayName: 'WhatsApp Number Name or ID',
		name: 'phoneNumber',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getNumbers',
		},
		options: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['phoneNumber'],
				operation: ['check'],
			},
		},
		default: '',
		placeholder: '+595981048477',
		description: 'The Phone Number has that you connected to 2Chat. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Phone Number to Check',
		name: 'phoneNumberToCheck',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['phoneNumber'],
				operation: ['check'],
			},
		},
		default: '',
		placeholder: '+5215512345432',
		description: 'The number you want to check',
	},
];
