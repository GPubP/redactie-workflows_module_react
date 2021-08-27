import { WorkflowDetailModel, WorkflowDetailUIModel } from '../../store/workflows';

export type UseWorkflow = (
	workflowUuid?: string,
	siteId?: string
) => [WorkflowDetailModel | undefined, WorkflowDetailUIModel | undefined];
