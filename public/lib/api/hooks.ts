import { useWorkflow } from '../hooks';
import { WorkflowsModuleAPI } from '../workflows.types';

export const hooks: WorkflowsModuleAPI['hooks'] = {
	useWorkflow,
};
