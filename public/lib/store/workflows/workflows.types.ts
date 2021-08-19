export interface GetWorkflowsPaginatedPayloadOptions {
	clearCache?: boolean;
	alertContainerId?: string;
}

export interface GetWorkflowPayloadOptions {
	force?: boolean;
	alertContainerId?: string;
}

export interface CreateWorkflowsPayloadOptions {
	successAlertContainerId: string;
	errorAlertContainerId: string;
}

export type DeleteWorkflowsPayloadOptions = CreateWorkflowsPayloadOptions;
