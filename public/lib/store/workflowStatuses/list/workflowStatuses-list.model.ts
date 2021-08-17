import { CacheEntityState } from '@redactie/utils';

import { WorkflowStatus } from '../../../services/workflowStatuses';

export type WorkflowStatusesListModel = WorkflowStatus;
export type WorkflowStatusesListUIModel = {
	isCreating: boolean;
	isFetching: boolean;
	error?: any;
};

export type WorkflowStatusesListState = CacheEntityState<WorkflowStatusesListModel, string>;
