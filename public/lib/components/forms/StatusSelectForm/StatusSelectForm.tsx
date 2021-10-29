import { Icon, Select } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { STATUS_SELECT_FORM_VALIDATION_SCHEMA } from './StatusSelectForm.const';
import styles from './StatusSelectForm.module.scss';
import {
	StatusSelectFormItem,
	StatusSelectFormProps,
	StatusSelectFormState,
} from './StatusSelectForm.types';

const cx = classnames.bind(styles);

const StatusSelectForm: FC<StatusSelectFormProps> = ({
	initialState,
	from,
	to,
	statuses,
	onChange = () => null,
}) => {
	const renderStatuses = (
		status: StatusSelectFormItem,
		index: number,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
	): ReactElement => {
		return (
			<React.Fragment key={index}>
				<p className={cx('status-select-form__from-status')}>{status.from.name}</p>
				<Icon name="angle-right" className={cx('status-select-form__arrow')} />
				{status.invalidFrom ? (
					<Field
						as={Select}
						id={`statuses[${index}].to.uuid`}
						name={`statuses[${index}].to.uuid`}
						placeholder="Selecteer een nieuwe status"
						options={statuses}
						onChange={(e: any): void => {
							const statusUuid = e.target.value;
							const currentState = initialState.statuses[index];

							setFieldValue(`statuses[${index}]`, {
								...currentState,
								to: {
									name: statuses.find(status => status.value === statusUuid)
										?.label,
									uuid: statusUuid,
								},
							});
						}}
					/>
				) : (
					<p className={cx('status-select-form__to-status')}>{status.to.name}</p>
				)}
			</React.Fragment>
		);
	};

	return (
		<Formik
			initialValues={initialState}
			onSubmit={() => undefined}
			validationSchema={STATUS_SELECT_FORM_VALIDATION_SCHEMA}
		>
			{({ values, setFieldValue, validateForm }) => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => {
								validateForm(values).then(res => {
									onChange(
										values as StatusSelectFormState,
										res.statuses
											? !(res.statuses as any).find((err: any) => err)
											: true
									);
								});
							}}
						/>
						<div
							className={cx(
								'status-select-form',
								'col-xs-12',
								'col-lg-8',
								'u-margin-top'
							)}
						>
							<p className={cx('status-select-form__from-title', 'u-text-bold')}>
								{from}
							</p>
							<p className={cx('status-select-form__to-title', 'u-text-bold')}>
								{to}
							</p>
							{values.statuses.map((value, index) =>
								renderStatuses(value, index, setFieldValue)
							)}
						</div>
					</>
				);
			}}
		</Formik>
	);
};

export default StatusSelectForm;
