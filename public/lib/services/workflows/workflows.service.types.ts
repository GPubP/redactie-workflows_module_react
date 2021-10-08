import { EmbeddedResponse } from '@redactie/utils';

export enum TransitionRequirementTypes {
	'userHasRole' = 'userHasRole',
}

export interface WorkflowRequirement {
	type: TransitionRequirementTypes;
	value: unknown;
}

export interface WorkflowTransition {
	from: string;
	to: string;
	requirements: WorkflowRequirement[];
}

export interface WorkflowPopulatedTransitionTarget {
	uuid: string;
	data: {
		name: string;
		systemName: string;
		description: string;
		technicalState: string;
		category: string;
	};
	meta: {
		updatedAt: string;
		createdAt: string;
		deleted: boolean;
		removable: boolean;
		lastEditor: string;
		tenant: string;
		site: string;
	};
}

export interface WorkflowPopulatedTransition {
	from: WorkflowPopulatedTransitionTarget;
	to: WorkflowPopulatedTransitionTarget;
	requirements: WorkflowRequirement[];
}

export interface WorkflowData {
	name: string;
	description: string;
	category?: string;
	transitions: (WorkflowTransition | WorkflowPopulatedTransition)[];
}

export interface WorkflowMeta {
	removable?: boolean;
	site?: string;
	deleted?: boolean;
	default?: boolean;
	lastEditor?: string;
	tenant?: string;
	active?: boolean;
}

export interface Workflow {
	uuid?: string;
	data: WorkflowData;
	meta?: WorkflowMeta;
}
/**
 * =========================
 * Response types
 * - Define all response interfaces coming from the server
 * =========================
 */

export type WorkflowsResponse = EmbeddedResponse<Workflow> & {
	_embedded: {
		workflows: Workflow[];
	};
};
export type WorkflowDetailResponse = Workflow & {
	uuid: string;
	meta: WorkflowMeta;
};

/**
 * =========================
 * Payload types
 * - Define all payload interfaces
 * =========================
 */

export type CreateWorkflowPayload = {
	data: {
		name: string;
		description: string;
	};
};

export type DeleteWorkflowPayload = WorkflowDetailResponse;
export type UpdateWorkflowPayload = WorkflowDetailResponse;

export type ActivateWorkflowPayload = {
	uuid: string;
	name: string;
};
