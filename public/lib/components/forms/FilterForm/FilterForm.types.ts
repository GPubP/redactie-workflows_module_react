import { FormikHelpers, FormikState } from 'formik';
export type ResetForm = (nextState?: Partial<FormikState<FilterFormState>> | undefined) => void;

export interface FilterFormState {
	search: string;
}

export interface FilterFormProps {
	initialState: FilterFormState;
	onCancel: (resetForm: ResetForm) => void;
	onSubmit: (values: FilterFormState, formikHelpers: FormikHelpers<FilterFormState>) => void;
	deleteActiveFilter: (item: any) => void;
	activeFilters: Array<object>;
}
