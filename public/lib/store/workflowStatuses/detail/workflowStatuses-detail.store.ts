import { StoreConfig } from '@datorama/akita';
import { CacheEntityStore } from '@redactie/utils';

import {
	WorkflowStatusDetailModel,
	WorkflowStatusesDetailState,
	WorkflowStatusesDetailUIState,
} from './workflowStatuses-detail.model';

@StoreConfig({ name: 'workflow-statuses-detail', idKey: 'uuid' })
export class WorkflowStatusesDetailStore extends CacheEntityStore<
	WorkflowStatusesDetailUIState,
	WorkflowStatusesDetailState,
	WorkflowStatusDetailModel
> {}

export const workflowStatusesDetailStore = new WorkflowStatusesDetailStore();
