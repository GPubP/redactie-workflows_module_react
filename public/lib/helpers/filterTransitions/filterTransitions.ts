import { TransitionSelectFormState } from '../../components';
import { TransitionRequirementTypes, WorkflowPopulatedTransition } from '../../services/workflows';

export const filterTransitions = (
	transitions: WorkflowPopulatedTransition[],
	workflowStatusUuid: string
): TransitionSelectFormState => {
	return transitions.reduce(
		(
			acc: TransitionSelectFormState,
			transition: WorkflowPopulatedTransition,
			index: number
		) => {
			if (transition.from.uuid === workflowStatusUuid) {
				acc[transition.to.uuid] = {
					index,
					name: `${transition.to.uuid}.roles`,
					from: {
						uuid: transition.from.uuid,
						name: transition.from.data.name,
					},
					to: {
						uuid: transition.to.uuid,
						name: transition.to.data.name,
					},
					roles: transition.requirements.find(
						requirement => requirement.type === TransitionRequirementTypes.userHasRole
					)?.value as string[],
				};
			}
			return acc;
		},
		{}
	);
};
