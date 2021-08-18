import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { CopyValue, DeletePrompt, ErrorMessage, FormikOnChangeHandler } from '@redactie/utils';
import { Field, Formik } from 'formik';
import kebabCase from 'lodash.kebabcase';
import React, { FC, ReactElement, useState } from 'react';

import { DefaultFormActions } from '../..';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';

import { WORKFLOW_STATUS_FORM_VALIDATION_SCHEMA } from './workflowStatusForm.const';
import { WorkflowStatusFormProps, WorkflowStatusFormState } from './workflowStatusForm.types';

const WorkflowStatusForm: FC<WorkflowStatusFormProps> = ({
	initialState,
	isUpdate = false,
	isLoading = false,
	isDeleting = false,
	hasChanges = false,
	canDelete = false,
	onDelete,
	children,
	onCancel = () => null,
	onSubmit = () => null,
	onChange = () => null,
}) => {
	const [t] = useCoreTranslation();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const onDeletePromptConfirm = async (): Promise<void> => {
		if (onDelete) {
			await onDelete();
		}

		setShowDeleteModal(false);
	};

	const onDeletePromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	const renderDelete = (): ReactElement => {
		return (
			<>
				<Card className="u-margin-top">
					<CardBody>
						<CardTitle>Verwijderen</CardTitle>
						<p>
							Opgelet, indien u deze status verwijderd kan hij niet meer aan een
							workflow worden toegevoegd.
						</p>
						<Button
							onClick={() => setShowDeleteModal(true)}
							className="u-margin-top"
							type="danger"
							iconLeft="trash-o"
						>
							{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
						</Button>
					</CardBody>
				</Card>
				<DeletePrompt
					body="Ben je zeker dat je deze status wil verwijderen? Dit kan niet ongedaan gemaakt worden."
					isDeleting={isDeleting}
					show={showDeleteModal}
					onCancel={onDeletePromptCancel}
					onConfirm={onDeletePromptConfirm}
				/>
			</>
		);
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={WORKFLOW_STATUS_FORM_VALIDATION_SCHEMA}
		>
			{props => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as WorkflowStatusFormState)}
						/>
						<div className="row middle-xs">
							<div className="col-xs-12 col-md-8">
								<Field
									description="Geef de rol een korte en duidelijke naam."
									as={TextField}
									required
									id="name"
									label="Naam"
									name="name"
								/>
								<ErrorMessage name="name" />
							</div>
							<div className="col-xs-12 col-md-4 u-margin-top-xs u-margin-bottom">
								<div>
									{t(CORE_TRANSLATIONS['GENERAL_SYSTEM-NAME'])}:{' '}
									<b>
										{isUpdate
											? initialState?.systemName
											: kebabCase(initialState.name)}
									</b>
								</div>
							</div>
						</div>
						<div className="row u-margin-top">
							<div className="col-xs-12">
								<Field
									as={Textarea}
									id="description"
									required
									label="Beschrijving"
									name="description"
								/>
								<small>
									Geef de status een duidelijke beschrijving voor in het
									overzicht.
								</small>
								<ErrorMessage name="description" />
							</div>
						</div>
						{onDelete && canDelete ? renderDelete() : null}
						{initialState.uuid && (
							<div className="row u-margin-top">
								<CopyValue
									label="UUID"
									value={initialState.uuid}
									buttonText={t(CORE_TRANSLATIONS.GENERAL_COPY)}
									className="col-xs-12"
								/>
							</div>
						)}
						<DefaultFormActions
							isLoading={isLoading}
							saveBtnDisabled={isDeleting}
							hasChanges={hasChanges}
							onCancel={onCancel}
						/>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default WorkflowStatusForm;
