import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface WorkflowModuleRouteProps<Params extends { [K in keyof Params]?: string } = {}>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface WorkflowsMatchProps {
	siteId: string;
	workflowUuid?: string;
}
