import { CacheEntityQuery } from '@redactie/utils';

import {
	WorkflowStatusesDetailState,
	WorkflowStatusesDetailUIState,
} from './workflowStatuses-detail.model';
import {
	workflowStatusesDetailStore,
	WorkflowStatusesDetailStore,
} from './workflowStatuses-detail.store';

export class WorkflowStatusesDetailQuery extends CacheEntityQuery<
	WorkflowStatusesDetailUIState,
	WorkflowStatusesDetailState
> {
	constructor(protected store: WorkflowStatusesDetailStore) {
		super(store);
	}
}

export const workflowStatusesDetailQuery = new WorkflowStatusesDetailQuery(
	workflowStatusesDetailStore
);
