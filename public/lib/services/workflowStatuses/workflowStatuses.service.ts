import { parseSearchParams, SearchParams } from '@redactie/utils';

import { WorkflowStatusDetailModel } from '../../store/workflowStatuses';
import { UpdateWorkflowStatusPayload } from '../../store/workflowStatuses/workflowStatuses.types';
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

	public async deleteWorkflowStatus(workflowStatusId: string): Promise<void> {
		return await api.delete(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatusId}`).json();
	}

	public async updateWorkflowStatus(
		workflowStatus: UpdateWorkflowStatusPayload
	): Promise<WorkflowStatusDetailModel> {
		return await api
			.put(`${WORKFLOW_STATUSES_PREFIX_URL}/${workflowStatus.uuid}`, { json: workflowStatus })
			.json();
	}
}

export const workflowStatusesApiService = new WorkflowStatusesApiService();
