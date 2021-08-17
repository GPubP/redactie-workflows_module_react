import { StoreConfig } from '@datorama/akita';
import { CacheEntityStore } from '@redactie/utils';

import {
	WorkflowDetailModel,
	WorkflowsDetailState,
	WorkflowsDetailUIState,
} from './workflows-detail.model';

@StoreConfig({ name: 'workflows-detail', idKey: 'uuid' })
export class WorkflowsDetailStore extends CacheEntityStore<
	WorkflowsDetailUIState,
	WorkflowsDetailState,
	WorkflowDetailModel
> {}

export const workflowsDetailStore = new WorkflowsDetailStore();
