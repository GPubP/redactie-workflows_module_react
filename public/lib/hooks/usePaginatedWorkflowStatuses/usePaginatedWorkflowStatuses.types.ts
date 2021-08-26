import { PaginationResponse } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';

import { WorkflowStatusesListModel } from '../../store/workflowStatuses';

export type UsePaginatedWorkflowStatuses = (
	sitesSearchParams: SearchParams,
	clearCache?: boolean
) => {
	loading: boolean;
	pagination: PaginationResponse<WorkflowStatusesListModel> | null;
	refreshCurrentPage: () => void;
	error: any | null;
};
