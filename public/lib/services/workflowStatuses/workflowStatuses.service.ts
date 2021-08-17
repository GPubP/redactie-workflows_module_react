import { parseSearchParams, SearchParams } from '@redactie/utils';

import { api } from '../api';

import {
	DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS,
	WORKFLOW_STATUSES_PREFIX_URL,
} from './workflowStatuses.service.const';
import {
	WorkflowStatusDetailResponse,
	WorkflowStatusesResponse,
} from './workflowStatuses.service.types';

export class WorkflowStatusesApiService {
	public async getWorkflowStatuses(
		searchParams: SearchParams = DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS
	): Promise<WorkflowStatusesResponse> {
		return await api
			.get(WORKFLOW_STATUSES_PREFIX_URL, { searchParams: parseSearchParams(searchParams) })
			.json();
	}

	public async getWorkflowStatus(
		workflowStatusId: string
	): Promise<WorkflowStatusDetailResponse> {
		return await api.get(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatusId}`).json();
	}
}

export const workflowStatusesApiService = new WorkflowStatusesApiService();
