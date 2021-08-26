import { FormikProps, FormikValues } from 'formik';

export interface DefaultFormActionsProps<State extends FormikValues> {
	isLoading?: boolean;
	hasChanges?: boolean;
	saveBtnDisabled?: boolean;
	onCancel?: (resetForm: FormikProps<State>['resetForm']) => void;
}
