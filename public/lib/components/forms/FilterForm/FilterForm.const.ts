import { object, string } from 'yup';

export const FILTER_FORM_VALIDATION_SCHEMA = object().shape({
	name: string().required(),
});
