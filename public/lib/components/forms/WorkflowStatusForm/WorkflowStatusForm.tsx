import {
	Link as AUILink,
	Button,
	Card,
	CardBody,
	CardDescription,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import {
	CopyValue,
	DataLoader,
	DeletePrompt,
	ErrorMessage,
	FormikOnChangeHandler,
} from '@redactie/utils';
import { Field, Formik } from 'formik';
import kebabCase from 'lodash.kebabcase';
import React, { FC, ReactElement, useState } from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import { DefaultFormActions } from '../..';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { MODULE_PATHS } from '../../../workflows.const';

import { WORKFLOW_STATUS_FORM_VALIDATION_SCHEMA } from './WorkflowStatusForm.const';
import { WorkflowStatusFormProps, WorkflowStatusFormState } from './WorkflowStatusForm.types';

const WorkflowStatusForm: FC<WorkflowStatusFormProps> = ({
	initialState,
	isUpdate = false,
	isLoading = false,
	isDeleting = false,
	hasChanges = false,
	canDelete = false,
	onDelete,
	children,
	occurrences,
	occurrencesLoading,
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
		const pluralSingularText = occurrences?.length === 1 ? 'workflow' : 'workflows';
		const text = (
			<>
				Deze status wordt gebruikt op{' '}
				<strong>
					{occurrences?.length} {pluralSingularText}
				</strong>
			</>
		);

		const statusText =
			(occurrences?.length || 0) > 0 ? (
				<p> {text} en kan daarom niet verwijderd worden.</p>
			) : (
				<p>
					Opgelet: indien je deze status verwijderd kan hij niet meer aan een workflow
					worden toegevoegd.
				</p>
			);

		return (
			<>
				{/* Should we provide a CardOccurences helper? */}
				<Card className="u-margin-top">
					<CardBody>
						<CardTitle>Verwijderen</CardTitle>
						<CardDescription>{statusText}</CardDescription>
						{(occurrences?.length || 0) > 0 && (
							<ul>
								{occurrences?.map((occurrence: any, index: number) => (
									<li key={`${index}_${occurrence.uuid}`}>
										<AUILink
											to={generatePath(
												`${MODULE_PATHS.workflowCreateSettings}/`,
												{
													workflowUuid: occurrence.uuid,
												}
											)}
											component={Link}
										>
											{occurrence.data.name}
										</AUILink>
									</li>
								))}
							</ul>
						)}
						{occurrences?.length === 0 && (
							<Button
								onClick={() => setShowDeleteModal(true)}
								className="u-margin-top"
								type="danger"
								iconLeft="trash-o"
							>
								{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
							</Button>
						)}
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
									description="Geef de status een korte en duidelijke naam."
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
									Geef de status een duidelijke beschrijving. Deze wordt gebruikt
									in het overzicht.
								</small>
								<ErrorMessage name="description" />
							</div>
						</div>
						{canDelete && (
							<DataLoader
								loadingState={occurrencesLoading || false}
								render={renderDelete}
							/>
						)}
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
