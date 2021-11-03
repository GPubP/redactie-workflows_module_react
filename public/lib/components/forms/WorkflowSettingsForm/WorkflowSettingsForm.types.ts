import { FormikChildrenFn } from '@redactie/utils';
import { FormikProps, FormikValues } from 'formik';
import { ReactNode, Ref } from 'react';

import { WorkflowDetailResponse } from '../../../services/workflows';
import { WorkflowDetailModel } from '../../../store/workflows';

export interface WorkflowSettingFormProps {
	children?: FormikChildrenFn<WorkflowDetailModel> | ReactNode;
	formikRef: Ref<FormikProps<FormikValues>>;
	isUpdate?: boolean;
	disabled?: boolean;
	workflow: WorkflowDetailResponse;
	onSubmit: (values: any) => void;
}
