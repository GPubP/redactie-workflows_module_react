import { Icon } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { DefaultFormActions } from '../..';
import { RolesMultiSelect } from '../../Fields';

import { TRANSITION_SELECT_FORM_VALIDATION_SCHEMA } from './TransitionSelectForm.const';
import styles from './TransitionSelectForm.module.scss';
import {
	TransitionSelect,
	TransitionSelectFormProps,
	TransitionSelectFormState,
} from './TransitionSelectForm.types';

const cx = classnames.bind(styles);

const TransitionSelectForm: FC<TransitionSelectFormProps> = ({
	initialState,
	roles,
	isLoading = false,
	hasChanges = false,
	onCancel = () => null,
	onSubmit = () => null,
	onChange = () => null,
}) => {
	const renderSelect = (transition: TransitionSelect): ReactElement => {
		return (
			<>
				<p className={cx('transition-select-form__from-status')}>{transition.from.name}</p>
				<Icon name="angle-right" className={cx('transition-select-form__arrow')} />
				<p className={cx('transition-select-form__to-status')}>{transition.to.name}</p>
				<RolesMultiSelect
					name={transition.name}
					values={transition.roles}
					options={roles}
				/>
			</>
		);
	};

	return (
		<Formik
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={TRANSITION_SELECT_FORM_VALIDATION_SCHEMA}
		>
			{({ values }) => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as TransitionSelectFormState)}
						/>
						<div className={cx('transition-select-form', 'col-xs-12', 'col-lg-8')}>
							<p className={cx('transition-select-form__from-title', 'u-text-bold')}>
								Van status
							</p>
							<p className={cx('transition-select-form__to-title', 'u-text-bold')}>
								Naar status
							</p>
							{Object.values(values).map(value => renderSelect(value))}
						</div>
						<DefaultFormActions
							isLoading={isLoading}
							hasChanges={hasChanges}
							onCancel={onCancel}
						/>
					</>
				);
			}}
		</Formik>
	);
};

export default TransitionSelectForm;
