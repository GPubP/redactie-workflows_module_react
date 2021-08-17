import { StoreConfig } from '@datorama/akita';
import { CacheEntityStore } from '@redactie/utils';

import { WorkflowsListModel, WorkflowsListState } from './workflows-list.model';

@StoreConfig({ name: 'workflows-list', idKey: 'uuid' })
export class WorkflowsListStore extends CacheEntityStore<
	any,
	WorkflowsListState,
	WorkflowsListModel
> {}

export const workflowsListStore = new WorkflowsListStore();
