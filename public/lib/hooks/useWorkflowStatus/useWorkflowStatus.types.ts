import {
	WorkflowStatusDetailModel,
	WorkflowStatusDetailUIModel,
} from '../../store/workflowStatuses';

export type UseWorkflowStatus = (
	workflowStatusUuid: string
) => [WorkflowStatusDetailModel | undefined, WorkflowStatusDetailUIModel | undefined];
