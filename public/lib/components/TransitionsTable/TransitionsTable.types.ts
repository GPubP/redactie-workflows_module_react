import { WorkflowStatus } from '../../services/workflowStatuses';
import { WorkflowDetailResponse } from '../../services/workflows';

export interface TransitionsTableRow {
	uuid: string;
	from: string;
	to: {
		name: string;
		roles: string[];
	}[];
	navigate: (from: string) => void;
}

export interface TransitionsTableProps {
	statuses: WorkflowStatus[];
	workflow: WorkflowDetailResponse | undefined;
	mySecurityrights: string[];
	roles: any[]; // TODO: export RolesResponse type
	readonly: boolean;
	loading: boolean;
	noDataMessage?: string;
	siteId?: string;
}
