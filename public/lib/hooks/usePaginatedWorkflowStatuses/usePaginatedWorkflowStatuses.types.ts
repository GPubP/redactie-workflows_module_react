import { PaginationResponse } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';

import { WorkflowStatusesListModel } from '../../store/workflowStatuses';

export type UsePaginatedWorkflowStatuses = (
	sitesSearchParams: SearchParams,
	options?: {
		clearCache?: boolean;
		sparse?: boolean;
		siteId?: string;
	}
) => {
	loading: boolean;
	pagination: PaginationResponse<WorkflowStatusesListModel> | null;
	refreshCurrentPage: () => void;
	error: any | null;
};
