import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	DataLoader,
	FilterItem,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import { FormikHelpers } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { FilterForm, FilterFormState, ResetForm } from '../../components';
import { CORE_TRANSLATIONS, rolesRightsConnector, useCoreTranslation } from '../../connectors';
import { usePaginatedWorkflowStatuses } from '../../hooks';
import useRoutesBreadcrumbs from '../../hooks/useRoutesBreadcrumbs/useRoutesBreadcrumbs';
import { DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS } from '../../services/workflowStatuses';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps, WorkflowsMatchProps } from '../../workflows.types';

import {
	OVERVIEW_COLUMNS,
	OVERVIEW_QUERY_PARAMS_CONFIG,
	WORKFLOW_STATUSES_OVERVIEW_INITIAL_FILTER_STATE,
} from './workflowStatusesOverview.const';
import { WorkflowStatusesOverviewTableRow } from './workflowStatusesOverview.types';

const WorkflowStatusesOverview: FC<WorkflowModuleRouteProps<WorkflowsMatchProps>> = () => {
	const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const { navigate } = useNavigate();
	const [query, setQuery] = useAPIQueryParams(OVERVIEW_QUERY_PARAMS_CONFIG, false);
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

	/**
	 * Functions
	 */
	const onSubmit = (
		{ name }: FilterFormState,
		formikHelpers: FormikHelpers<FilterFormState>
	): void => {
		setFilterItems([{ value: name, valuePrefix: 'Naam' }]);

		// Add array to searchParams
		setQuery({ search: [name] });
		formikHelpers.resetForm();
	};

	const deleteAllFilters = (resetForm: ResetForm): void => {
		// Clear filter items
		setFilterItems([]);
		// Reset search params
		setQuery({ ...DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS, search: undefined });
		resetForm();
	};

	const deleteFilter = (item: any): void => {
		// Delete item from filterItems
		const newFilters = filterItems?.filter(el => el.value !== item.value);
		// Get value array from filterItems
		const search = newFilters.map(item => item['value']);

		setFilterItems(newFilters);
		// Add search to searchParams
		setQuery({ search });
	};

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			...query,
			page: pageNumber,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery({
			...parseOrderByToObj({ ...orderBy, key: `meta.${orderBy.key}` }),
		});
	};

	const activeSorting: OrderBy = parseObjToOrderBy({
		sort: query.sort ? query.sort.split('.')[1] : '',
		direction: query.direction ?? 1,
	});

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		const statusRows: WorkflowStatusesOverviewTableRow[] = (pagination?.data || []).map(
			status => ({
				workflowStatusUuid: status.uuid as string,
				label: status.data.name,
				description: status.data.description,
				navigate: (workflowStatusUuid: string) =>
					navigate(MODULE_PATHS.workflowStatusEdit, { workflowStatusUuid }),
			})
		);

		return (
			<>
				<FilterForm
					initialState={WORKFLOW_STATUSES_OVERVIEW_INITIAL_FILTER_STATE}
					onCancel={deleteAllFilters}
					onSubmit={onSubmit}
					deleteActiveFilter={deleteFilter}
					activeFilters={filterItems}
				/>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--sm"
					columns={OVERVIEW_COLUMNS(t, mySecurityrights)}
					rows={statusRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS.pagesize}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={pagination?.total || 0}
					loading={loading}
					loadDataMessage="Views ophalen"
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
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default WorkflowStatusesOverview;
