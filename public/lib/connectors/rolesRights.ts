import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		createWorkflows: 'workflows_create',
		updateWorkflows: 'workflows_update',
		readWorkflows: 'workflows_read',
		deleteWorkflows: 'workflows_delete',
		createWorkflowStatuses: 'workflow-statuses_create',
		updateWorkflowStatuses: 'workflow-statuses_update',
		readWorkflowStatuses: 'workflow-statuses_read',
		deleteWorkflowStatuses: 'workflow-statuses_delete',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
