import { FormikProps } from 'formik';

import { Workflow } from '../../../services/workflows';

export interface WorkflowStatusFormState {
	uuid?: string;
	name: string;
	systemName?: string;
	description: string;
}

export interface WorkflowStatusFormProps {
	initialState: WorkflowStatusFormState;
	isUpdate?: boolean;
	isLoading?: boolean;
	isDeleting?: boolean;
	hasChanges?: boolean;
	canDelete?: boolean;
	occurrences?: Workflow[];
	occurrencesLoading?: boolean;
	onCancel?: (resetForm: FormikProps<WorkflowStatusFormState>['resetForm']) => void;
	onSubmit?: (values: WorkflowStatusFormState) => void;
	onChange?: (values: WorkflowStatusFormState) => void;
	children?: (props: FormikProps<WorkflowStatusFormState>) => React.ReactNode;
	onDelete?: () => Promise<void>;
}
