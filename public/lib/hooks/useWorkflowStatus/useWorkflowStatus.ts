import { useObservable } from '@redactie/utils';
import { useEffect, useMemo } from 'react';

import { workflowStatusesFacade } from '../../store/workflowStatuses';

import { UseWorkflowStatus } from './useWorkflowStatus.types';

const useWorkflowStatus: UseWorkflowStatus = (
	workflowStatusUuid: string,
	includeOccurrences = false
) => {
	const workflowStatus$ = useMemo(
		() => workflowStatusesFacade.selectWorkflowStatus(workflowStatusUuid),
		[workflowStatusUuid]
	);
	const workflowStatusUI$ = useMemo(
		() => workflowStatusesFacade.selectWorkflowStatusUIState(workflowStatusUuid),
		[workflowStatusUuid]
	);
	const workflowStatusOccurrences$ = useMemo(
		() => workflowStatusesFacade.selectWorkflowStatusOccurrences(workflowStatusUuid),
		[workflowStatusUuid]
	);
	const workflowStatusOccurrencesUI$ = useMemo(
		() => workflowStatusesFacade.selectWorkflowStatusOccurrencesUIState(workflowStatusUuid),
		[workflowStatusUuid]
	);

	const workflowStatus = useObservable(workflowStatus$);
	const workflowStatusUI = useObservable(workflowStatusUI$);
	const workflowStatusOccurrences = useObservable(workflowStatusOccurrences$);
	const workflowStatusOccurrencesUI = useObservable(workflowStatusOccurrencesUI$);

	useEffect(() => {
		if (!workflowStatusUuid) {
			return;
		}

		const hasWorkflowStatus = workflowStatusesFacade.hasWorkflowStatus(workflowStatusUuid);

		if (!hasWorkflowStatus) {
			workflowStatusesFacade.getWorkflowStatus(workflowStatusUuid);

			includeOccurrences &&
				workflowStatusesFacade.getWorkflowStatusOccurrences(workflowStatusUuid);
		}
	}, [includeOccurrences, workflowStatusUuid]);

	return [
		workflowStatus,
		workflowStatusUI,
		workflowStatusOccurrences,
		workflowStatusOccurrencesUI,
	];
};

export default useWorkflowStatus;
