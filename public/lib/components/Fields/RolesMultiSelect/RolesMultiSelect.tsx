import { Checkbox, Flyout } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import { Field, FieldArray } from 'formik';
import React, { ChangeEvent } from 'react';

import styles from './RolesMultiSelect.module.scss';
import { RolesMultiSelectProps } from './RolesMultiSelectProps.types';

const cx = classnames.bind(styles);

const RolesMultiSelect: React.FC<RolesMultiSelectProps> = ({ name, options = [], values = [] }) => {
	const renderPlaceholder = (): string => {
		if (values.length) {
			return `${values.length} rol${values.length !== 1 ? 'len' : ''} geselecteerd`;
		}
		return 'Selecteer een rol';
	};

	return (
		<Flyout
			trigger={
				<div className={cx('roles-multiselect__trigger')}>
					<p>{renderPlaceholder()}</p>
					<span className="fa fa-angle-down" />
				</div>
			}
		>
			<FieldArray
				name={name}
				render={arrayHelpers => (
					<>
						{options.map(option => (
							<div
								className={cx('roles-multiselect__option', 'a-input')}
								key={`${name}-${option.value}`}
							>
								<Field
									as={Checkbox}
									checked={values.includes(option.value)}
									id={`${name}-${option.value}`}
									name={`${name}-${option.value}`}
									label={option.label}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										if (e.target.checked) {
											arrayHelpers.unshift(option.value);
										} else {
											const idx = values.indexOf(option.value);
											arrayHelpers.remove(idx);
										}
									}}
								/>
							</div>
						))}
					</>
				)}
			/>
		</Flyout>
	);
};

export default RolesMultiSelect;
