import { combineQueries } from '@datorama/akita';
import { CacheEntityQuery } from '@redactie/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { workflowsDetailQuery, WorkflowsDetailQuery } from '../detail';

import { WorkflowsListState, WorkflowsListUIModel } from './workflows-list.model';
import { workflowsListStore, WorkflowsListStore } from './workflows-list.store';

export class WorkflowsListQuery extends CacheEntityQuery<WorkflowsListUIModel, WorkflowsListState> {
	constructor(protected store: WorkflowsListStore, protected detailQuery: WorkflowsDetailQuery) {
		super(store);
	}

	public workflows$ = this.selectAll();

	public getIsFetching(): boolean {
		return this.getValue().isFetching;
	}

	public selectUIState(): Observable<WorkflowsListUIModel> {
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

export const workflowsListQuery = new WorkflowsListQuery(workflowsListStore, workflowsDetailQuery);
