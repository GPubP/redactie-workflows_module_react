import { PaginationResponse } from '@datorama/akita';
import { SearchParams, useObservable, usePrevious } from '@redactie/utils';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { combineLatest, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { workflowStatusesFacade, WorkflowStatusesListModel } from '../../store/workflowStatuses';

import { UsePaginatedWorkflowStatuses } from './usePaginatedWorkflowStatuses.types';

const paginator = workflowStatusesFacade.listPaginator;
const subject = new Subject<SearchParams>();
const searchParamsObservable = subject.asObservable();

const usePaginatedWorkflowStatuses: UsePaginatedWorkflowStatuses = (
	searchParams,
	options?: {
		clearCache?: boolean;
		sparse?: boolean;
		siteId?: string;
	}
) => {
	const [pagination, setPagination] = useState<PaginationResponse<
		WorkflowStatusesListModel
	> | null>(null);
	const prevSearchParams = usePrevious<SearchParams>(searchParams);
	const loading = useObservable(workflowStatusesFacade.isFetching$, true);
	const error = useObservable(workflowStatusesFacade.listError$, null);

	useEffect(() => {
		const s = combineLatest([paginator.pageChanges, searchParamsObservable])
			.pipe(
				filter(([page, searchParams]) => {
					if (workflowStatusesFacade.getIsFetching()) {
						return false;
					}

					return page === searchParams.page;
				}),
				tap(() => workflowStatusesFacade.setIsFetching(true)),
				switchMap(([, searchParams]) =>
					paginator.getPage(() =>
						options?.siteId
							? workflowStatusesFacade.getSiteWorkflowStatusesPaginated(
									options.siteId,
									{
										...searchParams,
										sparse: options?.sparse,
									}
							  )
							: workflowStatusesFacade.getWorkflowStatusesPaginated({
									...searchParams,
									sparse: options?.sparse,
							  })
					)
				)
			)
			.subscribe(result => {
				if (result) {
					setPagination(result);
					workflowStatusesFacade.setIsFetching(false);
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
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

export default usePaginatedWorkflowStatuses;
