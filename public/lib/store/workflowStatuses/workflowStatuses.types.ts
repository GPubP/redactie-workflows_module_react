import { WorkflowStatusDetailModel } from './detail';

export interface GetWorkflowStatusesPaginatedPayloadOptions {
	clearCache?: boolean;
	alertContainerId?: string;
}

export type DeleteWorkflowStatusPayload = WorkflowStatusDetailModel;
export type UpdateWorkflowStatusPayload = WorkflowStatusDetailModel;
