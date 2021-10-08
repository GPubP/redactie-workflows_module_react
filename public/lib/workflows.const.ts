import { ContextHeaderBadge, ContextHeaderTab } from '@redactie/utils';

export const SITE_PARAM = 'siteId';
export const SITES_ROOT = 'sites';

export const TENANT_ROOT = '/:tenantId';
export const SITE_ROOT = `/:${SITE_PARAM}`;
const WORKFLOWS_BASE_PATH = '/workflows';
const WORKFLOW_DETAIL_BASE_PATH = '/workflows/:workflowUuid';
const WORKFLOW_STATUSES_BASE_PATH = '/workflow-statussen';

export const MODULE_PATHS = {
	// TENANT
	dashboard: '/dashboard',
	workflowRoot: WORKFLOWS_BASE_PATH,
	workflowStatusesRoot: WORKFLOW_STATUSES_BASE_PATH,

	// WORKFLOWS
	workflowsOverview: `${WORKFLOWS_BASE_PATH}/overzicht`,

	workflowEdit: `${WORKFLOW_DETAIL_BASE_PATH}/bewerken`,
	workflowCreate: `${WORKFLOWS_BASE_PATH}/aanmaken`,
	workflowCreateSettings: `${WORKFLOWS_BASE_PATH}/aanmaken/instellingen`,

	workflowSettings: `${WORKFLOW_DETAIL_BASE_PATH}/bewerken/instellingen`,
	workflowTransitions: `${WORKFLOW_DETAIL_BASE_PATH}/bewerken/transities`,
	workflowTransitionDetail: `${WORKFLOW_DETAIL_BASE_PATH}/bewerken/transities/:workflowStatusUuid`,

	// WORKFLOW STATUSES
	workflowStatusesOverview: `${WORKFLOW_STATUSES_BASE_PATH}/overzicht`,

	workflowStatusEdit: `${WORKFLOW_STATUSES_BASE_PATH}/:workflowStatusUuid/bewerken`,
	workflowStatusCreate: `${WORKFLOW_STATUSES_BASE_PATH}/aanmaken`,

	// SITE
	site: {
		dashboard: `${SITE_ROOT}/content`,
		workflowRoot: `${SITE_ROOT}${WORKFLOWS_BASE_PATH}`,
		workflowsOverview: `${SITE_ROOT}${WORKFLOWS_BASE_PATH}/overzicht`,
		workflowEdit: `${SITE_ROOT}${WORKFLOWS_BASE_PATH}/:workflowUuid/bewerken`,
		workflowCreate: `${SITE_ROOT}${WORKFLOWS_BASE_PATH}/aanmaken`,
		workflowCreateSettings: `${SITE_ROOT}${WORKFLOWS_BASE_PATH}/aanmaken/instellingen`,
		workflowSettings: `${SITE_ROOT}${WORKFLOW_DETAIL_BASE_PATH}/bewerken/instellingen`,
		workflowTransitions: `${SITE_ROOT}${WORKFLOW_DETAIL_BASE_PATH}/bewerken/transities`,
		workflowTransitionDetail: `${SITE_ROOT}${WORKFLOW_DETAIL_BASE_PATH}/bewerken/transities/:workflowStatusUuid`,
		contentTypeWorkflow: `${SITE_ROOT}/content-types/:contentTypeId/workflow`,
	},
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		`${TENANT_ROOT}`,
		`${TENANT_ROOT}/sites`,
		`${TENANT_ROOT}${WORKFLOW_STATUSES_BASE_PATH}/:workflowStatusUuid([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})`,
		`${TENANT_ROOT}${WORKFLOW_DETAIL_BASE_PATH}([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})`,
		`${TENANT_ROOT}/${SITES_ROOT}${SITE_ROOT}([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})${WORKFLOW_DETAIL_BASE_PATH}([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})`,
	],
};

export const DEFAULT_WORKFLOW_STATUS_DETAIL_HEADER_BADGES: ContextHeaderBadge[] = [
	{
		name: 'Status',
		type: 'primary',
	},
];

export const DETAIL_TAB_MAP: Record<string, ContextHeaderTab> = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: true,
		disabled: false,
	},
	transitions: {
		name: 'Transities',
		target: 'transities',
		active: false,
		disabled: false,
	},
};

export const DETAIL_TABS: ContextHeaderTab[] = [
	DETAIL_TAB_MAP.settings,
	DETAIL_TAB_MAP.transitions,
];

export const CONFIG: Readonly<{ name: string; module: string }> = {
	name: 'workflow',
	module: 'workflows-module',
};
