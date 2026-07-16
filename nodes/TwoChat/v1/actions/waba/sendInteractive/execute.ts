import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function sendInteractive(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const wabaNumber = this.getNodeParameter('wabaNumber', index) as string;
	const toNumber = this.getNodeParameter('toNumber', index) as string;
	const interactiveType = this.getNodeParameter('interactiveType', index) as 'cta_url' | 'button' | 'list';
	const bodyText = this.getNodeParameter('bodyText', index) as string;
	const headerText = this.getNodeParameter('headerText', index, '') as string;
	const footerText = this.getNodeParameter('footerText', index, '') as string;

	const interactive: IDataObject = {
		type: interactiveType,
		body: { text: bodyText },
	};

	if (headerText) {
		interactive.header = { type: 'text', text: headerText };
	}

	if (footerText) {
		interactive.footer = { text: footerText };
	}

	if (interactiveType === 'cta_url') {
		const ctaDisplayText = this.getNodeParameter('ctaDisplayText', index) as string;
		const ctaUrl = this.getNodeParameter('ctaUrl', index) as string;

		interactive.action = {
			name: 'cta_url',
			parameters: {
				display_text: ctaDisplayText,
				url: ctaUrl,
			},
		};
	} else if (interactiveType === 'button') {
		const buttonsCollection = this.getNodeParameter('buttons', index, {}) as IDataObject;
		const buttons = (buttonsCollection.values as IDataObject[]) ?? [];

		if (buttons.length === 0) {
			throw new Error('At least one button must be provided');
		}

		if (buttons.length > 3) {
			throw new Error('A maximum of 3 buttons is allowed');
		}

		interactive.action = {
			buttons: buttons.map((button) => ({
				type: 'reply',
				reply: {
					id: button.id,
					title: button.title,
				},
			})),
		};
	} else if (interactiveType === 'list') {
		const listButtonText = this.getNodeParameter('listButtonText', index) as string;
		const sectionsCollection = this.getNodeParameter('sections', index, {}) as IDataObject;
		const sections = (sectionsCollection.values as IDataObject[]) ?? [];

		if (sections.length === 0) {
			throw new Error('At least one section must be provided');
		}

		let totalRows = 0;
		const mappedSections = sections.map((section) => {
			const rowsCollection = (section.rows as IDataObject) ?? {};
			const rows = (rowsCollection.values as IDataObject[]) ?? [];
			totalRows += rows.length;

			const mappedSection: IDataObject = {
				rows: rows.map((row) => {
					const mappedRow: IDataObject = {
						id: row.id,
						title: row.title,
					};

					if (row.description) {
						mappedRow.description = row.description;
					}

					return mappedRow;
				}),
			};

			if (section.title) {
				mappedSection.title = section.title;
			}

			return mappedSection;
		});

		if (totalRows === 0) {
			throw new Error('At least one row must be provided');
		}

		if (totalRows > 10) {
			throw new Error('A maximum of 10 rows across all sections is allowed');
		}

		if (sections.length > 1 && sections.some((section) => !section.title)) {
			throw new Error('Section Title is required when there is more than one section');
		}

		interactive.action = {
			button: listButtonText,
			sections: mappedSections,
		};
	}

	const body: IDataObject = {
		from_number: wabaNumber,
		to_number: toNumber,
		payload: { interactive },
	};

	const responseData = await apiRequest.call(
		this,
		'POST',
		'waba/send-message',
		body,
		{},
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
