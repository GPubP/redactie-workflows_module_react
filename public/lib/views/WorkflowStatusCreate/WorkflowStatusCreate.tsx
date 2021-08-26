import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	LeavePrompt,
	useDetectValueChanges,
	useNavigate,
	useOnNextRender,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, useState } from 'react';

import WorkflowStatusForm from '../../components/forms/WorkflowStatusForm/WorkflowStatusForm';
import { WorkflowStatusFormState } from '../../components/forms/WorkflowStatusForm/workflowStatusForm.types';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs } from '../../hooks';
import { workflowStatusesFacade } from '../../store/workflowStatuses';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from '../../store/workflowStatuses/workflowStatuses.const';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps } from '../../workflows.types';

const WorkflowStatusCreate: FC<WorkflowModuleRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { navigate } = useNavigate();
	const [t] = useCoreTranslation();
	const [formState, setFormState] = useState<WorkflowStatusFormState>({
		name: '',
		description: '',
	});
	const { generatePath } = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Statussen',
			target: generatePath(MODULE_PATHS.workflowStatusesOverview),
		},
	]);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(true, formState);
	const forceNavigateToOverview = useOnNextRender(() =>
		navigate(MODULE_PATHS.workflowStatusesOverview)
	);

	/**
	 * Methods
	 */
	const onSubmit = async (data: WorkflowStatusFormState): Promise<void> => {
		setIsSubmitting(true);

		const isSuccesss = await workflowStatusesFacade.createWorkflowStatus({ data });

		if (isSuccesss) {
			forceNavigateToOverview();
			resetDetectValueChanges();
		}

		setIsSubmitting(false);
	};

	const onCancel = (resetForm: FormikProps<WorkflowStatusFormState>['resetForm']): void => {
		resetForm();
		forceNavigateToOverview();
	};

	const pageTitle = `Status ${t(CORE_TRANSLATIONS.ROUTING_CREATE)}`;

	/**
	 * Render
	 */
	return (
		<>
			<ContextHeader title={pageTitle}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.create}
				/>
				<WorkflowStatusForm
					initialState={formState}
					isLoading={isSubmitting}
					hasChanges={hasChanges}
					onCancel={onCancel}
					onSubmit={onSubmit}
					onChange={setFormState}
				>
					{({ submitForm }) => (
						<LeavePrompt when={hasChanges && !isSubmitting} onConfirm={submitForm} />
					)}
				</WorkflowStatusForm>
			</Container>
		</>
	);
};

export default WorkflowStatusCreate;
