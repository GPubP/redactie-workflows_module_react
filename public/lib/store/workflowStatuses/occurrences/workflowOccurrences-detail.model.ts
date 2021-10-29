import { CacheEntityState, CacheEntityUI, CacheEntityUIState } from '@redactie/utils';

import { Workflow } from '../../../services/workflows';

export type WorkflowStatusOccurrencesDetailModel = {
	items: Workflow[];
};
export type WorkflowStatusOccurrencesDetailUIModel = CacheEntityUI;

export type WorkflowStatusOccurrencesDetailState = CacheEntityState<
	WorkflowStatusOccurrencesDetailModel,
	string
>;

export type WorkflowStatusOccurrencesDetailUIState = CacheEntityUIState<
	WorkflowStatusOccurrencesDetailUIModel
>;
