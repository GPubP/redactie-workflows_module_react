import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS, rolesRightsConnector } from '../../connectors';
import { DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS } from '../../services/workflowStatuses';

import { WorkflowStatusesOverviewTableRow } from './workflowStatusesOverview.types';

export const WORKFLOW_STATUSES_OVERVIEW_INITIAL_FILTER_STATE = {
	name: '',
};

export const OVERVIEW_QUERY_PARAMS_CONFIG = {
	page: { defaultValue: DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS.page, type: 'number' },
	pagesize: { defaultValue: DEFAULT_WORKFLOW_STATUSES_SEARCH_PARAMS.limit, type: 'number' },
	search: { type: 'array' },
	sort: { defaultValue: 'meta.label', type: 'string' },
	direction: { defaultValue: 1, type: 'number' },
} as const;

export const OVERVIEW_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<WorkflowStatusesOverviewTableRow>[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		// rolesRightsConnector.securityRights.update,
	]);

	return [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'label',
			width: '50%',
			component(value: any, { workflowStatusUuid, description }) {
				return (
					<>
						<AUILink to={`${workflowStatusUuid}/bewerken`} component={Link}>
							<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
						</AUILink>
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
			component(value, { workflowStatusUuid, navigate }) {
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
