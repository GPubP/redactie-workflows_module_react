import { AlertContainer, alertService, LoadingState, useSiteContext } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { TransitionsTable } from '../../components';
import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { usePaginatedWorkflowStatuses } from '../../hooks';
import { WorkflowStatus } from '../../services/workflowStatuses';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { WorkflowDetailRouteProps } from '../../workflows.types';

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
	const { loading, pagination } = usePaginatedWorkflowStatuses(
		{
			page: 1,
			pagesize: -1,
		},
		{
			siteId,
		}
	);
	const [rolesLoadingState, roles] = rolesRightsConnector.api.hooks.useSiteRoles();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [listData, setListData] = useState<WorkflowStatus[]>([]);

	useEffect(() => {
		if (
			!loading &&
			mySecurityRightsLoadingState === LoadingState.Loaded &&
			rolesLoadingState === LoadingState.Loaded
		) {
			setInitialLoading(LoadingState.Loaded);
		}

		if (
			mySecurityRightsLoadingState === LoadingState.Error ||
			rolesLoadingState === LoadingState.Error
		) {
			alertService.danger(
				{
					title: 'Er ging iets mis',
					message: 'Er ging iets mis bij het ophalen van transities',
				},
				{
					containerId: WORKFLOW_ALERT_CONTAINER_IDS.transitionOverview,
				}
			);
			setListData([]);
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loading, mySecurityRightsLoadingState, rolesLoadingState]);

	useEffect(() => {
		rolesRightsConnector.api.store.roles.service.getSiteRoles(siteId);
	}, [siteId]);

	useEffect(() => {
		if (!pagination) {
			return;
		}

		setListData(pagination.data);
	}, [pagination]);

	/**
	 * Methods
	 */

	/**
	 * Render
	 */

	const renderStatusesTable = (): ReactElement => {
		return (
			<TransitionsTable
				statuses={listData}
				readonly={false}
				roles={roles || []}
				workflow={workflow}
				mySecurityrights={mySecurityrights}
				siteId={siteId}
				loading={initialLoading !== LoadingState.Loaded}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
			/>
		);
	};

	return (
		<>
			<AlertContainer
				toastClassName="u-margin-bottom"
				containerId={WORKFLOW_ALERT_CONTAINER_IDS.transitionOverview}
			/>
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
