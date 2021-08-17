import { CacheEntityState, CacheEntityUI, CacheEntityUIState } from '@redactie/utils';

import { WorkflowStatusDetailResponse } from '../../../services/workflowStatuses';

export type WorkflowStatusDetailModel = WorkflowStatusDetailResponse;
export type WorkflowStatusDetailUIModel = CacheEntityUI;

export type WorkflowStatusesDetailState = CacheEntityState<WorkflowStatusDetailModel, string>;

export type WorkflowStatusesDetailUIState = CacheEntityUIState<WorkflowStatusDetailUIModel>;
