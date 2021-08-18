import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { AlertProps } from '@redactie/utils';

export interface WorkflowModuleRouteProps<Params extends { [K in keyof Params]?: string } = {}>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface WorkflowsMatchProps {
	siteId: string;
	workflowUuid?: string;
}

export type AlertMessages<T extends string | number | symbol> = Record<
	T,
	{ [key in 'success' | 'error']?: AlertProps }
>;
