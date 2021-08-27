import { useEffect, useState } from 'react';

import { WorkflowDetailModel, WorkflowDetailUIModel, workflowsFacade } from '../../store/workflows';

import { UseWorkflow } from './useWorkflow.types';

const useWorkflow: UseWorkflow = (workflowUuid, siteId) => {
	const [workflow, setWorkflow] = useState<WorkflowDetailModel>();
	const [workflowUI, setWorkflowUI] = useState<WorkflowDetailUIModel>();

	useEffect(() => {
		if (!workflowUuid) {
			return;
		}

		const hasWorkflow = workflowsFacade.hasWorkflow(workflowUuid);

		if (!hasWorkflow) {
			siteId
				? workflowsFacade.getSiteWorkflow(siteId, workflowUuid)
				: workflowsFacade.getWorkflow(workflowUuid);
		}

		const workflowSubscription = workflowsFacade
			.selectWorkflow(workflowUuid)
			.subscribe(setWorkflow);
		const workflowUISubscription = workflowsFacade
			.selectWorkflowUIState(workflowUuid)
			.subscribe(setWorkflowUI);

		return () => {
			workflowSubscription.unsubscribe();
			workflowUISubscription.unsubscribe();
		};
	}, [siteId, workflowUuid]);

	return [workflow, workflowUI];
};

export default useWorkflow;
