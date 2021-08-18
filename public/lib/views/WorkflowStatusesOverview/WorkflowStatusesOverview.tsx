import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	FilterItem,
	LoadingState,
	OrderBy,
	parseOrderByToString,
	parseStringToOrderBy,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { FilterForm, FilterFormState } from '../../components';
import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { usePaginatedWorkflowStatuses } from '../../hooks';
import useRoutesBreadcrumbs from '../../hooks/useRoutesBreadcrumbs/useRoutesBreadcrumbs';
import { DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS } from '../../services/workflowStatuses';
import { WORKFLOW_STATUSES_ALERT_CONTAINER_IDS } from '../../store/workflowStatuses.const';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps, WorkflowsMatchProps } from '../../workflows.types';

import {
	DEFAULT_FILTER_FORM,
	DEFAULT_OVERVIEW_QUERY_PARAMS,
	OVERVIEW_COLUMNS,
} from './workflowStatusesOverview.const';
import { WorkflowStatusesOverviewTableRow } from './workflowStatusesOverview.types';

const WorkflowStatusesOverview: FC<WorkflowModuleRouteProps<WorkflowsMatchProps>> = () => {
	const [filterFormState, setFilterFormState] = useState<FilterFormState>(DEFAULT_FILTER_FORM);
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const { navigate } = useNavigate();
	const [query, setQuery] = useAPIQueryParams(DEFAULT_OVERVIEW_QUERY_PARAMS);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const { loading, pagination } = usePaginatedWorkflowStatuses(query as SearchParams);

	useEffect(() => {
		if (mySecurityRightsLoadingState !== LoadingState.Loading) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [mySecurityRightsLoadingState]);

	// Set initial values with query params
	useEffect(() => {
		setFilterFormState({
			name: query.search ?? '',
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Functions
	 */
	const createFilters = (values: FilterFormState): FilterItem[] => {
		return [
			{
				key: 'search',
				valuePrefix: 'Zoekterm',
				value: values.name,
			},
		].filter(f => !!f.value);
	};

	const clearAllFilters = (): void => {
		setQuery({
			page: 1,
			search: undefined,
		});
		setFilterFormState(DEFAULT_FILTER_FORM);
	};

	const clearFilter = (item: FilterItem): void => {
		setQuery({ [item.key as string]: '' });
		setFilterFormState({
			...filterFormState,
			[item.key as string]: '',
		});
	};

	const onPageChange = (page: number): void => {
		setQuery({ page });
	};

	const onOrderBy = (orderBy: OrderBy): void => {
		setQuery({
			sort: parseOrderByToString({
				...orderBy,
				key: `data.${orderBy.key}`,
			}),
		});
	};

	const onApplyFilters = (values: FilterFormState): void => {
		setFilterFormState(values);
		setQuery({
			page: 1,
			search: values.name || undefined,
		});
	};

	const activeSorting = parseStringToOrderBy(query.sort ?? '');
	const activeFilters = createFilters(filterFormState);

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		const statusRows: WorkflowStatusesOverviewTableRow[] = (pagination?.data || []).map(
			status => ({
				workflowStatusUuid: status.uuid as string,
				name: status.data.name,
				description: status.data.description,
				removable: !!status.meta?.removable,
				navigate: (workflowStatusUuid: string) =>
					navigate(MODULE_PATHS.workflowStatusEdit, { workflowStatusUuid }),
			})
		);

		return (
			<>
				<FilterForm
					initialState={DEFAULT_FILTER_FORM}
					onCancel={clearAllFilters}
					onSubmit={onApplyFilters}
					deleteActiveFilter={clearFilter}
					activeFilters={activeFilters}
				/>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--sm"
					columns={OVERVIEW_COLUMNS(t, mySecurityrights)}
					rows={statusRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS.pagesize}
					onPageChange={onPageChange}
					orderBy={onOrderBy}
					activeSorting={activeSorting}
					totalValues={pagination?.total || 0}
					loading={loading}
					loadDataMessage="Statussen ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Statussen">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<rolesRightsConnector.api.components.SecurableRender
						userSecurityRights={mySecurityrights}
						requiredSecurityRights={[
							rolesRightsConnector.securityRights.createWorkflowStatus,
						]}
					>
						<Button
							iconLeft="plus"
							onClick={() => navigate(`${MODULE_PATHS.workflowStatusCreate}`)}
						>
							{t(CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
						</Button>
					</rolesRightsConnector.api.components.SecurableRender>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_STATUSES_ALERT_CONTAINER_IDS.fetch}
				/>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default WorkflowStatusesOverview;
