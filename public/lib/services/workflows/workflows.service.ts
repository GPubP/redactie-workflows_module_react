import { parseSearchParams, SearchParams } from '@redactie/utils';

import { api } from '../api';

import {
	DEFAULT_WORKFLOWS_SEARCH_PARAMS,
	SITE_WORKFLOWS_PREFIX_URL,
	WORKFLOWS_PREFIX_URL,
} from './workflows.service.const';
import {
	CreateWorkflowPayload,
	UpdateWorkflowPayload,
	WorkflowDetailResponse,
	WorkflowsResponse,
} from './workflows.service.types';

export class WorkflowsApiService {
	public async getWorkflows(
		searchParams: SearchParams = DEFAULT_WORKFLOWS_SEARCH_PARAMS
	): Promise<WorkflowsResponse> {
		return await api
			.get(WORKFLOWS_PREFIX_URL, { searchParams: parseSearchParams(searchParams) })
			.json();
	}

	public async getSiteWorkflows(
		searchParams: SearchParams = DEFAULT_WORKFLOWS_SEARCH_PARAMS,
		siteId: string
	): Promise<WorkflowsResponse> {
		return await api
			.get(`${SITE_WORKFLOWS_PREFIX_URL}/${siteId}/workflows`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json();
	}

	public async createWorkflow(workflow: CreateWorkflowPayload): Promise<WorkflowDetailResponse> {
		return await api.post(`${WORKFLOWS_PREFIX_URL}`, { json: workflow }).json();
	}

	public async createSiteWorkflow(
		workflow: CreateWorkflowPayload,
		siteId: string
	): Promise<WorkflowDetailResponse> {
		return await api
			.post(`${SITE_WORKFLOWS_PREFIX_URL}/${siteId}/workflows`, { json: workflow })
			.json();
	}

	public async getWorkflow(workflowUuid: string): Promise<WorkflowDetailResponse> {
		return await api.get(`${WORKFLOWS_PREFIX_URL}/${workflowUuid}`).json();
	}

	public async getSiteWorkflow(
		workflowUuid: string,
		siteId: string
	): Promise<WorkflowDetailResponse> {
		return await api
			.get(`${SITE_WORKFLOWS_PREFIX_URL}/${siteId}/workflows/${workflowUuid}`)
			.json();
	}

	public async updateWorkflow(workflow: UpdateWorkflowPayload): Promise<WorkflowDetailResponse> {
		return await api.put(`${WORKFLOWS_PREFIX_URL}/${workflow.uuid}`, { json: workflow }).json();
	}

	public async updateSiteWorkflow(
		workflow: UpdateWorkflowPayload,
		siteId: string
	): Promise<WorkflowDetailResponse> {
		return await api
			.put(`${SITE_WORKFLOWS_PREFIX_URL}/${siteId}/workflows/${workflow.uuid}`, {
				json: workflow,
			})
			.json();
	}

	public async deleteWorkflow(workflowUuid: string): Promise<void> {
		return await api.delete(`${WORKFLOWS_PREFIX_URL}/${workflowUuid}`).json();
	}

	public async deleteSiteWorkflow(workflowUuid: string, siteId: string): Promise<void> {
		return await api
			.delete(`${SITE_WORKFLOWS_PREFIX_URL}/${siteId}/workflows/${workflowUuid}`)
			.json();
	}

	public activateWorkflow(workflowUuid: string): Promise<WorkflowDetailResponse> {
		return api.put(`${WORKFLOWS_PREFIX_URL}/${workflowUuid}/activate`).json();
	}

	public deactivateWorkflow(workflowUuid: string): Promise<WorkflowDetailResponse> {
		return api.put(`${WORKFLOWS_PREFIX_URL}/${workflowUuid}/deactivate`).json();
	}
}

export const workflowsApiService = new WorkflowsApiService();
