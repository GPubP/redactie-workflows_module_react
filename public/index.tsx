import Core from '@redactie/redactie-core';
import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { rolesRightsConnector, sitesConnector } from './lib/connectors';
import {
	SiteWorkflowCreate,
	SiteWorkflowEdit,
	SiteWorkflowSettings,
	SiteWorkflowsOverview,
	SiteWorkflowTransitionDetail,
	SiteWorkflowTransitions,
	WorkflowCreate,
	WorkflowEdit,
	WorkflowSettings,
	WorkflowsOverview,
	WorkflowStatusCreate,
	WorkflowStatusEdit,
	WorkflowStatusesOverview,
	WorkflowTransitionDetail,
	WorkflowTransitions,
} from './lib/views';
import { MODULE_PATHS, SITE_PARAM } from './lib/workflows.const';
import { WorkflowModuleRouteProps } from './lib/workflows.types';

const WorkflowsComponent: FC<WorkflowModuleRouteProps> = ({ route, tenantId }) => {
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
		</TenantContext.Provider>
	);
};

const SiteWorkflowsComponent: FC<WorkflowModuleRouteProps<{ siteId: string }>> = ({
	match,
	route,
	tenantId,
}) => {
	const { siteId } = match.params;
	const guardsMeta = useMemo(() => ({ tenantId, siteId }), [siteId, tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<SiteContext.Provider value={{ siteId }}>
				<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
			</SiteContext.Provider>
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
					rolesRightsConnector.securityRights.readWorkflow,
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
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.readWorkflow,
						]),
					],
				},
			},
			{
				path: MODULE_PATHS.workflowCreate,
				breadcrumb: false,
				component: WorkflowCreate,
				redirect: MODULE_PATHS.workflowCreateSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.createWorkflow,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.workflowCreateSettings,
						breadcrumb: false,
						component: WorkflowSettings,
					},
				],
			},
			{
				path: MODULE_PATHS.workflowTransitionDetail,
				breadcrumb: false,
				component: WorkflowTransitionDetail,
			},
			{
				path: MODULE_PATHS.workflowEdit,
				breadcrumb: false,
				component: WorkflowEdit,
				redirect: MODULE_PATHS.workflowSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.updateWorkflow,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.workflowSettings,
						breadcrumb: false,
						component: WorkflowSettings,
					},
					{
						path: MODULE_PATHS.workflowTransitions,
						breadcrumb: false,
						component: WorkflowTransitions,
					},
				],
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
					rolesRightsConnector.securityRights.readWorkflowStatus,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.workflowStatusesOverview,
				breadcrumb: false,
				component: WorkflowStatusesOverview,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.readWorkflowStatus,
						]),
					],
				},
			},
			{
				path: MODULE_PATHS.workflowStatusEdit,
				breadcrumb: false,
				component: WorkflowStatusEdit,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.updateWorkflowStatus,
						]),
					],
				},
			},
			{
				path: MODULE_PATHS.workflowStatusCreate,
				breadcrumb: false,
				component: WorkflowStatusCreate,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsTenantGuard([
							rolesRightsConnector.securityRights.createWorkflowStatus,
						]),
					],
				},
			},
		],
	});

	sitesConnector.registerRoutes({
		path: MODULE_PATHS.site.workflowRoot,
		breadcrumb: false,
		component: SiteWorkflowsComponent,
		redirect: MODULE_PATHS.site.workflowsOverview,
		guards: [
			rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
				rolesRightsConnector.securityRights.readWorkflow,
			]),
		],
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Workflow',
			order: 1,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(SITE_PARAM, [
					rolesRightsConnector.securityRights.readWorkflow,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.site.workflowsOverview,
				breadcrumb: false,
				component: SiteWorkflowsOverview,
				navigation: {
					context: 'site',
					label: 'Workflows',
					order: 0,
					parentPath: MODULE_PATHS.site.workflowRoot,
				},
			},
			{
				path: MODULE_PATHS.site.workflowCreate,
				breadcrumb: false,
				component: SiteWorkflowCreate,
				redirect: MODULE_PATHS.site.workflowCreateSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
							rolesRightsConnector.securityRights.createWorkflow,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.site.workflowCreateSettings,
						breadcrumb: false,
						component: SiteWorkflowSettings,
					},
				],
			},
			{
				path: MODULE_PATHS.site.workflowTransitionDetail,
				breadcrumb: false,
				component: SiteWorkflowTransitionDetail,
			},
			{
				path: MODULE_PATHS.site.workflowEdit,
				breadcrumb: false,
				component: SiteWorkflowEdit,
				redirect: MODULE_PATHS.site.workflowSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
							rolesRightsConnector.securityRights.updateWorkflow,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.site.workflowSettings,
						breadcrumb: false,
						component: SiteWorkflowSettings,
					},
					{
						path: MODULE_PATHS.site.workflowTransitions,
						breadcrumb: false,
						component: SiteWorkflowTransitions,
					},
				],
			},
		],
	});
} else {
	throw new Error(
		`Workflows Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
	);
}
