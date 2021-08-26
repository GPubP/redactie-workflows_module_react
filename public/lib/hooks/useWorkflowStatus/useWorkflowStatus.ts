import { useEffect, useState } from 'react';

import {
	WorkflowStatusDetailModel,
	WorkflowStatusDetailUIModel,
	workflowStatusesFacade,
} from '../../store/workflowStatuses';

import { UseWorkflowStatus } from './useWorkflowStatus.types';

const useWorkflowStatus: UseWorkflowStatus = (workflowStatusUuid: string) => {
	const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatusDetailModel>();
	const [workflowStatusUI, setWorkflowStatusUI] = useState<WorkflowStatusDetailUIModel>();

	useEffect(() => {
		if (!workflowStatusUuid) {
			return;
		}

		const hasTaxonomy = workflowStatusesFacade.hasWorkflowStatus(workflowStatusUuid);

		if (!hasTaxonomy) {
			workflowStatusesFacade.getWorkflowStatus(workflowStatusUuid);
		}

		const workflowStatusSubscription = workflowStatusesFacade
			.selectWorkflowStatus(workflowStatusUuid)
			.subscribe(setWorkflowStatus);
		const workflowStatusUISubscription = workflowStatusesFacade
			.selectWorkflowStatusUIState(workflowStatusUuid)
			.subscribe(setWorkflowStatusUI);

		return () => {
			workflowStatusSubscription.unsubscribe();
			workflowStatusUISubscription.unsubscribe();
		};
	}, [workflowStatusUuid]);

	return [workflowStatus, workflowStatusUI];
};

export default useWorkflowStatus;
