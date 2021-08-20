import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		createWorkflow: 'workflow_create',
		updateWorkflow: 'workflow_update',
		readWorkflow: 'workflow_read',
		deleteWorkflow: 'workflow_delete',
		createWorkflowStatus: 'workflow-status_create',
		updateWorkflowStatus: 'workflow-status_update',
		readWorkflowStatus: 'workflow-status_read',
		deleteWorkflowStatus: 'workflow-status_delete',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
