import { isEmpty } from 'ramda';

import { TransitionSelectFormState } from '../../components';
import {
	TransitionRequirementTypes,
	WorkflowPopulatedTransition,
	WorkflowTransition,
} from '../../services/workflows';

export const getTransitionsState = (
	values: TransitionSelectFormState,
	transitionsState: (WorkflowPopulatedTransition | WorkflowTransition)[]
): WorkflowTransition[] => {
	let state = [...transitionsState];
	let indexesToRemove: number[] = [];

	for (const transition of Object.values(values)) {
		if (isEmpty(transition.roles)) {
			indexesToRemove = [
				...indexesToRemove,
				...('index' in transition ? [transition?.index as number] : []),
			];
			continue;
		}

		if (transition.index && Number(transition.index)) {
			let requirements = [...state[transition.index].requirements];

			const rolesRequirementIndex = requirements.findIndex(
				requirement => requirement.type === TransitionRequirementTypes.userHasRole
			);

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

			state[transition.index] = {
				from: (state[transition.index] as WorkflowPopulatedTransition).from.uuid,
				to: (state[transition.index] as WorkflowPopulatedTransition).to.uuid,
				requirements,
			};
			continue;
		}

		state = [
			...state,
			{
				from: transition.from.uuid,
				to: transition.to.uuid,
				requirements: [
					{
						type: TransitionRequirementTypes.userHasRole,
						value: transition.roles,
					},
				],
			},
		];
	}

	return (state as WorkflowTransition[]).filter((value, index) => {
		return indexesToRemove.indexOf(index) === -1;
	});
};
