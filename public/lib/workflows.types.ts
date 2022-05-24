import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { AlertProps } from '@redactie/utils';

import { UsePaginatedWorkflowStatuses } from './hooks/usePaginatedWorkflowStatuses/usePaginatedWorkflowStatuses.types';
import { UseWorkflow } from './hooks/useWorkflow/useWorkflow.types';
import { CreateWorkflowPayload } from './services/workflows';
import { WorkflowDetailModel, WorkflowsFacade } from './store/workflows';

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

export interface WorkflowRouteParams {
	workflowUuid: string;
}

export interface WorkflowRouteProps<Params = WorkflowRouteParams>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
}

export interface WorkflowTransitionRouteParams {
	workflowUuid: string;
	workflowStatusUuid: string;
}

export interface WorkflowTransitionRouteProps<Params = WorkflowTransitionRouteParams>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
}

export interface WorkflowDetailRouteProps<Params = WorkflowRouteParams>
	extends RouteConfigComponentProps<Params> {
	readonly allowedPaths?: string[];
	readonly workflow: WorkflowDetailModel;
	onCancel: () => void;
	onSubmit: (data: CreateWorkflowPayload | WorkflowDetailModel) => Promise<void>;
}

export interface WorkflowsModuleStoreAPI {
	workflows: {
		facade: Pick<WorkflowsFacade, 'getWorkflow'>;
	};
}

export interface WorkflowsModuleHooksAPI {
	useWorkflow: UseWorkflow;
	usePaginatedWorkflowStatuses: UsePaginatedWorkflowStatuses;
}

export interface WorkflowsModuleAPI {
	store: WorkflowsModuleStoreAPI;
	hooks: WorkflowsModuleHooksAPI;
}
