import { SearchParams } from '@redactie/utils';

export const WORKFLOW_STATUSES_PREFIX_URL = 'workflows/v1/statuses';
export const SITE_WORKFLOW_STATUSES_PREFIX_URL = 'workflows/v1/sites';

export const DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS: SearchParams = {
	page: 1,
	pagesize: 20,
};
