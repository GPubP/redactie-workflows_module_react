import { Table } from '@acpaas-ui/react-editorial-components';
import { useNavigate } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { isTenantWorfklow } from '../../helpers';
import { TransitionRequirementTypes, WorkflowPopulatedTransition } from '../../services/workflows';
import { MODULE_PATHS, SITES_ROOT } from '../../workflows.const';

import { TRANSITION_COLUMNS } from './TransitionsTable.const';
import { TransitionsTableProps, TransitionsTableRow } from './TransitionsTable.types';

const TransitionsTable: FC<TransitionsTableProps> = ({
	statuses,
	workflow,
	mySecurityrights,
	roles,
	siteId,
	readonly,
	loading,
	noDataMessage,
}): ReactElement => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const isTenant = isTenantWorfklow(workflow);
	const { navigate } = useNavigate(SITES_ROOT);
	const [statusRows, setStatusRows] = useState<TransitionsTableRow[]>([]);

	useEffect(() => {
		if (!statuses || !workflow || !roles) {
			return;
		}

		const groupedTransitions = (workflow.data
			.transitions as WorkflowPopulatedTransition[]).reduce(
			(
				acc: {
					[fromId: string]: TransitionsTableRow;
				},
				transition: WorkflowPopulatedTransition
			) => {
				const roleIds =
					(transition.requirements.find(
						requirement => requirement.type === TransitionRequirementTypes.userHasRole
					)?.value as string[]) || [];

				const roleNames = isTenant
					? roleIds
					: (roles || [])?.reduce((acc: string[], role) => {
							if (!roleIds.includes(role.id)) {
								return acc;
							}

							return [...acc, role.attributes.displayName];
					  }, []);

				if (!acc[transition.from.uuid]) {
					acc[transition.from.uuid] = {
						uuid: transition.from.uuid,
						from: transition.from.data.name,
						to: [
							{
								name: transition.to.data.name,
								roles: roleNames,
							},
						],
						navigate: (uuid: string) =>
							navigate(MODULE_PATHS.site.workflowTransitionDetail, {
								workflowStatusUuid: uuid,
								workflowUuid: workflow.uuid,
								siteId,
							}),
					};

					return acc;
				}

				acc[transition.from.uuid].to = [
					...acc[transition.from.uuid].to,
					{
						name: transition.to.data.name,
						roles: roleNames,
					},
				];
				return acc;
			},
			{}
		);

		const mapStatuses: TransitionsTableRow[] = statuses.map(status => {
			if (groupedTransitions[status.uuid as string]) {
				return groupedTransitions[status.uuid as string];
			}

			return {
				uuid: status.uuid as string,
				from: status.data.name,
				to: [],
				navigate: (uuid: string) =>
					navigate(MODULE_PATHS.site.workflowTransitionDetail, {
						workflowStatusUuid: uuid,
						workflowUuid: workflow.uuid,
						siteId,
					}),
			};
		});

		setStatusRows(mapStatuses);
	}, [statuses, workflow, roles]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Table
			fixed
			className="u-margin-top"
			tableClassName="a-table--fixed--sm"
			columns={TRANSITION_COLUMNS(t, mySecurityrights, isTenant || readonly)}
			rows={statusRows}
			noDataMessage={noDataMessage || t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
			loading={loading}
		/>
	);
};

export default TransitionsTable;
