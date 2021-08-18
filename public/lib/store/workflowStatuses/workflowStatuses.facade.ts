import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';
import { from, Observable } from 'rxjs';

import { showAlert } from '../../helpers';
import {
	WorkflowStatusDetailResponse,
	workflowStatusesApiService,
	WorkflowStatusesApiService,
} from '../../services/workflowStatuses';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from '../workflowStatuses.const';

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
import { getAlertMessages } from './workflowStatuses.alertMessages';
import {
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
						data: response?._embedded,
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

	public getWorkflowStatus(
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
				this.detailStore.upsert(response.uuid, response);
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

	public updateWorkflowStatus(
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
				this.detailStore.upsert(workflowStatus.uuid, workflowStatus);
				this.listPaginator.clearCache();

				showAlert(
					WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.update,
					'success',
					alertMessages.update.success
				);

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

	public deleteWorkflowStatus(payload: DeleteWorkflowStatusPayload): Promise<void> {
		this.detailStore.setIsDeletingEntity(true, payload.uuid);
		const alertMessages = getAlertMessages(payload.data.name);

		return this.service
			.deleteWorkflowStatus(payload.uuid)
			.then(() => {
				this.detailStore.remove(payload.uuid);
				this.listPaginator.clearCache();

				// Timeout because the alert is visible on the overview page
				// and not on the edit page
				setTimeout(() => {
					showAlert(
						WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.update,
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
}

export const workflowStatusesFacade = new WorkflowStatusesFacade(
	workflowStatusesListStore,
	workflowStatusesListQuery,
	workflowStatusesListPaginator,
	workflowStatusesDetailStore,
	workflowStatusesDetailQuery,
	workflowStatusesApiService
);
