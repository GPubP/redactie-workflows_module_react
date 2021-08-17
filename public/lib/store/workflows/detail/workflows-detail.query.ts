import { CacheEntityQuery } from '@redactie/utils';

import { WorkflowsDetailState, WorkflowsDetailUIState } from './workflows-detail.model';
import { workflowsDetailStore, WorkflowsDetailStore } from './workflows-detail.store';

export class WorkflowsDetailQuery extends CacheEntityQuery<
	WorkflowsDetailUIState,
	WorkflowsDetailState
> {
	constructor(protected store: WorkflowsDetailStore) {
		super(store);
	}
}

export const workflowsDetailQuery = new WorkflowsDetailQuery(workflowsDetailStore);
