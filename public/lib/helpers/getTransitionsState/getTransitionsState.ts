import { isEmpty } from 'ramda';

import { TransitionSelectFormState } from '../../components';
import {
	TransitionRequirementTypes,
	WorkflowPopulatedTransition,
	WorkflowRequirement,
	WorkflowTransition,
} from '../../services/workflows';

export const getTransitionsState = (
	fromUuid: string,
	values: TransitionSelectFormState,
	transitionsState: (WorkflowPopulatedTransition | WorkflowTransition)[]
): WorkflowTransition[] => {
	const otherTransitions = transitionsState.filter(
		transition => (transition as WorkflowPopulatedTransition).from.uuid !== fromUuid
	);

	return Object.values(values).reduce((acc, transition) => {
		// No roles checked so transition is not defined
		if (isEmpty(transition.roles)) {
			return acc;
		}

		let requirements: WorkflowRequirement[] = [];
		const rolesRequirementIndex =
			transition.index && Number(transition.index)
				? requirements.findIndex(
						requirement => requirement.type === TransitionRequirementTypes.userHasRole
				  )
				: -1;

		if (rolesRequirementIndex > -1) {
			requirements[rolesRequirementIndex] = {
				value: transition.roles,
				type: TransitionRequirementTypes.userHasRole,
			};
		} else {
			requirements = [
				...requirements,
				{
					value: transition.roles,
					type: TransitionRequirementTypes.userHasRole,
				},
			];
		}

		return [
			...acc,
			{
				requirements,
				from: transition.from.uuid,
				to: transition.to.uuid,
			},
		];
	}, otherTransitions as WorkflowTransition[]);
};
