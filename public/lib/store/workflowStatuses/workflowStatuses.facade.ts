import { PaginatorPlugin } from '@datorama/akita';
import { Observable } from 'rxjs';

import {
	workflowStatusesApiService,
	WorkflowStatusesApiService,
} from '../../services/workflowStatuses';

import {
	WorkflowStatusDetailModel,
	workflowStatusesDetailQuery,
	WorkflowStatusesDetailQuery,
	workflowStatusesDetailStore,
	WorkflowStatusesDetailStore,
} from './detail';
import {
	workflowStatusesListPaginator,
	workflowStatusesListQuery,
	WorkflowStatusesListQuery,
	WorkflowStatusesListState,
	workflowStatusesListStore,
	WorkflowStatusesListStore,
} from './list';

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
		workflowStatusId: string
	): Observable<WorkflowStatusDetailModel | undefined> {
		return this.detailQuery.selectEntity(workflowStatusId);
	}
}

export const workflowsFacade = new WorkflowStatusesFacade(
	workflowStatusesListStore,
	workflowStatusesListQuery,
	workflowStatusesListPaginator,
	workflowStatusesDetailStore,
	workflowStatusesDetailQuery,
	workflowStatusesApiService
);
