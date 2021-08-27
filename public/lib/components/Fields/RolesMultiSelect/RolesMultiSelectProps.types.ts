import { SelectOption } from '@redactie/utils';

export interface RolesMultiSelectProps {
	name: string;
	options?: SelectOption[];
	values?: string[];
	onChange?: () => void;
}
