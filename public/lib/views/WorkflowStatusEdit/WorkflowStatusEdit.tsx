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
import { omit } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import WorkflowStatusForm from '../../components/Forms/WorkflowStatusForm/WorkflowStatusForm';
import { WorkflowStatusFormState } from '../../components/Forms/WorkflowStatusForm/workflowStatusForm.types';
import { rolesRightsConnector } from '../../connectors';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs } from '../../hooks';
import useWorkflowStatus from '../../hooks/useWorkflowStatus/useWorkflowStatus';
import { WorkflowStatus } from '../../services/workflowStatuses';
import { workflowStatusesFacade } from '../../store/workflowStatuses';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from '../../store/workflowStatuses/workflowStatuses.const';
import { DEFAULT_WORKFLOW_STATUS_DETAIL_HEADER_BADGES, MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps } from '../../workflows.types';

const WorkflowStatusEdit: FC<WorkflowModuleRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { workflowStatusUuid } = useParams<{ workflowStatusUuid: string }>();
	const [
		workflowStatus,
		workflowStatusUI,
		workflowStatusOccurrences,
		workflowStatuseOccurrencesUI,
	] = useWorkflowStatus(workflowStatusUuid, true);
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
	const [forceNavigateToOverview] = useOnNextRender(() =>
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
		if (!workflowStatusUI?.isFetching && workflowStatus) {
			const state = {
				uuid: workflowStatus.uuid as string,
				name: workflowStatus.data.name,
				systemName: workflowStatus.data.systemName,
				description: workflowStatus.data.description,
			};
			setInitialFormState(state);

			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [workflowStatus, workflowStatusUI]);

	/**
	 * Methods
	 */
	const onSubmit = async (data: WorkflowStatusFormState): Promise<void> => {
		setIsSubmitting(true);

		const isSuccesss = await workflowStatusesFacade.updateWorkflowStatus({
			...(workflowStatus as WorkflowStatus),
			data: {
				...workflowStatus?.data,
				...omit(['uuid'], data),
			},
		});

		if (isSuccesss) {
			forceNavigateToOverview();
			resetDetectValueChanges();
		}

		setIsSubmitting(false);
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
				isLoading={workflowStatusUI?.isFetching || workflowStatusUI?.isUpdating}
				isDeleting={workflowStatusUI?.isDeleting}
				hasChanges={hasChanges}
				canDelete={canDelete}
				onCancel={onCancel}
				onSubmit={onSubmit}
				onChange={setFormState}
				onDelete={onDelete}
				occurrences={workflowStatusOccurrences}
				occurrencesLoading={workflowStatuseOccurrencesUI?.isFetching}
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
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetchOne}
				/>
				<DataLoader loadingState={initialLoading} render={renderWorkflowStatusEdit} />
			</Container>
		</>
	);
};

export default WorkflowStatusEdit;
