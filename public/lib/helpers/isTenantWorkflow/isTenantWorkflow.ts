import { Workflow } from '../../services/workflows';

export const isTenantWorfklow = (workflow?: Workflow): boolean =>
	!workflow?.meta?.site || workflow.meta.site === 'ALL';
