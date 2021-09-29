import Core from '@redactie/redactie-core';

import { WorkflowsModuleAPI } from '../workflows.types';

import { hooks } from './hooks';
import { store } from './store';

export const registerWorkflowsAPI = (): void => {
	const api: WorkflowsModuleAPI = {
		store,
		hooks,
	};
	Core.modules.exposeModuleApi('workflows-module', api);
};
