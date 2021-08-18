import { EmbeddedResponse } from '@redactie/utils';

export interface WorkflowStatusData {
	name: string;
	systemName: string;
	description: string;
}

export interface WorkflowStatus {
	uuid: string;
	data: WorkflowStatusData;
}
/**
 * =========================
 * Response types
 * - Define all response interfaces coming from the server
 * =========================
 */

export type WorkflowStatusesResponse = EmbeddedResponse<WorkflowStatus>;
export type WorkflowStatusDetailResponse = WorkflowStatus;

/**
 * =========================
 * Payload types
 * - Define all payload interfaces
 * =========================
 */
