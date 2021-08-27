import { PaginationResponse } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';

import { WorkflowsListModel } from '../../store/workflows';

export type UsePaginatedWorkflows = (
	sitesSearchParams: SearchParams,
	options?: { clearCache?: boolean; siteId?: string }
) => {
	loading: boolean;
	pagination: PaginationResponse<WorkflowsListModel> | null;
	refreshCurrentPage: () => void;
	error: any | null;
};
