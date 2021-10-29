import { StoreConfig } from '@datorama/akita';
import { CacheEntityStore } from '@redactie/utils';

import {
	WorkflowStatusOccurrencesDetailModel,
	WorkflowStatusOccurrencesDetailState,
	WorkflowStatusOccurrencesDetailUIState,
} from './workflowOccurrences-detail.model';

@StoreConfig({ name: 'workflow-statuses-occurences-detail', idKey: 'uuid' })
export class WorkflowStatusOccurrencesDetailStore extends CacheEntityStore<
	WorkflowStatusOccurrencesDetailUIState,
	WorkflowStatusOccurrencesDetailState,
	WorkflowStatusOccurrencesDetailModel
> {}

export const workflowStatusOccurrencesDetailStore = new WorkflowStatusOccurrencesDetailStore();
