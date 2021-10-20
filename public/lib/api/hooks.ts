import { usePaginatedWorkflowStatuses, useWorkflow } from '../hooks';
import { WorkflowsModuleAPI } from '../workflows.types';

export const hooks: WorkflowsModuleAPI['hooks'] = {
	useWorkflow,
	usePaginatedWorkflowStatuses,
};
