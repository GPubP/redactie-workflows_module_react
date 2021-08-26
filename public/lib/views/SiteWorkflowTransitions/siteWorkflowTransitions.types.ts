export interface WorkflowTransitionsTableRow {
	uuid: string;
	from: string;
	to: {
		name: string;
		roles: string[];
	}[];
	navigate: (from: string) => void;
}
