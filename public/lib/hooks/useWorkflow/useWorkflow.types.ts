import { WorkflowDetailModel, WorkflowDetailUIModel } from '../../store/workflows';

export type UseWorkflow = (
	workflowUuid?: string
) => [WorkflowDetailModel | undefined, WorkflowDetailUIModel | undefined];
