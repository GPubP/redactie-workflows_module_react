import { Button, Icon } from '@acpaas-ui/react-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import classnames from 'classnames/bind';
import React from 'react';

import { rolesRightsConnector } from '../../connectors';

import styles from './workflowTransitions.module.scss';
import { WorkflowTransitionsTableRow } from './workflowTransitions.types';

const cx = classnames.bind(styles);

export const TRANSITION_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<WorkflowTransitionsTableRow>[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.updateWorkflow,
	]);

	return [
		{
			label: 'Van status',
			value: 'from',
			classList: [cx('a-table__cell--align-top')],
			disableSorting: true,
			width: '15%',
			component(value) {
				return (
					<div className="u-flex u-flex-column">
						<p>{value}</p>
					</div>
				);
			},
		},
		{
			label: '',
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
								{val.roles.join(', ')}
							</p>
						))}
					</div>
				);
			},
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value, { uuid, navigate }) {
				if (!canUpdate) {
					return;
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
