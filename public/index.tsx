import Core from '@redactie/redactie-core';
import { RenderChildRoutes, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import rolesRightsConnector from './lib/connectors/rolesRights';
import { WorkflowsOverview, WorkflowStatusesOverview } from './lib/views';
import { MODULE_PATHS } from './lib/workflows.const';
import { WorkflowModuleRouteProps } from './lib/workflows.types';

const WorkflowsComponent: FC<WorkflowModuleRouteProps> = ({ route, tenantId }) => {
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
		</TenantContext.Provider>
	);
};

if (rolesRightsConnector.api) {
	Core.routes.register({
		path: MODULE_PATHS.workflowRoot,
		component: WorkflowsComponent,
		breadcrumb: false,
		redirect: MODULE_PATHS.workflowsOverview,
		guardOptions: {
			guards: [],
		},
		navigation: {
			label: 'Workflow',
			order: 2,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsTenantCanShown([
					// rolesRightsConnector.securityRights.readWorkflows,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.workflowsOverview,
				breadcrumb: false,
				component: WorkflowsOverview,
				navigation: {
					label: 'Workflows',
					order: 0,
					parentPath: MODULE_PATHS.workflowRoot,
				},
			},
		],
	});

	Core.routes.register({
		path: MODULE_PATHS.workflowStatusesRoot,
		component: WorkflowsComponent,
		breadcrumb: false,
		redirect: MODULE_PATHS.workflowStatusesOverview,
		guardOptions: {
			guards: [],
		},
		navigation: {
			label: 'Statussen',
			order: 2,
			parentPath: MODULE_PATHS.workflowRoot,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsTenantCanShown([
					// rolesRightsConnector.securityRights.readWorkflowStatuses,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.workflowStatusesOverview,
				breadcrumb: false,
				component: WorkflowStatusesOverview,
			},
		],
	});
} else {
	throw new Error(
		`Workflows Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
	);
}
