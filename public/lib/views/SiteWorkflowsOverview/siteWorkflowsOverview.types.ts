export interface WorkflowsOverviewTableRow {
	workflowUuid: string;
	detailPath: string;
	name: string;
	description: string;
	active: boolean;
	isDefault: boolean;
	isTenant: boolean;
	navigate: (statusUuid: string) => void;
}
