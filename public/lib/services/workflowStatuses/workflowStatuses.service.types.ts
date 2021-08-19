import { EmbeddedResponse } from '@redactie/utils';

export interface WorkflowStatusData {
	name: string;
	description: string;
	systemName?: string;
	technicalState?: string;
	category?: string;
}

export interface WorkflowStatusMeta {
	removable?: boolean;
	site?: string;
}

export interface WorkflowStatus {
	uuid?: string;
	data: WorkflowStatusData;
	meta?: WorkflowStatusMeta;
}
/**
 * =========================
 * Response types
 * - Define all response interfaces coming from the server
 * =========================
 */

export type WorkflowStatusesResponse = EmbeddedResponse<WorkflowStatus> & {
	_embedded: {
		statuses: WorkflowStatus[];
	};
};
export type WorkflowStatusDetailResponse = WorkflowStatus;

/**
 * =========================
 * Payload types
 * - Define all payload interfaces
 * =========================
 */
