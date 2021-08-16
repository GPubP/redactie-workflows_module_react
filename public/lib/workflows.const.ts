export const SITE_PARAM = 'siteId';
export const SITES_ROOT = 'sites';

export const TENANT_ROOT = '/:tenantId';
const SITE_ROOT = `/:${SITE_PARAM}`;
const WORKFLOWS_BASE_PATH = '/workflows';
const WORKFLOW_STATUSES_BASE_PATH = '/workflow-statussen';

export const MODULE_PATHS = {
	// TENANT
	workflowRoot: WORKFLOWS_BASE_PATH,
	workflowStatusesRoot: WORKFLOW_STATUSES_BASE_PATH,

	// WORKFLOWS
	workflowsOverview: `${WORKFLOWS_BASE_PATH}/overzicht`,

	workflowEdit: `${WORKFLOWS_BASE_PATH}/:workflowUuid/bewerken`,
	workflowCreate: `${WORKFLOWS_BASE_PATH}/aanmaken`,

	// WORKFLOW STATUSES
	workflowStatusesOverview: `${WORKFLOW_STATUSES_BASE_PATH}/overzicht`,

	workflowStatusEdit: `${WORKFLOW_STATUSES_BASE_PATH}/:workflowStatusUuid/bewerken`,
	workflowStatusCreate: `${WORKFLOW_STATUSES_BASE_PATH}/aanmaken`,

	// SITE
	site: {
		workflowRoot: `${SITE_ROOT}/${WORKFLOWS_BASE_PATH}`,
		workflowOverview: `${SITE_ROOT}/${WORKFLOWS_BASE_PATH}/overzicht`,
		workflowEdit: `${SITE_ROOT}/${WORKFLOWS_BASE_PATH}/:workflowUuid/bewerken`,
		workflowCreate: `${SITE_ROOT}/${WORKFLOWS_BASE_PATH}/aanmaken`,
	},
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', `${TENANT_ROOT}`, `${TENANT_ROOT}/sites`],
};
