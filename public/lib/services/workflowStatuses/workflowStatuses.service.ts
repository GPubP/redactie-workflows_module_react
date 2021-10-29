import { parseSearchParams, SearchParams } from '@redactie/utils';

import {
	CreateWorkflowStatusPayload,
	UpdateWorkflowStatusPayload,
} from '../../store/workflowStatuses/workflowStatuses.types';
import { api } from '../api';
import { WorkflowDetailResponse, WorkflowsResponse } from '../workflows';

import {
	DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS,
	WORKFLOW_STATUSES_PREFIX_URL,
} from './workflowStatuses.service.const';
import {
	WorkflowStatusDetailResponse,
	WorkflowStatusesResponse,
} from './workflowStatuses.service.types';

import { SITE_WORKFLOW_STATUSES_PREFIX_URL } from '.';

export class WorkflowStatusesApiService {
	public async getWorkflowStatuses(
		searchParams: SearchParams = DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS
	): Promise<WorkflowStatusesResponse> {
		return await api
			.get(WORKFLOW_STATUSES_PREFIX_URL, { searchParams: parseSearchParams(searchParams) })
			.json();
	}

	public async getSiteWorkflowStatuses(
		siteId: string,
		searchParams: SearchParams = DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS
	): Promise<WorkflowStatusesResponse> {
		return await api
			.get(`${SITE_WORKFLOW_STATUSES_PREFIX_URL}/${siteId}/statuses`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json();
	}

	public async getWorkflowStatus(
		workflowStatusId: string
	): Promise<WorkflowStatusDetailResponse> {
		return await api.get(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatusId}`).json();
	}

	public async createWorkflowStatus(
		workflowStatus: CreateWorkflowStatusPayload
	): Promise<WorkflowStatusDetailResponse> {
		return await api.post(`${WORKFLOW_STATUSES_PREFIX_URL}`, { json: workflowStatus }).json();
	}

	public async deleteWorkflowStatus(workflowStatusId: string): Promise<void> {
		return await api.delete(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatusId}`).json();
	}

	public async updateWorkflowStatus(
		workflowStatus: UpdateWorkflowStatusPayload
	): Promise<WorkflowStatusDetailResponse> {
		return await api
			.put(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatus.uuid}`, { json: workflowStatus })
			.json();
	}

	public async getWorkflowStatusOccurences(workflowStatusId: string): Promise<WorkflowsResponse> {
		return await api
			.get(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatusId}/workflow-occurrences`)
			.json();
	}
}

export const workflowStatusesApiService = new WorkflowStatusesApiService();
