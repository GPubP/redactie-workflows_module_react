import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip, Status } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors';

import { WorkflowsOverviewTableRow } from './workflowsOverview.types';

export const DEFAULT_FILTER_FORM = {
	search: '',
};

export const DEFAULT_OVERVIEW_QUERY_PARAMS = {
	search: {
		defaultValue: '',
		type: 'string',
	},
} as const;

export const OVERVIEW_COLUMNS = (t: TranslateFunc): TableColumn<WorkflowsOverviewTableRow>[] => {
	return [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'name',
			width: '20%',
			component(value: any, { workflowUuid, description, isDefault }) {
				return (
					<>
						<AUILink to={`${workflowUuid}/instellingen`} component={Link}>
							<EllipsisWithTooltip>
								{value} {!isDefault ? '(standaard)' : ''}
							</EllipsisWithTooltip>
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
			label: t(CORE_TRANSLATIONS.TABLE_STATUS),
			value: 'active',
			width: '15%',
			disableSorting: true,
			component(active: boolean) {
				return (
					<>
						{active ? (
							<Status label={t(CORE_TRANSLATIONS.STATUS_ACTIVE)} type={'ACTIVE'} />
						) : (
							<Status
								label={t(CORE_TRANSLATIONS['STATUS_NON-ACTIVE'])}
								type={'INACTIVE'}
							/>
						)}
					</>
				);
			},
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value, { workflowUuid, navigate }) {
				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(workflowUuid)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
