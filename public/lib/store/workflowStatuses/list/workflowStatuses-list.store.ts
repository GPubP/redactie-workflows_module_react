import { StoreConfig } from '@datorama/akita';
import { CacheEntityStore } from '@redactie/utils';

import {
	WorkflowStatusesListModel,
	WorkflowStatusesListState,
} from './workflowStatuses-list.model';

@StoreConfig({ name: 'workflow-statuses-list', idKey: 'uuid' })
export class WorkflowStatusesListStore extends CacheEntityStore<
	any,
	WorkflowStatusesListState,
	WorkflowStatusesListModel
> {}

export const workflowStatusesListStore = new WorkflowStatusesListStore();
