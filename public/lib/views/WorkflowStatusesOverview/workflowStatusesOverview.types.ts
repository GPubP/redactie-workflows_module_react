export interface WorkflowStatusesOverviewTableRow {
	workflowStatusUuid: string;
	label: string;
	description: string;
	navigate: (statusUuid: string) => void;
}
