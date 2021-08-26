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
	useTenantContext,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import {
	useActiveTabs,
	useRoutesBreadcrumbs,
	useWorkflow,
	useWorkflowsUIStates,
} from '../../hooks';
import { UpdateWorkflowPayload } from '../../services/workflows';
import { workflowsFacade } from '../../store/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { DETAIL_TABS, MODULE_PATHS } from '../../workflows.const';
import { WorkflowRouteProps } from '../../workflows.types';

const WorkflowEdit: FC<WorkflowRouteProps> = ({ location, route, match }) => {
	const { workflowUuid } = match.params;

	/**
	 * Hooks
	 */

	const { tenantId } = useTenantContext();

	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);
	const [t] = useCoreTranslation();
	const [initialLoading, setInitialLoading] = useState(true);
	const activeTabs = useActiveTabs(DETAIL_TABS, location.pathname);
	const { generatePath, navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Workflows',
			target: generatePath(MODULE_PATHS.workflowsOverview),
		},
	]);
	const [workflow] = useWorkflow(workflowUuid);
	const [, detailState] = useWorkflowsUIStates(workflowUuid);

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
		await workflowsFacade.updateWorkflow(body);
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
			onCancel: () => navigate(MODULE_PATHS.workflowsOverview),
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
				tabs={activeTabs}
				linkProps={(props: { href: string }) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.workflowEdit}/${props.href}`, {
						workflowUuid,
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

export default WorkflowEdit;
