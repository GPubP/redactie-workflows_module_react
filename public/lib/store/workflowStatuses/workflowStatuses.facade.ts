import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';
import { from, Observable } from 'rxjs';

import { showAlert } from '../../helpers';
import {
	WorkflowStatusDetailResponse,
	workflowStatusesApiService,
	WorkflowStatusesApiService,
} from '../../services/workflowStatuses';
import { Workflow } from '../../services/workflows';

import {
	WorkflowStatusDetailModel,
	WorkflowStatusDetailUIModel,
	workflowStatusesDetailQuery,
	WorkflowStatusesDetailQuery,
	workflowStatusesDetailStore,
	WorkflowStatusesDetailStore,
} from './detail';
import {
	WorkflowStatusesListModel,
	workflowStatusesListPaginator,
	workflowStatusesListQuery,
	WorkflowStatusesListQuery,
	WorkflowStatusesListState,
	workflowStatusesListStore,
	WorkflowStatusesListStore,
} from './list';
import {
	workflowStatusOccurrencesDetailQuery,
	WorkflowStatusOccurrencesDetailQuery,
	WorkflowStatusOccurrencesDetailUIModel,
} from './occurrences';
import {
	workflowStatusOccurrencesDetailStore,
	WorkflowStatusOccurrencesDetailStore,
} from './occurrences/workflowOccurrences-detail.store';
import { getAlertMessages } from './workflowStatuses.alertMessages';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from './workflowStatuses.const';
import {
	CreateWorkflowStatusPayload,
	DeleteWorkflowStatusPayload,
	GetWorkflowStatusesPaginatedPayloadOptions,
	UpdateWorkflowStatusPayload,
} from './workflowStatuses.types';

