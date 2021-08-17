import { PaginatorPlugin } from '@datorama/akita';
import { Observable } from 'rxjs';

import { workflowsApiService, WorkflowsApiService } from '../../services/workflows';

import {
	WorkflowDetailModel,
	workflowsDetailQuery,
	WorkflowsDetailQuery,
	workflowsDetailStore,
	WorkflowsDetailStore,
} from './detail';
import {
	workflowsListPaginator,
	workflowsListQuery,
	WorkflowsListQuery,
	WorkflowsListState,
	workflowsListStore,
	WorkflowsListStore,
} from './list';

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
	public selectWorkflow(workflowId: string): Observable<WorkflowDetailModel | undefined> {
		return this.detailQuery.selectEntity(workflowId);
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
