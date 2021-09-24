import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	RenderChildRoutes,
	useNavigate,
	useSiteContext,
	useTenantContext,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { isTenantWorfklow } from '../../helpers';
import {
	useActiveTabs,
	useRoutesBreadcrumbs,
	useWorkflow,
	useWorkflowsUIStates,
} from '../../hooks';
import { UpdateWorkflowPayload } from '../../services/workflows';
import { workflowsFacade } from '../../store/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { DETAIL_TABS, MODULE_PATHS, SITES_ROOT } from '../../workflows.const';
import { WorkflowRouteProps } from '../../workflows.types';

const SiteWorkflowEdit: FC<WorkflowRouteProps> = ({ location, route, match }) => {
	const { workflowUuid } = match.params;

	/**
	 * Hooks
	 */

	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();

	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);
	const [t] = useCoreTranslation();
	const [initialLoading, setInitialLoading] = useState(true);
	const activeTabs = useActiveTabs(DETAIL_TABS, location.pathname);
	const { generatePath, navigate } = useNavigate(SITES_ROOT);
	const breadcrumbs = useRoutesBreadcrumbs(
		[
			{
				name: 'Workflows',
				target: generatePath(MODULE_PATHS.site.workflowsOverview, { siteId }),
			},
		],
		[],
		true
	);
	const [workflow] = useWorkflow(workflowUuid, siteId);
	const [, detailState] = useWorkflowsUIStates(workflowUuid);
	const isTenant = useMemo(() => isTenantWorfklow(workflow), [workflow]);

	// Set initial loading
	useEffect(() => {
		if (initialLoading && detailState && !detailState.isFetching && workflow) {
			return setInitialLoading(false);
		}
	}, [initialLoading, detailState, workflow]);

	/**
	 * Methods
	 */

	const updateWorkflow = async (body: UpdateWorkflowPayload): Promise<void> => {
		await workflowsFacade.updateSiteWorkflow(siteId, body);
	};

	/**
	 * Render
	 */
	const pageTitle = `${workflow?.data.name ? `'${workflow?.data.name}'` : 'Workflow'} ${t(
		CORE_TRANSLATIONS.ROUTING_UPDATE
	)}`;

	const renderChildRoutes = (): ReactElement | null => {
		const extraOptions = {
			workflow,
			onCancel: () => navigate(MODULE_PATHS.site.workflowsOverview, { siteId }),
			onSubmit: updateWorkflow,
		};

		return (
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		);
	};

	return (
		<>
			<ContextHeader
				tabs={isTenant ? [] : activeTabs}
				linkProps={(props: { href: string }) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.site.workflowEdit}/${props.href}`, {
						workflowUuid,
						siteId,
					}),
					component: Link,
				})}
				title={pageTitle}
				badges={[
					{
						name: 'Workflow',
						type: 'primary',
					},
				]}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_ALERT_CONTAINER_IDS.update}
				/>
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</Container>
		</>
	);
};

export default SiteWorkflowEdit;
