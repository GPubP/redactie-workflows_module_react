import Core from '@redactie/redactie-core';
import { MySecurityRightModel, RolesRightsModuleAPI } from '@redactie/roles-rights-module';
import { take } from 'rxjs/operators';

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
		assignWorkflow: 'workflow_assign',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}

	public get hooks(): RolesRightsModuleAPI['hooks'] {
		return this.api.hooks;
	}

	public get facade(): RolesRightsModuleAPI['store']['roles']['service'] {
		return this.api.store.roles.service;
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
