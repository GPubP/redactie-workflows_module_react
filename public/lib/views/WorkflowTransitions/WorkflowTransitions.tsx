import { Table } from '@acpaas-ui/react-editorial-components';
import { LoadingState, useNavigate } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { usePaginatedWorkflowStatuses } from '../../hooks';
import { TransitionRequirementTypes, WorkflowPopulatedTransition } from '../../services/workflows';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowDetailRouteProps } from '../../workflows.types';

import { TRANSITION_COLUMNS } from './workflowTransitions.const';
import { WorkflowTransitionsTableRow } from './workflowTransitions.types';

const WorkflowTransitions: FC<WorkflowDetailRouteProps> = ({ workflow }) => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const { navigate } = useNavigate();
	const { loading, pagination } = usePaginatedWorkflowStatuses({
		page: 1,
		pagesize: -1,
	});
	const [statusRows, setStatusRows] = useState<WorkflowTransitionsTableRow[]>([]);

	useEffect(() => {
		if (!pagination?.data || !workflow) {
			return;
		}

		const groupedTransitions = (workflow.data
			.transitions as WorkflowPopulatedTransition[]).reduce(
			(
				acc: {
					[fromId: string]: WorkflowTransitionsTableRow;
				},
				transition: WorkflowPopulatedTransition
			) => {
				if (!acc[transition.from.uuid]) {
					acc[transition.from.uuid] = {
						uuid: transition.from.uuid,
						from: transition.from.data.name,
						to: [
							{
								name: transition.to.data.name,
								roles:
									(transition.requirements.find(
										requirement =>
											requirement.type ===
											TransitionRequirementTypes.userHasRole
									)?.value as string[]) || [],
							},
						],
						navigate: (uuid: string) =>
							navigate(MODULE_PATHS.workflowTransitionDetail, {
								workflowStatusUuid: uuid,
								workflowUuid: workflow.uuid,
							}),
					};

					return acc;
				}

				acc[transition.from.uuid].to = [
					...acc[transition.from.uuid].to,
					{
						name: transition.to.data.name,
						roles:
							(transition.requirements.find(
								requirement =>
									requirement.type === TransitionRequirementTypes.userHasRole
							)?.value as string[]) || [],
					},
				];

				return acc;
			},
			{}
		);

		const mapStatuses: WorkflowTransitionsTableRow[] = pagination.data.map(status => {
			if (groupedTransitions[status.uuid as string]) {
				return groupedTransitions[status.uuid as string];
			}

			return {
				uuid: status.uuid as string,
				from: status.data.name,
				to: [],
				navigate: (uuid: string) =>
					navigate(MODULE_PATHS.workflowTransitionDetail, {
						workflowStatusUuid: uuid,
						workflowUuid: workflow.uuid,
					}),
			};
		});

		setStatusRows(mapStatuses);
	}, [pagination, workflow]); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Methods
	 */

	/**
	 * Render
	 */

	const renderStatusesTable = (): ReactElement => {
		return (
			<Table
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--sm"
				columns={TRANSITION_COLUMNS(t, mySecurityrights)}
				rows={statusRows}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
				loading={loading && mySecurityRightsLoadingState === LoadingState.Loaded}
			/>
		);
	};

	return (
		<>
			<p>
				Voeg transities toe door te bepalen naar welke status een content item aangepast kan
				worden en door welke rol(len) dit mag gebeuren. Denk eraan om voor elke status een
				transitie te voorzien. De transities worden automatisch gegroepeerd op de eerste
				status en geordend volgens de volgorde van de statussen.
			</p>
			{renderStatusesTable()}
		</>
	);
};

export default WorkflowTransitions;
