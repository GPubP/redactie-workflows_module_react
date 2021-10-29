import {
	WorkflowStatusDetailModel,
	WorkflowStatusDetailUIModel,
} from '../../store/workflowStatuses';
import {
	WorkflowStatusOccurrencesDetailModel,
	WorkflowStatusOccurrencesDetailUIModel,
} from '../../store/workflowStatuses/occurrences';

export type UseWorkflowStatus = (
	workflowStatusUuid: string,
	includeOccurrences: boolean
) => [
	WorkflowStatusDetailModel | undefined,
	WorkflowStatusDetailUIModel | undefined,
	WorkflowStatusOccurrencesDetailModel['items'] | undefined,
	WorkflowStatusOccurrencesDetailUIModel | undefined
];
