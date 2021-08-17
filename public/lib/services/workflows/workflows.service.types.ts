import { EmbeddedResponse } from '@redactie/utils';

export interface Workflow {
	id: number;
}
/**
 * =========================
 * Response types
 * - Define all response interfaces coming from the server
 * =========================
 */

export type WorkflowsResponse = EmbeddedResponse<Workflow>;
export type WorkflowDetailResponse = Workflow;

/**
 * =========================
 * Payload types
 * - Define all payload interfaces
 * =========================
 */
