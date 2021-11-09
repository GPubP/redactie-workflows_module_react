import { array, boolean, object, string } from 'yup';

export const STATUS_SELECT_FORM_VALIDATION_SCHEMA = object().shape({
	statuses: array().of(
		object().shape({
			from: object().shape({
				systemName: string().required(),
				name: string().required(),
			}),
			to: object().shape({
				systemName: string().required(),
				name: string().required(),
			}),
			invalidFrom: boolean(),
		})
	),
});
