import { LoadingState, useSiteContext } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { TransitionsTable } from '../../components';
import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { usePaginatedWorkflowStatuses } from '../../hooks';
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

	/**
	 * Methods
	 */

	/**
	 * Render
	 */

	const renderStatusesTable = (): ReactElement => {
		return (
			<TransitionsTable
				statuses={pagination?.data || []}
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
