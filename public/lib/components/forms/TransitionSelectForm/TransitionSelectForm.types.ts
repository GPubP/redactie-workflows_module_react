import { SelectOption } from '@redactie/utils';
import { FormikProps } from 'formik';

export interface TransitionSelect {
	index?: number;
	from: {
		uuid: string;
		name: string;
	};
	to: {
		uuid: string;
		name: string;
	};
	name: string;
	roles: string[];
}

export type TransitionSelectFormState = {
	[key: string]: TransitionSelect;
};

export interface TransitionSelectFormProps {
	initialState: TransitionSelectFormState;
	roles: SelectOption[];
	isLoading?: boolean;
	hasChanges?: boolean;
	onCancel?: (resetForm: FormikProps<TransitionSelectFormState>['resetForm']) => void;
	onSubmit?: (values: TransitionSelectFormState) => void;
	onChange?: (values: TransitionSelectFormState) => void;
}
