import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	LoadingState,
	SelectOption,
	useDetectValueChanges,
	useNavigate,
	useOnNextRender,
} from '@redactie/utils';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { TransitionSelectForm } from '../../components';
import { TransitionSelectFormState } from '../../components/Forms/TransitionSelectForm/TransitionSelectForm.types';
import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import {
	filterTransitions,
	getTransitionsState,
	mapStatuses,
	sortAlphabetically,
} from '../../helpers';
import {
	usePaginatedWorkflowStatuses,
	useRoutesBreadcrumbs,
	useWorkflow,
	useWorkflowsUIStates,
} from '../../hooks';
import {
	WorkflowData,
	WorkflowDetailResponse,
	WorkflowPopulatedTransition,
} from '../../services/workflows';
import { workflowsFacade } from '../../store/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowTransitionRouteProps } from '../../workflows.types';

export const WorkflowTransitionDetail: FC<WorkflowTransitionRouteProps> = ({ match }) => {
	const { workflowUuid, workflowStatusUuid } = match.params;

	/**
	 * HOOKS
	 */
	const [t] = useCoreTranslation();
	const { generatePath, navigate } = useNavigate();
	const { loading, pagination } = usePaginatedWorkflowStatuses({
		page: 1,
		pagesize: -1,
	});
	const [workflow] = useWorkflow(workflowUuid);
	const [, detailState] = useWorkflowsUIStates(workflowUuid);
	const [formValue, setFormValue] = useState<TransitionSelectFormState>({});
	const [initialLoading, setInitialLoading] = useState(true);
	const [rolesOptions, setRolesOptions] = useState<SelectOption[]>([]);
	const [rolesLoadingState, roles] = rolesRightsConnector.api.hooks.useSiteRoles();
	const transitionName = useMemo(() => {
		if (!pagination) {
			return '';
		}

		const status = (pagination?.data).find(status => status.uuid === workflowStatusUuid);

		return status?.data.name;
	}, [pagination, workflowStatusUuid]);
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Workflows',
			target: generatePath(MODULE_PATHS.workflowsOverview),
		},
		...(workflow?.data.name
			? [
					{
						name: workflow?.data.name,
						target: generatePath(MODULE_PATHS.workflowSettings, { workflowUuid }),
					},
			  ]
			: []),
	]);
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(
		!detailState?.isFetching && !isEmpty(formValue),
		formValue
	);
	const forceNavigateToOverview = useOnNextRender(() =>
		navigate(MODULE_PATHS.workflowTransitions, { workflowUuid })
	);

	// Set initial loading
	useEffect(() => {
		if (!!workflow && !loading && rolesLoadingState === LoadingState.Loaded) {
			setInitialLoading(false);
		}
	}, [loading, rolesLoadingState, workflow]);

	useEffect(() => {
		rolesRightsConnector.api.store.roles.service.getDefaultSiteRoles();
	}, []);

	useEffect(() => {
		const options = (roles || []).map(role => {
			return {
				label: role.name,
				value: role.name,
			};
		});

		setRolesOptions(sortAlphabetically(options, ['value']));
	}, [roles]);

	useEffect(() => {
		if (!workflow) {
			return;
		}

		const filteredTransitions = filterTransitions(
			workflow.data.transitions as WorkflowPopulatedTransition[],
			workflowStatusUuid
		);

		const statuses = mapStatuses(
			pagination?.data || [],
			filteredTransitions,
			workflowStatusUuid,
			transitionName as string
		);

		setFormValue(statuses);
	}, [workflowStatusUuid, workflow, pagination, transitionName, workflowUuid]);

	/**
	 * METHODS
	 */
	const onSubmit = async (values: TransitionSelectFormState): Promise<void> => {
		await workflowsFacade
			.updateWorkflow({
				...(workflow as WorkflowDetailResponse),
				data: {
					...(workflow?.data as WorkflowData),
					transitions: getTransitionsState(values, workflow?.data.transitions || []),
				},
			})
			.then(response => {
				if (response && response.uuid) {
					resetChangeDetection();
					navigate(MODULE_PATHS.workflowTransitions, {
						workflowUuid: response.uuid,
					});
				}
			});
	};

	const onCancel = (): void => {
		forceNavigateToOverview();
	};

	/**
	 * RENDER
	 */
	const pageTitle = `${transitionName ? `'${transitionName}'` : 'Transitie'} ${t(
		CORE_TRANSLATIONS.ROUTING_UPDATE
	)}`;

	const renderForm = (): ReactElement => (
		<div className="u-margin-top">
			<TransitionSelectForm
				initialState={formValue}
				roles={rolesOptions}
				isLoading={!initialLoading && detailState?.isUpdating}
				hasChanges={hasChanges}
				onCancel={onCancel}
				onSubmit={onSubmit}
				onChange={setFormValue}
			/>
		</div>
	);

	return (
		<>
			<ContextHeader
				title={pageTitle}
				badges={[
					{
						name: 'Transities',
						type: 'primary',
					},
				]}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_ALERT_CONTAINER_IDS.transitionDetail}
				/>
				<DataLoader loadingState={initialLoading} render={renderForm} />
			</Container>
		</>
	);
};

export default WorkflowTransitionDetail;
