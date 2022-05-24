import { workflowsFacade } from '../store/workflows';
import { WorkflowsModuleStoreAPI } from '../workflows.types';

export const store: WorkflowsModuleStoreAPI = {
	workflows: {
		facade: {
			getWorkflow: workflowsFacade.getWorkflow.bind(workflowsFacade),
		},
	},
};
