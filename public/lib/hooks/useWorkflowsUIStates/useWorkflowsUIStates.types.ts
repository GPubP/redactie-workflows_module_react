import { WorkflowDetailUIModel, WorkflowsListUIModel } from '../../store/workflows';

export type UseWorkflowsUIStates = (
	workflowUuid?: string
) => [WorkflowsListUIModel, WorkflowDetailUIModel | undefined];
