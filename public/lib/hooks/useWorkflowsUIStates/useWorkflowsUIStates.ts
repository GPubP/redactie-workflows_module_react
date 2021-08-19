import { useObservable } from '@redactie/utils';
import { useEffect, useState } from 'react';

import { WorkflowDetailUIModel, workflowsFacade } from '../../store/workflows';

import { UseWorkflowsUIStates } from './useWorkflowsUIStates.types';

const useWorkflowsUIStates: UseWorkflowsUIStates = workflowUuid => {
	const workflowUIState = useObservable(workflowsFacade.UIState$, {
		isFetching: false,
		isCreating: false,
		error: null,
	});
	const [taxonomyDetailUIState, setTaxonomyDetailUIState] = useState<WorkflowDetailUIModel>();

	useEffect(() => {
		const s = workflowsFacade
			.selectWorkflowUIState(workflowUuid)
			.subscribe(setTaxonomyDetailUIState);

		return () => {
			s.unsubscribe();
		};
	}, [workflowUuid]);

	return [workflowUIState, taxonomyDetailUIState];
};

export default useWorkflowsUIStates;
