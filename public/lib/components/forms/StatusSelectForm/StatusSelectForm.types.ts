import { SelectOption } from '@redactie/utils';

export interface StatusSelectFormItem {
	from: {
		systemName: string;
		name: string;
	};
	to: {
		systemName: string | undefined;
		name: string | undefined;
	};
	invalidFrom: boolean;
}

export interface StatusSelectFormState {
	statuses: StatusSelectFormItem[];
}

export interface StatusSelectFormProps {
	initialState: StatusSelectFormState;
	from: string;
	to: string;
	statuses: SelectOption[];
	onChange?: (values: StatusSelectFormState, isValid: boolean) => void;
}
