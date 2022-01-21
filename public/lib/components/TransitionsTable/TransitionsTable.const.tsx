import { Button, Icon } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';

import { rolesRightsConnector } from '../../connectors';

import { TransitionsTableRow } from './TransitionsTable.types';

export const TRANSITION_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[],
	readonly: boolean
): TableColumn<TransitionsTableRow>[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.updateWorkflow,
	]);

	return [
		{
			label: 'Van status',
			value: 'from',
			disableSorting: true,
			width: '15%',
		},
		{
			label: 'icon',
			hideLabel: true,
			disableSorting: true,
			width: '3%',
			component(value, { to }) {
				return (
					<div className="u-flex u-flex-column">
						{to.map((val, index) => (
							<p key={index} className={index !== 0 ? 'u-margin-top-xs' : ''}>
								<Icon name="angle-right" />
							</p>
						))}
					</div>
				);
			},
		},
		{
			label: 'Naar status',
			disableSorting: true,
			width: '25%',
			component(value, { to }) {
				return (
					<div className="u-flex u-flex-column">
						{to.map((val, index) => (
							<p key={index} className={index !== 0 ? 'u-margin-top-xs' : ''}>
								{val.name}
							</p>
						))}
					</div>
				);
			},
		},
		{
			label: 'Rol(len)',
			disableSorting: true,
			component(value, { to }) {
				return (
					<div className="u-flex u-flex-column">
						{to.map((val, index) => (
							<p key={index} className={index !== 0 ? 'u-margin-top-xs' : ''}>
							<EllipsisWithTooltip >
							{val.roles.join(', ')}
							</EllipsisWithTooltip>
						</p>
						))}
					</div>
				);
			},
		},
		{
			label: 'Button',
			hideLabel: true,
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value, { uuid, navigate }) {
				if (!canUpdate || readonly) {
					// Needed tot keep consistent spacing with buttons
					return <div className="u-margin-top-lg" />;
				}

				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(uuid)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
