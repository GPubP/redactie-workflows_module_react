import { PaginationResponse } from '@datorama/akita';
import { SearchParams, useObservable, usePrevious } from '@redactie/utils';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { combineLatest, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { workflowsFacade, WorkflowsListModel } from '../../store/workflows';

import { UsePaginatedWorkflows } from './usePaginatedWorkflows.types';

const paginator = workflowsFacade.listPaginator;
const subject = new Subject<SearchParams>();
const searchParamsObservable = subject.asObservable();

const usePaginatedWorkflows: UsePaginatedWorkflows = (
	searchParams,
	options?: { clearCache?: boolean; siteId?: string }
) => {
	const [pagination, setPagination] = useState<PaginationResponse<WorkflowsListModel> | null>(
		null
	);
	const prevSearchParams = usePrevious<SearchParams>(searchParams);
	const loading = useObservable(workflowsFacade.isFetching$, true);
	const error = useObservable(workflowsFacade.listError$, null);

	useEffect(() => {
		const s = combineLatest([paginator.pageChanges, searchParamsObservable])
			.pipe(
				filter(([page, searchParams]) => {
					if (workflowsFacade.getIsFetching()) {
						return false;
					}

					return page === searchParams.page;
				}),
				tap(() => workflowsFacade.setIsFetching(true)),
				switchMap(([, searchParams]) =>
					paginator.getPage(() =>
						options?.siteId
							? workflowsFacade.getSiteWorkflowsPaginated(
									options?.siteId,
									searchParams
							  )
							: workflowsFacade.getWorkflowsPaginated(searchParams)
					)
				)
			)
			.subscribe(result => {
				if (result) {
					setPagination(result);
					workflowsFacade.setIsFetching(false);
				}
			});

		return () => {
			s.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (equals(searchParams, prevSearchParams)) {
			return;
		}

		if (
			searchParams.sort !== prevSearchParams?.sort ||
			searchParams.search !== prevSearchParams?.search ||
			options?.clearCache
		) {
			paginator.clearCache();
		}

		subject.next(searchParams);

		if (searchParams.page !== prevSearchParams?.page) {
			paginator.setPage(searchParams.page ?? 1);
		}
	}, [
		options,
		prevSearchParams,
		searchParams,
		searchParams.page,
		searchParams.search,
		searchParams.sort,
	]);

	return {
		loading,
		pagination,
		refreshCurrentPage: paginator.refreshCurrentPage.bind(paginator),
		error,
	};
};

export default usePaginatedWorkflows;
