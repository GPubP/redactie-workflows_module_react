export interface WorkflowsOverviewTableRow {
	workflowUuid: string;
	name: string;
	description: string;
	active: boolean;
	isDefault: boolean;
	navigate: (statusUuid: string) => void;
}
