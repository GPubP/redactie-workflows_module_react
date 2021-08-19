import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';
import { from, Observable } from 'rxjs';

import { showAlert } from '../../helpers';
import {
	ActivateWorkflowPayload,
	CreateWorkflowPayload,
	DeleteWorkflowPayload,
	WorkflowDetailResponse,
	workflowsApiService,
	WorkflowsApiService,
} from '../../services/workflows';

import {
	WorkflowDetailModel,
	WorkflowDetailUIModel,
	workflowsDetailQuery,
	WorkflowsDetailQuery,
	workflowsDetailStore,
	WorkflowsDetailStore,
} from './detail';
import {
	WorkflowsListModel,
	workflowsListPaginator,
	workflowsListQuery,
	WorkflowsListQuery,
	WorkflowsListState,
	workflowsListStore,
	WorkflowsListStore,
} from './list';
import { getAlertMessages } from './workflows.alertMessages';
import { WORKFLOW_ALERT_CONTAINER_IDS } from './workflows.const';
import {
	CreateWorkflowsPayloadOptions,
	DeleteWorkflowsPayloadOptions,
	GetWorkflowsPaginatedPayloadOptions,
} from './workflows.types';

export class WorkflowsFacade {
	constructor(
		protected listStore: WorkflowsListStore,
		protected listQuery: WorkflowsListQuery,
		public listPaginator: PaginatorPlugin<WorkflowsListState>,
		protected detailStore: WorkflowsDetailStore,
		protected detailQuery: WorkflowsDetailQuery,
		protected service: WorkflowsApiService
	) {}

	// LIST STATES
	public readonly workflows$ = this.listQuery.workflows$;
	public readonly listError$ = this.listQuery.error$;
	public readonly isFetching$ = this.listQuery.isFetching$;
	public readonly UIState$ = this.listQuery.selectUIState();

	public setIsFetching(isFetching = false): void {
		this.listStore.setIsFetching(isFetching);
	}
	public getIsFetching(): boolean {
		return this.listQuery.getIsFetching();
	}

	// DETAIL STATES
	public selectWorkflow(workflowUuid: string): Observable<WorkflowDetailModel | undefined> {
		return this.detailQuery.selectEntity(workflowUuid);
	}
	public selectWorkflowUIState(
		workflowUuid?: string
	): Observable<WorkflowDetailUIModel | undefined> {
		return this.detailQuery.ui.selectEntity(workflowUuid);
	}

	// LIST FUNCTIONS
	public getWorkflowsPaginated(
		searchParams: SearchParams,
		options?: GetWorkflowsPaginatedPayloadOptions
	): Observable<PaginationResponse<WorkflowsListModel>> {
		const defaultOptions = {
			alertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.overview,
			clearCache: false,
		};
		const serviceOptions = {
			...defaultOptions,
			...options,
		};
		if (serviceOptions.clearCache) {
			this.listPaginator.clearCache();
		}
		const alertMessages = getAlertMessages();

		return from(
			this.service
				.getWorkflows(searchParams)
				.then(response => {
					const paging = response._page;

					this.listStore.update({
						paging,
						error: null,
					});

					return {
						perPage: paging.size,
						currentPage: workflowsListPaginator.currentPage,
						lastPage: paging.totalPages,
						total: paging.totalElements,
						data: response?._embedded.workflows,
					};
				})
				.catch(error => {
					showAlert(serviceOptions.alertContainerId, 'error', alertMessages.fetch.error);
					this.listStore.update({
						error,
						isFetching: false,
					});
					throw error;
				})
		);
	}

	public async createWorkflow(
		payload: CreateWorkflowPayload,
		options: CreateWorkflowsPayloadOptions = {
			successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.create,
			errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.create,
		}
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsCreating(true);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.createWorkflow(payload)
			.then(workflow => {
				this.detailStore.update({
					isCreating: false,
					error: null,
				});
				this.detailStore.upsert(workflow.uuid, workflow);
				this.listPaginator.clearCache();

				// Timeout because the alert should be visible on the transitions page
				setTimeout(() => {
					showAlert(
						options.successAlertContainerId,
						'success',
						alertMessages.create.success
					);
				}, 300);
				return workflow;
			})
			.catch(error => {
				showAlert(options.errorAlertContainerId, 'error', alertMessages.create.error);
				this.detailStore.update({
					isCreating: false,
					error,
				});
			});
	}

	public async deleteWorkflow(
		payload: DeleteWorkflowPayload,
		options: DeleteWorkflowsPayloadOptions = {
			successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.overview,
			errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.settings,
		}
	): Promise<void> {
		this.detailStore.setIsDeletingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.deleteWorkflow(payload.uuid)
			.then(() => {
				this.detailStore.remove(payload.uuid);
				this.listPaginator.clearCache();

				// Timeout because the alert is visible on the overview page
				// and not on the edit page
				setTimeout(() => {
					showAlert(
						options.successAlertContainerId,
						'success',
						alertMessages.delete.success
					);
				}, 300);
			})
			.catch(error => {
				showAlert(options.errorAlertContainerId, 'error', alertMessages.delete.error);
				this.detailStore.ui.upsert(payload.uuid, {
					error,
					isDeleting: false,
				});
			});
	}

	public async activateWorkflow(
		payload: ActivateWorkflowPayload
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsUpdatingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.name);

		return this.service
			.activateWorkflow(payload.uuid)
			.then(workflow => {
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error: null,
				});
				this.detailStore.upsert(workflow.uuid, workflow);
				this.listPaginator.clearCache();

				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.settings,
					'success',
					alertMessages.activate.success
				);
				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.settings,
					'error',
					alertMessages.activate.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}

	public async deactivateWorkflow(
		payload: ActivateWorkflowPayload
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsUpdatingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.name);

		return this.service
			.deactivateWorkflow(payload.uuid)
			.then(workflow => {
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error: null,
				});
				this.detailStore.upsert(workflow.uuid, workflow);
				this.listPaginator.clearCache();

				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.settings,
					'success',
					alertMessages.deactivate.success
				);
				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.settings,
					'error',
					alertMessages.deactivate.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}
}

export const workflowsFacade = new WorkflowsFacade(
	workflowsListStore,
	workflowsListQuery,
	workflowsListPaginator,
	workflowsDetailStore,
	workflowsDetailQuery,
	workflowsApiService
);
