import { PaginatorPlugin } from '@datorama/akita';

import { workflowsListQuery } from './workflows-list.query';

export const workflowsListPaginator = new PaginatorPlugin(workflowsListQuery)
	.withControls()
	.withRange();
