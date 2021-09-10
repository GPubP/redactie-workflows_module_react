import { Table } from '@acpaas-ui/react-editorial-components';
import { LoadingState, useNavigate, useSiteContext } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { isTenantWorfklow } from '../../helpers';
import { usePaginatedWorkflowStatuses } from '../../hooks';
import { TransitionRequirementTypes, WorkflowPopulatedTransition } from '../../services/workflows';
import { MODULE_PATHS, SITES_ROOT } from '../../workflows.const';
import { WorkflowDetailRouteProps } from '../../workflows.types';

import { TRANSITION_COLUMNS } from './siteWorkflowTransitions.const';
import { WorkflowTransitionsTableRow } from './siteWorkflowTransitions.types';

const SiteWorkflowTransitions: FC<WorkflowDetailRouteProps> = ({ workflow }) => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const { siteId } = useSiteContext();
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const { navigate } = useNavigate(SITES_ROOT);
	const { loading, pagination } = usePaginatedWorkflowStatuses({
		page: 1,
		pagesize: -1,
	});
	const [statusRows, setStatusRows] = useState<WorkflowTransitionsTableRow[]>([]);
	const [rolesLoadingState, roles] = rolesRightsConnector.api.hooks.useSiteRoles();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const isTenant = isTenantWorfklow(workflow);

	useEffect(() => {
		if (
			!loading &&
			mySecurityRightsLoadingState === LoadingState.Loaded &&
			rolesLoadingState === LoadingState.Loaded
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loading, mySecurityRightsLoadingState, rolesLoadingState]);

	useEffect(() => {
		rolesRightsConnector.api.store.roles.service.getSiteRoles(siteId);
	}, [siteId]);

	useEffect(() => {
		if (!pagination?.data || !workflow || !roles) {
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
				const roleIds =
					(transition.requirements.find(
						requirement => requirement.type === TransitionRequirementTypes.userHasRole
					)?.value as string[]) || [];

				const roleNames = (roles || [])?.reduce((acc: string[], role) => {
					if (!roleIds.includes(role.id)) {
						return acc;
					}

					return [...acc, role.attributes.displayName];
				}, []);

				if (!acc[transition.from.uuid]) {
					acc[transition.from.uuid] = {
						uuid: transition.from.uuid,
						from: transition.from.data.name,
						to: [
							{
								name: transition.to.data.name,
								roles: roleNames,
							},
						],
						navigate: (uuid: string) =>
							navigate(MODULE_PATHS.site.workflowTransitionDetail, {
								workflowStatusUuid: uuid,
								workflowUuid: workflow.uuid,
								siteId,
							}),
					};

					return acc;
				}

				acc[transition.from.uuid].to = [
					...acc[transition.from.uuid].to,
					{
						name: transition.to.data.name,
						roles: roleNames,
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
					navigate(MODULE_PATHS.site.workflowTransitionDetail, {
						workflowStatusUuid: uuid,
						workflowUuid: workflow.uuid,
						siteId,
					}),
			};
		});

		setStatusRows(mapStatuses);
	}, [pagination, workflow, roles]); // eslint-disable-line react-hooks/exhaustive-deps

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
				columns={TRANSITION_COLUMNS(t, mySecurityrights, isTenant)}
				rows={statusRows}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
				loading={initialLoading !== LoadingState.Loaded}
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

export default SiteWorkflowTransitions;
