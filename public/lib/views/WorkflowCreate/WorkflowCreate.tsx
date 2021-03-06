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
import React, { FC, ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { useActiveTabs, useRoutesBreadcrumbs } from '../../hooks';
import { CreateWorkflowPayload } from '../../services/workflows';
import { workflowsFacade } from '../../store/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { DETAIL_TABS, MODULE_PATHS } from '../../workflows.const';
import { WorkflowModuleRouteProps } from '../../workflows.types';

import { WORKFLOW_CREATE_ALLOWED_PATHS } from './workflowCreate.const';

const WorkflowCreate: FC<WorkflowModuleRouteProps> = ({ location, route }) => {
	/**
	 * Hooks
	 */

	const { tenantId } = useTenantContext();

	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);
	const [t] = useCoreTranslation();
	const activeTabs = useActiveTabs(DETAIL_TABS.slice(0, 1), location.pathname);
	const { generatePath, navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Workflows',
			target: generatePath(MODULE_PATHS.workflowsOverview),
		},
	]);

	/**
	 * Methods
	 */

	const generateEmptyWorkflow = (): CreateWorkflowPayload => ({
		data: {
			name: '',
			description: '',
		},
	});

	const createWorkflow = async (payload: CreateWorkflowPayload): Promise<void> => {
		return workflowsFacade
			.createWorkflow(payload, {
				errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.create,
				successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
			})
			.then(response => {
				if (response && response.uuid) {
					navigate(MODULE_PATHS.workflowTransitions, {
						workflowUuid: response.uuid,
					});
				}
			});
	};

	/**
	 * Render
	 */
	const pageTitle = `Workflow ${t(CORE_TRANSLATIONS.ROUTING_CREATE)}`;

	const renderChildRoutes = (): ReactElement | null => {
		const extraOptions = {
			allowedPaths: WORKFLOW_CREATE_ALLOWED_PATHS,
			workflow: generateEmptyWorkflow(),
			onCancel: () => navigate(MODULE_PATHS.workflowsOverview),
			onSubmit: createWorkflow,
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
				tabs={activeTabs.slice(0, 1)}
				linkProps={(props: { href: string }) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.workflowCreate}/${props.href}`),
					component: Link,
				})}
				title={pageTitle}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={WORKFLOW_ALERT_CONTAINER_IDS.create}
				/>
				<DataLoader loadingState={false} render={renderChildRoutes} />
			</Container>
		</>
	);
};

export default WorkflowCreate;
