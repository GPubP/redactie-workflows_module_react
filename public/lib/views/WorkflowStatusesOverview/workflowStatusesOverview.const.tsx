import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS, rolesRightsConnector } from '../../connectors';

import { WorkflowStatusesOverviewTableRow } from './workflowStatusesOverview.types';

export const DEFAULT_FILTER_FORM = {
	search: '',
};

export const DEFAULT_OVERVIEW_QUERY_PARAMS = {
	search: {
		defaultValue: '',
		type: 'string',
	},
} as const;

export const OVERVIEW_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<WorkflowStatusesOverviewTableRow>[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.updateWorkflowStatus,
	]);

	return [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'name',
			width: '50%',
			component(value: any, { workflowStatusUuid, description, removable }) {
				return (
					<>
						{canUpdate && removable ? (
							<AUILink to={`${workflowStatusUuid}/bewerken`} component={Link}>
								<EllipsisWithTooltip>
									{value} {!removable ? '(standaard)' : ''}
								</EllipsisWithTooltip>
							</AUILink>
						) : (
							<p>
								{value} {!removable ? '(standaard)' : ''}
							</p>
						)}
						<p className="small">
							{description ? (
								<EllipsisWithTooltip>{description}</EllipsisWithTooltip>
							) : (
								<span className="u-text-italic">
									{t(CORE_TRANSLATIONS['TABLE_NO-DESCRIPTION'])}
								</span>
							)}
						</p>
					</>
				);
			},
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value, { workflowStatusUuid, navigate, removable }) {
				if (!canUpdate || !removable) {
					return;
				}

				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(workflowStatusUuid)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
