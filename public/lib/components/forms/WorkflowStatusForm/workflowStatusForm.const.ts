import { object, string } from 'yup';

export const WORKFLOW_STATUS_FORM_VALIDATION_SCHEMA = object().shape({
	name: string().required('Naam is verplicht'),
	description: string().required('Beschrijving is verplicht'),
});
