import { MODULE_PATHS, SITES_ROOT, TENANT_ROOT } from '../../workflows.const';

export const WORKFLOW_CREATE_ALLOWED_PATHS = [
	`${TENANT_ROOT}/${SITES_ROOT}${MODULE_PATHS.site.workflowTransitions}`,
];
