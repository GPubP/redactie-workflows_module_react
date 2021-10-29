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
import { usePaginatedWorkflows, useRoutesBreadcrumbs } from '../../hooks';
import { DEFAULT_WORKFLOWS_SEARCH_PARAMS } from '../../services/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps, WorkflowsMatchProps } from '../../workflows.types';

import { DEFAULT_OVERVIEW_QUERY_PARAMS, OVERVIEW_COLUMNS } from './workflowsOverview.const';
import { WorkflowsOverviewTableRow } from './workflowsOverview.types';

const WorkflowsOverview: FC<WorkflowModuleRouteProps<WorkflowsMatchProps>> = () => {
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const { navigate, generatePath } = useNavigate();
	const [query, setQuery] = useAPIQueryParams(DEFAULT_OVERVIEW_QUERY_PARAMS);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const { loading, pagination } = usePaginatedWorkflows(query as SearchParams, { sparse: true });

	useEffect(() => {
		if (mySecurityRightsLoadingState !== LoadingState.Loading) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [mySecurityRightsLoadingState]);

	/**
	 * Functions
	 */
	const createFilters = ({ search }: FilterFormState): FilterItem[] => {
		return [
			...(search
				? [
						{
							key: 'search',
							valuePrefix: 'Zoekterm',
							value: search,
						},
				  ]
				: []),
		].filter(f => !!f.value);
	};

	const clearAllFilters = (): void => {
		setQuery({
			page: 1,
			search: undefined,
		});
	};

	const clearFilter = (item: FilterItem): void => {
		setQuery({ [item.key as string]: '' });
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
		setQuery({
			page: 1,
			search: values.search || undefined,
		});
	};

	const filterFormState: FilterFormState = { search: query.search ?? '' };
	const activeSorting = parseStringToOrderBy(query.sort ?? '');
	const activeFilters = createFilters(filterFormState);

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		const workflowRows: WorkflowsOverviewTableRow[] = (pagination?.data || []).map(
			workflow => ({
				workflowUuid: workflow.uuid as string,
				detailPath: generatePath(MODULE_PATHS.workflowEdit, {
					workflowUuid: workflow.uuid,
				}),
				name: workflow.data.name,
				description: workflow.data.description,
				isDefault: !!workflow.meta?.default,
				active: !!workflow.meta?.active,
				navigate: (workflowUuid: string) =>
					navigate(MODULE_PATHS.workflowTransitions, { workflowUuid }),
			})
		);

		return (
			<>
				<FilterForm
					initialState={filterFormState}
					onCancel={clearAllFilters}
					onSubmit={onApplyFilters}
					deleteActiveFilter={clearFilter}
					activeFilters={activeFilters}
				/>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--sm"
					columns={OVERVIEW_COLUMNS(t)}
					rows={workflowRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_WORKFLOWS_SEARCH_PARAMS.pagesize}
					onPageChange={onPageChange}
					orderBy={onOrderBy}
					activeSorting={activeSorting}
					totalValues={pagination?.total || 0}
					loading={loading}
					loadDataMessage="Workflows ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Workflows">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<rolesRightsConnector.api.components.SecurableRender
						userSecurityRights={mySecurityrights}
						requiredSecurityRights={[
							rolesRightsConnector.securityRights.createWorkflow,
						]}
					>
						<Button
							iconLeft="plus"
							onClick={() => navigate(`${MODULE_PATHS.workflowCreate}`)}
						>
							{t(CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
						</Button>
					</rolesRightsConnector.api.components.SecurableRender>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_ALERT_CONTAINER_IDS.overview}
				/>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default WorkflowsOverview;
