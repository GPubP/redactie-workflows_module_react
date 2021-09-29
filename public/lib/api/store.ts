import { workflowsFacade } from '../store/workflows';
import { WorkflowsModuleAPI } from '../workflows.types';

export const store: WorkflowsModuleAPI['store'] = {
	workflows: {
		facade: workflowsFacade,
	},
};
