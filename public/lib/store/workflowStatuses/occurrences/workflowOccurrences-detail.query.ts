import { CacheEntityQuery } from '@redactie/utils';

import {
	WorkflowStatusOccurrencesDetailState,
	WorkflowStatusOccurrencesDetailUIState,
} from './workflowOccurrences-detail.model';
import {
	workflowStatusOccurrencesDetailStore,
	WorkflowStatusOccurrencesDetailStore,
} from './workflowOccurrences-detail.store';

export class WorkflowStatusOccurrencesDetailQuery extends CacheEntityQuery<
	WorkflowStatusOccurrencesDetailUIState,
	WorkflowStatusOccurrencesDetailState
> {
	constructor(protected store: WorkflowStatusOccurrencesDetailStore) {
		super(store);
	}
}

export const workflowStatusOccurrencesDetailQuery = new WorkflowStatusOccurrencesDetailQuery(
	workflowStatusOccurrencesDetailStore
);
