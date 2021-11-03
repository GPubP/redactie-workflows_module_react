import { object, string } from 'yup';

export const WORKFLOW_SETTINGS_VALIDATION_SCHEMA = object().shape({
	data: object().shape({
		name: string().required('Naam is een verplicht veld'),
		description: string().required('Beschrijving is een verplicht veld'),
	}),
});

export enum WORKFLOW_TECHNICAL_STATES {
	NEW = 'new',
}
