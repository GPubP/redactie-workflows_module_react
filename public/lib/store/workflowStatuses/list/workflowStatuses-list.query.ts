import { combineQueries } from '@datorama/akita';
import { CacheEntityQuery } from '@redactie/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { workflowStatusesDetailQuery, WorkflowStatusesDetailQuery } from '../detail';

import {
	WorkflowStatusesListState,
	WorkflowStatusesListUIModel,
} from './workflowStatuses-list.model';
import {
	workflowStatusesListStore,
	WorkflowStatusesListStore,
} from './workflowStatuses-list.store';

export class WorkflowStatusesListQuery extends CacheEntityQuery<
	WorkflowStatusesListUIModel,
	WorkflowStatusesListState
> {
	constructor(
		protected store: WorkflowStatusesListStore,
		protected detailQuery: WorkflowStatusesDetailQuery
	) {
		super(store);
	}

	public workflows$ = this.selectAll();

	public getIsFetching(): boolean {
		return this.getValue().isFetching;
	}

	public selectUIState(): Observable<WorkflowStatusesListUIModel> {
		return combineQueries([
			this.select(['error', 'isFetching']),
			this.detailQuery.select(['error', 'isCreating']),
		]).pipe(
			map(([globalListUIState, globalDetailState]) => {
				const error = globalListUIState.error || globalDetailState.error;

				return {
					isCreating: globalDetailState.isCreating,
					isFetching: globalListUIState.isFetching,
					error,
				};
			})
		);
	}
}

export const workflowStatusesListQuery = new WorkflowStatusesListQuery(
	workflowStatusesListStore,
	workflowStatusesDetailQuery
);
