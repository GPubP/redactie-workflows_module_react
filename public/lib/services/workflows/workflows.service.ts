import { parseSearchParams, SearchParams } from '@redactie/utils';

import { api } from '../api';

import { DEFAULT_WORKFLOWS_SEARCH_PARAMS, WORKFLOWS_PREFIX_URL } from './workflows.service.const';
import { WorkflowDetailResponse, WorkflowsResponse } from './workflows.service.types';

export class WorkflowsApiService {
	public async getWorkflows(
		searchParams: SearchParams = DEFAULT_WORKFLOWS_SEARCH_PARAMS
	): Promise<WorkflowsResponse> {
		return await api
			.get(WORKFLOWS_PREFIX_URL, { searchParams: parseSearchParams(searchParams) })
			.json();
	}

	public async getWorkflow(workflowId: string): Promise<WorkflowDetailResponse> {
		return await api.get(`${WORKFLOWS_PREFIX_URL}/${workflowId}`).json();
	}
}

export const workflowsApiService = new WorkflowsApiService();
