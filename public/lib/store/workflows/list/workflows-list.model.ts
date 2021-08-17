import { CacheEntityState } from '@redactie/utils';

import { Workflow } from '../../../services/workflows';

export type WorkflowsListModel = Workflow;
export type WorkflowsListUIModel = {
	isCreating: boolean;
	isFetching: boolean;
	error?: any;
};

export type WorkflowsListState = CacheEntityState<WorkflowsListModel, string>;
