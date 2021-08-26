import { array, object, string } from 'yup';

export const TRANSITION_SELECT_FORM_VALIDATION_SCHEMA = array().of(
	object().shape({
		from: object().shape({
			uuid: string().required(),
			name: string().required(),
		}),
		to: object().shape({
			uuid: string().required(),
			name: string().required(),
		}),
		roles: array().of(string()),
	})
);
