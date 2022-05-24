import Core from '@redactie/redactie-core';

import * as API from './api';

export const registerWorkflowsAPI = (): void => {
	Core.modules.exposeModuleApi('workflows-module', API);
};
