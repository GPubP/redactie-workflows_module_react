import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { SiteDetailModel } from '@redactie/sites-module';
import { SearchParams } from '@redactie/utils';
import { from, Observable } from 'rxjs';

import { showAlert } from '../../helpers';
import {
	ActivateWorkflowPayload,
	CreateWorkflowPayload,
	DeleteWorkflowPayload,
	UpdateWorkflowPayload,
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
	GetWorkflowPayloadOptions,
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

	public getSiteWorkflowsPaginated(
		siteId: string,
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
				.getSiteWorkflows(searchParams, siteId)
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

	// DETAIL FUNCTIONS
	public hasWorkflow(workflowUuid: string): boolean {
		return this.detailQuery.hasEntity(workflowUuid);
	}

	public async getWorkflow(
		workflowUuid: string,
		options?: GetWorkflowPayloadOptions
	): Promise<void> {
		const defaultOptions = {
			alertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
			force: false,
		};
		const serviceOptions = {
			...defaultOptions,
			...options,
		};
		if (this.detailQuery.hasEntity(workflowUuid) && !serviceOptions.force) {
			return Promise.resolve();
		}
		const alertMessages = getAlertMessages();
		this.detailStore.setIsFetchingEntity(true, workflowUuid);
		return this.service
			.getWorkflow(workflowUuid)
			.then(response => {
				this.detailStore.upsert(response.uuid, response);
				this.detailStore.ui.upsert(response.uuid, { error: null, isFetching: false });
			})
			.catch(error => {
				showAlert(serviceOptions.alertContainerId, 'error', alertMessages.fetchOne.error);
				this.detailStore.ui.upsert(workflowUuid, {
					error,
					isFetching: false,
				});
			});
	}

	public async getSiteWorkflow(
		siteId: string,
		workflowUuid: string,
		options?: GetWorkflowPayloadOptions
	): Promise<void> {
		const defaultOptions = {
			alertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
			force: false,
		};
		const serviceOptions = {
			...defaultOptions,
			...options,
		};
		if (this.detailQuery.hasEntity(workflowUuid) && !serviceOptions.force) {
			return Promise.resolve();
		}
		const alertMessages = getAlertMessages();
		this.detailStore.setIsFetchingEntity(true, workflowUuid);
		return this.service
			.getSiteWorkflow(workflowUuid, siteId)
			.then(response => {
				this.detailStore.upsert(response.uuid, response);
				this.detailStore.ui.upsert(response.uuid, { error: null, isFetching: false });
			})
			.catch(error => {
				showAlert(serviceOptions.alertContainerId, 'error', alertMessages.fetchOne.error);
				this.detailStore.ui.upsert(workflowUuid, {
					error,
					isFetching: false,
				});
			});
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

	public async createSiteWorkflow(
		siteId: string,
		payload: CreateWorkflowPayload,
		options: CreateWorkflowsPayloadOptions = {
			successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.create,
			errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.create,
		}
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsCreating(true);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.createSiteWorkflow(payload, siteId)
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

	public async updateWorkflow(
		payload: UpdateWorkflowPayload,
		alertInput: string,
		isTransitionUpdate = false
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsUpdatingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(alertInput);

		return this.service
			.updateWorkflow(payload)
			.then(workflow => {
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error: null,
				});
				this.detailStore.upsert(workflow.uuid, workflow);
				this.listPaginator.clearCache();

				// Timeout because the alert should be visible on the edit page
				setTimeout(() => {
					showAlert(
						WORKFLOW_ALERT_CONTAINER_IDS.update,
						'success',
						isTransitionUpdate
							? alertMessages.updateTransitions.success
							: alertMessages.update.success
					);
				}, 300);

				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.update,
					'error',
					isTransitionUpdate
						? alertMessages.updateTransitions.error
						: alertMessages.update.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}

	public async updateSiteWorkflow(
		siteId: string,
		payload: UpdateWorkflowPayload,
		alertInput: string,
		isTransitionUpdate = false
	): Promise<WorkflowDetailResponse | void> {
		this.detailStore.setIsUpdatingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(alertInput);

		return this.service
			.updateSiteWorkflow(payload, siteId)
			.then(workflow => {
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error: null,
				});
				this.detailStore.upsert(workflow.uuid, workflow);
				this.listPaginator.clearCache();

				setTimeout(
					() =>
						showAlert(
							WORKFLOW_ALERT_CONTAINER_IDS.update,
							'success',
							isTransitionUpdate
								? alertMessages.updateTransitions.success
								: alertMessages.update.success
						),
					300
				);

				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.update,
					'error',
					isTransitionUpdate
						? alertMessages.updateTransitions.error
						: alertMessages.update.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}

	public async deleteWorkflow(
		payload: DeleteWorkflowPayload,
		options: DeleteWorkflowsPayloadOptions = {
			successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.overview,
			errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
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

	public async deleteSiteWorkflow(
		siteId: string,
		payload: DeleteWorkflowPayload,
		options: DeleteWorkflowsPayloadOptions = {
			successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.overview,
			errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
		}
	): Promise<void> {
		this.detailStore.setIsDeletingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.deleteSiteWorkflow(payload.uuid, siteId)
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
					WORKFLOW_ALERT_CONTAINER_IDS.update,
					'success',
					alertMessages.activate.success
				);
				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.update,
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
					WORKFLOW_ALERT_CONTAINER_IDS.update,
					'success',
					alertMessages.deactivate.success
				);
				return workflow;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_ALERT_CONTAINER_IDS.update,
					'error',
					alertMessages.deactivate.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}

	public async workflowOccurrences(
		workflowUuid: string
	): Promise<{ data: SiteDetailModel[]; error: any }> {
		return this.service
			.workflowOccurrences(workflowUuid)
			.then(occurrences => {
				return {
					data: occurrences._embedded.sites,
					error: null,
				};
			})
			.catch(error => {
				return {
					data: [],
					error,
				};
			});
	}

	public async siteWorkflowOccurrences(
		siteId: string,
		workflowUuid: string
	): Promise<{ data: any; error: any }> {
		return this.service
			.siteWorkflowOccurrences(siteId, workflowUuid)
			.then(data => {
				return {
					data: data._embedded,
					error: null,
				};
			})
			.catch(error => {
				return {
					data: [],
					error,
				};
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
