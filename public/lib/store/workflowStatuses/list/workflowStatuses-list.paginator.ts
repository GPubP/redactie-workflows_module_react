import { PaginatorPlugin } from '@datorama/akita';

import { workflowStatusesListQuery } from './workflowStatuses-list.query';

export const workflowStatusesListPaginator = new PaginatorPlugin(workflowStatusesListQuery)
	.withControls()
	.withRange();
