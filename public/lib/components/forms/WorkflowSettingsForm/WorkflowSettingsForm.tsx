import { Textarea, TextField } from '@acpaas-ui/react-components';
import { ErrorMessage, FormikChildrenFn } from '@redactie/utils';
import { Field, Formik, isFunction } from 'formik';
import React, { FC } from 'react';

import { WorkflowDetailModel } from '../../../store/workflows';

import { WORKFLOW_SETTINGS_VALIDATION_SCHEMA } from './WorkflowSettingsForm.const';
import { WorkflowSettingFormProps } from './WorkflowSettingsForm.types';

const WorkflowSettingsForm: FC<WorkflowSettingFormProps> = ({
	children,
	formikRef,
	workflow,
	onSubmit,
}) => {
	return (
		<Formik
			enableReinitialize
			innerRef={instance => isFunction(formikRef) && formikRef(instance as any)}
			initialValues={workflow}
			onSubmit={onSubmit}
			validationSchema={WORKFLOW_SETTINGS_VALIDATION_SCHEMA}
		>
			{formikProps => {
				const { errors } = formikProps;

				return (
					<>
						<div className="row u-margin-bottom">
							<div className="col-xs-12 col-md-6">
								<Field
									as={TextField}
									description="Geef de workflow een korte en duidelijke naam."
									id="data.name"
									label="Naam"
									name="data.name"
									required
									state={errors.data?.name && 'error'}
								/>
								<ErrorMessage component="p" name="label" />
							</div>
						</div>

						<div className="row u-margin-bottom">
							<div className="col-xs-12">
								<Field
									as={Textarea}
									id="data.description"
									label="Beschrijving"
									name="data.description"
									required
									state={errors.data?.description && 'error'}
								/>
								<small className="u-block u-text-light u-margin-top-xs">
									Geef de workflow een duidelijke beschrijving voor in het
									overzicht.
								</small>
							</div>
						</div>

						{typeof children === 'function'
							? (children as FormikChildrenFn<WorkflowDetailModel>)(formikProps)
							: children}
					</>
				);
			}}
		</Formik>
	);
};

export default WorkflowSettingsForm;
