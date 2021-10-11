import { sortAlphabetically } from '..';
import { TransitionSelectFormState } from '../../components';
import { WorkflowStatus } from '../../services/workflowStatuses';

export const mapStatuses = (
	data: WorkflowStatus[],
	filteredTransitions: TransitionSelectFormState,
	workflowStatusUuid: string,
	transitionName: string
): TransitionSelectFormState => {
	return sortAlphabetically(data, ['data', 'name']).reduce(
		(acc: TransitionSelectFormState, status: WorkflowStatus) => {
			if (status.data.systemName === 'nieuw') {
				return acc;
			}

			if (filteredTransitions[status.uuid as string]) {
				return {
					...acc,
					[status.uuid as string]: filteredTransitions[status.uuid as string],
				};
			}

			return {
				...acc,
				[status.uuid as string]: {
					name: `${status.uuid}.roles`,
					from: {
						uuid: workflowStatusUuid,
						name: transitionName as string,
					},
					to: {
						uuid: status.uuid as string,
						name: status.data.name,
					},
					roles: [],
				},
			};
		},
		{}
	);
};
