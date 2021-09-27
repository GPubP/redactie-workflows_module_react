import { SelectOption } from '@redactie/utils';

export interface StatusSelectFormItem {
	from: {
		uuid: string;
		name: string;
	};
	to: {
		uuid: string | null;
		name: string | null;
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
