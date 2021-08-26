import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { isNumber } from '@datorama/akita';
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
	usePaginatedWorkflowStatuses,
	useRoutesBreadcrumbs,
	useWorkflow,
	useWorkflowsUIStates,
} from '../../hooks';
import { WorkflowStatus } from '../../services/workflowStatuses';
import {
	TransitionRequirementTypes,
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
	const [rolesLoadingState, roles] = rolesRightsConnector.api.hooks.useTenantRoles();
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
	const [forceNavigateToOverview] = useOnNextRender(() =>
		navigate(MODULE_PATHS.workflowTransitions, { workflowUuid })
	);

	// Set initial loading
	useEffect(() => {
		if (!!workflow && !loading && rolesLoadingState === LoadingState.Loaded) {
			setInitialLoading(false);
		}
	}, [loading, rolesLoadingState, workflow]);

	useEffect(() => {
		// Change
		rolesRightsConnector.api.store.roles.service.getTenantRoles();
	}, []);

	useEffect(() => {
		const options = (roles || []).map(role => {
			return {
				label: role.attributes.displayName,
				value: role.attributes.displayName,
			};
		});

		setRolesOptions(options);
	}, [roles]);

	useEffect(() => {
		if (!workflow) {
			return;
		}

		const filteredTransitions = (workflow.data
			.transitions as WorkflowPopulatedTransition[]).reduce(
			(
				acc: TransitionSelectFormState,
				transition: WorkflowPopulatedTransition,
				index: number
			) => {
				if (transition.from.uuid === workflowStatusUuid) {
					acc[workflowStatusUuid] = {
						index,
						name: `${transition.to.uuid}.roles`,
						from: {
							uuid: transition.from.uuid,
							name: transition.from.data.name,
						},
						to: {
							uuid: transition.to.uuid,
							name: transition.to.data.name,
						},
						roles: transition.requirements.find(
							requirement =>
								requirement.type === TransitionRequirementTypes.userHasRole
						)?.value as string[],
					};
				}
				return acc;
			},
			{}
		);

		const mapStatuses = (pagination?.data || []).reduce(
			(acc: TransitionSelectFormState, status: WorkflowStatus) => {
				if (filteredTransitions[status.uuid as string]) {
					return {
						...acc,
						[status.uuid as string]: filteredTransitions[status.uuid as string],
					};
				}

				return {
					...acc,
					[status.uuid as string]: {
						name: `${status.uuid}.roles`,
						from: {
							uuid: workflowStatusUuid,
							name: transitionName as string,
						},
						to: {
							uuid: status.uuid as string,
							name: status.data.name,
						},
						roles: [],
					},
				};
			},
			{}
		);

		setFormValue(mapStatuses);
	}, [workflowStatusUuid, workflow, pagination, transitionName]);

	// /**
	//  * METHODS
	//  */
	const onSubmit = async (values: TransitionSelectFormState): Promise<void> => {
		let transitionsState = [...(workflow?.data.transitions || [])];

		for (const transition of Object.values(values)) {
			if (isNumber(transition.index)) {
				const requirements = transitionsState[transition.index].requirements.map(
					requirement => {
						if (requirement.type === TransitionRequirementTypes.userHasRole) {
							return {
								value: transition.roles,
								type: TransitionRequirementTypes.userHasRole,
							};
						}

						return requirement;
					}
				);

				transitionsState[transition.index] = {
					from: (transitionsState[transition.index] as WorkflowPopulatedTransition).from
						.uuid,
					to: (transitionsState[transition.index] as WorkflowPopulatedTransition).to.uuid,
					requirements,
				};
				continue;
			}

			transitionsState = [
				...transitionsState,
				{
					from: transition.from.uuid,
					to: transition.to.uuid,
					requirements: [
						{
							type: TransitionRequirementTypes.userHasRole,
							value: transition.roles,
						},
					],
				},
			];
		}

		await workflowsFacade
			.updateWorkflow({
				...(workflow as WorkflowDetailResponse),
				data: {
					...(workflow?.data as WorkflowData),
					transitions: transitionsState,
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
