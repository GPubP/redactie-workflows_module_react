import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	LeavePrompt,
	LoadingState,
	useDetectValueChanges,
	useNavigate,
	useOnNextRender,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import WorkflowStatusForm from '../../components/forms/WorkflowStatusForm/WorkflowStatusForm';
import { WorkflowStatusFormState } from '../../components/forms/WorkflowStatusForm/workflowStatusForm.types';
import { rolesRightsConnector } from '../../connectors';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import {} from '../../helpers';
import { useRoutesBreadcrumbs } from '../../hooks';
import useWorkflowStatus from '../../hooks/useWorkflowStatus/useWorkflowStatus';
import { WorkflowStatus } from '../../services/workflowStatuses';
import { workflowStatusesFacade } from '../../store/workflowStatuses';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from '../../store/workflowStatuses.const';
import { DEFAULT_WORKFLOW_STATUS_DETAIL_HEADER_BADGES, MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps } from '../../workflows.types';

const WorkflowStatusEdit: FC<WorkflowModuleRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { workflowStatusUuid } = useParams<{ workflowStatusUuid: string }>();
	const [workflowStatus, workflowStatusUI] = useWorkflowStatus(workflowStatusUuid);
	const { navigate } = useNavigate();
	const [t] = useCoreTranslation();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [initialFormState, setInitialFormState] = useState<WorkflowStatusFormState | null>(null);
	const [formState, setFormState] = useState<WorkflowStatusFormState | null>(initialFormState);
	const { generatePath } = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Statussen',
			target: generatePath(MODULE_PATHS.workflowStatusesOverview),
		},
	]);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading &&
			!workflowStatusUI?.isUpdating &&
			!!workflowStatus,
		formState ?? initialFormState
	);
	const forceNavigateToOverview = useOnNextRender(() =>
		navigate(MODULE_PATHS.workflowStatusesOverview)
	);

	const canDelete = useMemo(
		() =>
			rolesRightsConnector.api.helpers.checkSecurityRights(
				mySecurityrights,
				[rolesRightsConnector.securityRights.deleteWorkflowStatus],
				false
			),
		[mySecurityrights]
	);

	useEffect(() => {
		if (!workflowStatus) {
			return;
		}

		const state = {
			uuid: workflowStatus.uuid,
			name: workflowStatus.data.name,
			systemName: workflowStatus.data.systemName,
			description: workflowStatus.data.description,
		};
		setInitialFormState(state);
	}, [workflowStatus]);

	useEffect(() => {
		if (!workflowStatusUI?.isFetching) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [workflowStatusUI]);

	/**
	 * Methods
	 */
	const onSubmit = async (data: WorkflowStatusFormState): Promise<void> => {
		setIsSubmitting(true);

		const isSuccesss = await workflowStatusesFacade.updateWorkflowStatus({
			...(workflowStatus as WorkflowStatus),
			data: {
				...workflowStatus?.data,
				...data,
			},
		});

		setIsSubmitting(false);

		if (isSuccesss) {
			forceNavigateToOverview();
			resetDetectValueChanges();
		}
	};

	const onDelete = async (): Promise<void> => {
		setIsSubmitting(true);

		await workflowStatusesFacade
			.deleteWorkflowStatus(workflowStatus as WorkflowStatus)
			.then(() => {
				forceNavigateToOverview();
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});

		setIsSubmitting(false);
	};

	const onCancel = (resetForm: FormikProps<WorkflowStatusFormState>['resetForm']): void => {
		resetForm();
		forceNavigateToOverview();
	};

	const pageTitle = `${
		workflowStatus?.data?.name ? `'${workflowStatus?.data?.name}'` : 'Status'
	} ${t(CORE_TRANSLATIONS.ROUTING_UPDATE)}`;

	/**
	 * Render
	 */
	const renderWorkflowStatusEdit = (): ReactElement | null => {
		if (!initialFormState) {
			return null;
		}

		return (
			<WorkflowStatusForm
				initialState={initialFormState}
				isUpdate={true}
				isLoading={workflowStatusUI?.isFetching}
				isDeleting={workflowStatusUI?.isDeleting}
				hasChanges={hasChanges}
				canDelete={canDelete}
				onCancel={onCancel}
				onSubmit={onSubmit}
				onChange={setFormState}
				onDelete={onDelete}
			>
				{({ submitForm }) => (
					<LeavePrompt when={hasChanges && !isSubmitting} onConfirm={submitForm} />
				)}
			</WorkflowStatusForm>
		);
	};

	return (
		<>
			<ContextHeader title={pageTitle} badges={DEFAULT_WORKFLOW_STATUS_DETAIL_HEADER_BADGES}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.update}
				/>
				<DataLoader loadingState={initialLoading} render={renderWorkflowStatusEdit} />
			</Container>
		</>
	);
};

export default WorkflowStatusEdit;
