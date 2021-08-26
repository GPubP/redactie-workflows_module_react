export interface WorkflowsOverviewTableRow {
	workflowUuid: string;
	detailPath: string;
	name: string;
	description: string;
	active: boolean;
	isDefault: boolean;
	navigate: (statusUuid: string) => void;
}