export class WorkflowStatusesFacade {
	constructor(
		protected listStore: WorkflowStatusesListStore,
		protected listQuery: WorkflowStatusesListQuery,
		public listPaginator: PaginatorPlugin<WorkflowStatusesListState>,
		protected detailStore: WorkflowStatusesDetailStore,
		protected detailQuery: WorkflowStatusesDetailQuery,
		protected occurrencesStore: WorkflowStatusOccurrencesDetailStore,
		protected occurrencesQuery: WorkflowStatusOccurrencesDetailQuery,
		protected service: WorkflowStatusesApiService
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
	public selectWorkflowStatus(
		workflowStatusUuid: string
	): Observable<WorkflowStatusDetailModel | undefined> {
		return this.detailQuery.selectEntity(workflowStatusUuid);
	}

	public selectWorkflowStatusUIState(
		workflowStatusUuid?: string
	): Observable<WorkflowStatusDetailUIModel | undefined> {
		return this.detailQuery.ui.selectEntity(workflowStatusUuid);
	}

	public selectWorkflowStatusOccurrences(
		workflowStatusUuid: string
	): Observable<Workflow[] | undefined> {
		return this.occurrencesQuery.selectEntity(workflowStatusUuid, 'items');
	}

	public selectWorkflowStatusOccurrencesUIState(
		workflowStatusUuid?: string
	): Observable<WorkflowStatusOccurrencesDetailUIModel | undefined> {
		return this.occurrencesQuery.ui.selectEntity(workflowStatusUuid);
	}

	// LIST FUNCTIONS
	public getWorkflowStatusesPaginated(
		searchParams: SearchParams,
		options?: GetWorkflowStatusesPaginatedPayloadOptions
	): Observable<PaginationResponse<WorkflowStatusesListModel>> {
		const defaultOptions = {
			alertContainerId: WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch,
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
				.getWorkflowStatuses(searchParams)
				.then(response => {
					const paging = response._page;

					this.listStore.update({
						paging,
						error: null,
					});

					return {
						perPage: paging.size,
						currentPage: workflowStatusesListPaginator.currentPage,
						lastPage: paging.totalPages,
						total: paging.totalElements,
						data: response?._embedded.statuses,
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

	public getSiteWorkflowStatusesPaginated(
		siteId: string,
		searchParams: SearchParams,
		options?: GetWorkflowStatusesPaginatedPayloadOptions
	): Observable<PaginationResponse<WorkflowStatusesListModel>> {
		const defaultOptions = {
			alertContainerId: WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch,
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
				.getSiteWorkflowStatuses(siteId, searchParams)
				.then(response => {
					const paging = response._page;

					this.listStore.update({
						paging,
						error: null,
					});

					return {
						perPage: paging.size,
						currentPage: workflowStatusesListPaginator.currentPage,
						lastPage: paging.totalPages,
						total: paging.totalElements,
						data: response?._embedded.statuses,
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
	public hasWorkflowStatus(workflowStatusUuid: string): boolean {
		return this.detailQuery.hasEntity(workflowStatusUuid);
	}

	public async getWorkflowStatus(
		workflowStatusUuid: string,
		options: { force: boolean } = { force: true }
	): Promise<void> {
		if (this.detailQuery.hasEntity(workflowStatusUuid) && !options.force) {
			return Promise.resolve();
		}

		const alertMessages = getAlertMessages();
		this.detailStore.setIsFetchingEntity(true, workflowStatusUuid);

		return this.service
			.getWorkflowStatus(workflowStatusUuid)
			.then(response => {
				this.detailStore.upsert(response.uuid as string, response);
				this.detailStore.ui.upsert(response.uuid, { error: null, isFetching: false });
			})
			.catch(error => {
				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetchOne,
					'error',
					alertMessages.fetchOne.error
				);
				this.detailStore.ui.upsert(workflowStatusUuid, {
					error,
					isFetching: false,
				});
			});
	}

	public async createWorkflowStatus(
		payload: CreateWorkflowStatusPayload
	): Promise<WorkflowStatusDetailModel | void> {
		this.detailStore.setIsCreating(true);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.createWorkflowStatus(payload)
			.then(workflowStatus => {
				this.detailStore.update({
					isCreating: false,
					error: null,
				});
				this.detailStore.upsert(workflowStatus.uuid as string, workflowStatus);
				this.listPaginator.clearCache();

				// Timeout because the alert should be visible on the overview page
				setTimeout(() => {
					showAlert(
						WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch,
						'success',
						alertMessages.create.success
					);
				}, 300);

				return workflowStatus;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.create,
					'error',
					alertMessages.create.error
				);
				this.detailStore.update({
					isCreating: false,
					error,
				});
			});
	}

	public async updateWorkflowStatus(
		payload: UpdateWorkflowStatusPayload
	): Promise<WorkflowStatusDetailResponse | void> {
		this.detailStore.setIsUpdatingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.updateWorkflowStatus(payload)
			.then(workflowStatus => {
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error: null,
				});
				this.detailStore.upsert(workflowStatus.uuid as string, workflowStatus);
				this.listPaginator.clearCache();

				// Timeout because the alert should be visible on the overview page
				setTimeout(() => {
					showAlert(
						WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch,
						'success',
						alertMessages.update.success
					);
				}, 300);

				return workflowStatus;
			})
			.catch(error => {
				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.update,
					'error',
					alertMessages.update.error
				);
				this.detailStore.ui.update(payload.uuid, {
					isUpdating: false,
					error,
				});
			});
	}

	public async deleteWorkflowStatus(payload: DeleteWorkflowStatusPayload): Promise<void> {
		this.detailStore.setIsDeletingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.deleteWorkflowStatus(payload.uuid as string)
			.then(() => {
				this.detailStore.remove(payload.uuid);
				this.listPaginator.clearCache();

				// Timeout because the alert should be visible on the overview page
				setTimeout(() => {
					showAlert(
						WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch,
						'success',
						alertMessages.delete.success
					);
				}, 300);
			})
			.catch(error => {
				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.update,
					'error',
					alertMessages.delete.error
				);

				this.detailStore.ui.upsert(payload.uuid, {
					error,
					isDeleting: false,
				});

				throw new Error('Deleting workflow status failed!');
			});
	}

	public async getWorkflowStatusOccurrences(
		workflowStatusUuid: string,
		options: { force: boolean } = { force: true }
	): Promise<void> {
		if (this.occurrencesQuery.hasEntity(workflowStatusUuid) && !options.force) {
			return Promise.resolve();
		}

		const alertMessages = getAlertMessages();
		this.occurrencesStore.setIsFetchingEntity(true, workflowStatusUuid);

		return this.service
			.getWorkflowStatusOccurences(workflowStatusUuid)
			.then(response => {
				this.occurrencesStore.upsert(workflowStatusUuid as string, {
					items: response._embedded.workflows,
				});
				this.occurrencesStore.ui.upsert(workflowStatusUuid, {
					error: null,
					isFetching: false,
				});
			})
			.catch(error => {
				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetchOne,
					'error',
					alertMessages.fetchOccurrences.error
				);
				this.occurrencesStore.ui.upsert(workflowStatusUuid, {
					error,
					isFetching: false,
				});
			});
	}
}

export const workflowStatusesFacade = new WorkflowStatusesFacade(
	workflowStatusesListStore,
	workflowStatusesListQuery,
	workflowStatusesListPaginator,
	workflowStatusesDetailStore,
	workflowStatusesDetailQuery,
	workflowStatusOccurrencesDetailStore,
	workflowStatusOccurrencesDetailQuery,
	workflowStatusesApiService
);
