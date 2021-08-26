export interface WorkflowStatusesOverviewTableRow {
	workflowStatusUuid: string;
	name: string;
	description: string;
	removable: boolean;
	navigate: (statusUuid: string) => void;
}
