import { CacheEntityState, CacheEntityUI, CacheEntityUIState } from '@redactie/utils';

import { WorkflowDetailResponse } from '../../../services/workflows';

export type WorkflowDetailModel = WorkflowDetailResponse;
export type WorkflowDetailUIModel = CacheEntityUI;

export type WorkflowsDetailState = CacheEntityState<WorkflowDetailModel, string>;

export type WorkflowsDetailUIState = CacheEntityUIState<WorkflowDetailUIModel>;
