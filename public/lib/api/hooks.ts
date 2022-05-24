import { usePaginatedWorkflowStatuses, useWorkflow } from '../hooks';
import { WorkflowsModuleHooksAPI } from '../workflows.types';

export const hooks: WorkflowsModuleHooksAPI = {
	useWorkflow,
	usePaginatedWorkflowStatuses,
};
