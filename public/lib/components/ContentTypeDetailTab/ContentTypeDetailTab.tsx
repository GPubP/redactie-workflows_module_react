import { Button, Select } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
} from '@acpaas-ui/react-editorial-components';
import { ExternalTabProps } from '@redactie/content-types-module';
import {
	DataLoader,
	FormikOnChangeHandler,
	LeavePrompt,
	LoadingState,
	SelectOption,
	useDetectValueChanges,
	useSiteContext,
} from '@redactie/utils';
import classnames from 'classnames/bind';
import { Field, Formik } from 'formik';
import { equals, isEmpty, uniq } from 'ramda';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { TransitionsTable } from '../../components';
import { rolesRightsConnector } from '../../connectors';
import contentTypeConnector from '../../connectors/contentTypes/contentTypes';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { usePaginatedWorkflows, usePaginatedWorkflowStatuses, useWorkflow } from '../../hooks';
import { WorkflowPopulatedTransition } from '../../services/workflows';
import { StatusSelectForm, StatusSelectFormItem, StatusSelectFormState } from '../Forms';

import styles from './ContentTypeDetailTab.module.scss';
import { ContentTypeDetailTabFormState } from './ContentTypeDetailTab.types';

const cx = classnames.bind(styles);

const ContentTypeDetailTab: FC<ExternalTabProps> = ({
	value = {} as Record<string, any>,
	isLoading,
	onCancel,
}) => {
	const initialValues: ContentTypeDetailTabFormState = {
		workflow: value?.config?.workflow || null,
	};
	const [t] = useCoreTranslation();
	const [formValue, setFormValue] = useState<any | null>(initialValues);
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(!isLoading, formValue);
	const { siteId } = useSiteContext();
	const { loading: workflowsLoading, pagination: workflowsPagination } = usePaginatedWorkflows(
		{
			page: 1,
			pagesize: -1,
		},
		{
			siteId,
		}
	);
	const {
		loading: statusesLoading,
		pagination: statusesPagination,
	} = usePaginatedWorkflowStatuses({
		page: 1,
		pagesize: -1,
	});
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [rolesLoadingState, roles] = rolesRightsConnector.api.hooks.useSiteRoles();
	const [workflowOptions, setWorkflowOptions] = useState<SelectOption[]>([]);
	const [workflow, workflowUI] = useWorkflow(formValue.workflow, siteId);
	const [initialWorkflowStatuses, setInitialWorkflowStatuses] = useState<SelectOption[]>([]);
	const [initialWorkflowName, setInitialWorkflowName] = useState<string>();
	const [newWorkflowStatuses, setNewWorkflowStatuses] = useState<SelectOption[]>([]);
	const [formState, setFormState] = useState<StatusSelectFormState>({ statuses: [] });
	const [statusMapping, setStatusMapping] = useState<{ from: string; to: string }[]>([]);
	const [formValid, setFormValid] = useState<boolean>(false);
	const [, , , contentType] = contentTypeConnector.hooks.useContentType();
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [newWorkflowId, setNewWorkflowId] = useState<string>();

	useEffect(() => {
		rolesRightsConnector.api.store.roles.service.getSiteRoles(siteId);
	}, [siteId]);

	useEffect(() => {
		if (!workflowsPagination) {
			return;
		}

		setWorkflowOptions(
			(workflowsPagination?.data || []).map(workflow => ({
				label: workflow.data.name,
				value: workflow.uuid || '',
			}))
		);
	}, [workflowsPagination]);

	const getStatusMap = (transitions: WorkflowPopulatedTransition[]): SelectOption[] => {
		const arr = transitions.reduce(
			(acc: SelectOption[], transition: WorkflowPopulatedTransition) => {
				acc = [
					...acc,
					{
						label: transition.from.data.name,
						value: transition.from.uuid,
					},
					{
						label: transition.to.data.name,
						value: transition.to.uuid,
					},
				];
				return acc;
			},
			[]
		);

		return uniq(arr);
	};

	useEffect(() => {
		if (!workflow) {
			return;
		}

		if (isEmpty(initialWorkflowStatuses)) {
			const statusMap = getStatusMap(
				workflow?.data.transitions as WorkflowPopulatedTransition[]
			);

			setInitialWorkflowName(workflow.data.name);
			setInitialWorkflowStatuses(statusMap.sort());
			return;
		}

		if (workflow?.uuid !== value?.config?.workflow) {
			const statusMap = getStatusMap(
				workflow?.data.transitions as WorkflowPopulatedTransition[]
			);

			const state = initialWorkflowStatuses.map(status => {
				const to = statusMap.find(s => s.value === status.value);

				return {
					from: {
						uuid: status.value,
						name: status.label,
					},
					to: {
						uuid: to ? to.value : null,
						name: to ? to.label : null,
					},
					invalidFrom: !to,
				};
			});

			setFormState({
				statuses: state,
			});
			setNewWorkflowStatuses(statusMap.sort());

			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflow]);

	const onFormSubmit = async (values: ContentTypeDetailTabFormState): Promise<void> => {
		setNewWorkflowId(values.workflow);
		setShowConfirmModal(true);
	};

	const onConfirm = async (): Promise<void> => {
		if (!contentType) {
			return;
		}

		await contentTypeConnector.contentTypesFacade.updateContentTypeSiteWorkflow(
			{
				from: value?.config?.workflow || '',
				to: newWorkflowId as string,
				mapping: statusMapping,
			},
			contentType,
			siteId
		);

		setInitialWorkflowStatuses(newWorkflowStatuses);
		setNewWorkflowStatuses([]);
		resetChangeDetection();
		setShowConfirmModal(false);
	};

	const onStatusSelectFormChange = (values: StatusSelectFormState, isValid: boolean): void => {
		const mapping = values.statuses.reduce(
			(acc: { from: string; to: string }[], statusMap: StatusSelectFormItem) => {
				if (statusMap.from.uuid === statusMap.to.uuid) {
					return acc;
				}

				return [
					...acc,
					{
						from: statusMap.from.name,
						to: statusMap.to.name as string,
					},
				];
			},
			[]
		);

		setFormValid(isValid);
		setStatusMapping(mapping);
	};

	const onPromptCancel = (): void => {
		setShowConfirmModal(false);
	};

	const renderSelect = (): ReactElement => {
		return (
			<>
				<p>
					Bepaal welke workflow gebruikers moeten volgen bij het aanmaken en bewerken van
					dit content type.
				</p>
				<p>
					De workflow bepaalt welke rollen welke acties mogen uitvoeren op het content
					item.
				</p>
				<Formik onSubmit={onFormSubmit} initialValues={initialValues}>
					{({ submitForm }) => {
						return (
							<>
								<FormikOnChangeHandler onChange={values => setFormValue(values)} />
								<div className="row u-margin-top">
									<div className="col-xs-12 col-sm-6">
										<Field
											as={Select}
											id="workflow"
											name="workflow"
											label="Workflow"
											placeholder="Selecteer een workflow"
											options={workflowOptions}
										/>
									</div>
								</div>
								<div className="row u-margin-top-xs">
									<div className="col-xs-12 col-sm-6">
										<small>
											Selecteer een workflow uit de beschikbare lijst.
										</small>
									</div>
								</div>

								<ActionBar className="o-action-bar--fixed" isOpen>
									<ActionBarContentSection>
										<div className="u-wrapper row end-xs">
											<Button
												className="u-margin-right-xs"
												onClick={onCancel}
												negative
											>
												{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
											</Button>
											<Button
												disabled={!hasChanges || !formValid}
												onClick={submitForm}
												type="success"
												htmlType="submit"
											>
												{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
											</Button>
										</div>
									</ActionBarContentSection>
								</ActionBar>
								<ControlledModal
									show={showConfirmModal}
									onClose={onPromptCancel}
									size="large"
								>
									<ControlledModalHeader>
										<h4>Bevestigen</h4>
									</ControlledModalHeader>
									<ControlledModalBody>
										Je probeert de workflow voor dit content type te wijzigen.
										Weet je het zeker? Dit kan niet ongedaan gemaakt worden.{' '}
									</ControlledModalBody>
									<ControlledModalFooter>
										<div className="u-flex u-flex-item u-flex-justify-end">
											<Button onClick={onPromptCancel} negative>
												Annuleer
											</Button>
											<Button
												iconLeft={
													isLoading
														? 'circle-o-notch fa-spin'
														: 'fa-check'
												}
												disabled={isLoading}
												onClick={onConfirm}
												type={'success'}
											>
												Ja, oke
											</Button>
										</div>
									</ControlledModalFooter>
								</ControlledModal>
								<LeavePrompt
									shouldBlockNavigationOnConfirm
									when={hasChanges}
									onConfirm={submitForm}
								/>
							</>
						);
					}}
				</Formik>
				{!isEmpty(initialWorkflowStatuses) &&
					!isEmpty(newWorkflowStatuses) &&
					!equals(initialWorkflowStatuses, newWorkflowStatuses) && (
						<div className={cx('status-warning__wrapper', 'u-padding', 'u-margin-top')}>
							<h5>Deze workflow gebruikt andere statussen.</h5>
							<p className="u-margin-top">
								De workflow die je selecteerde bevat één of meerdere statussen die
								niet overeenkomen met de huidige actieve workflow. Kies een
								vervangende status.
							</p>
							<StatusSelectForm
								initialState={formState}
								from={initialWorkflowName as string}
								to={workflow?.data.name as string}
								statuses={newWorkflowStatuses}
								onChange={onStatusSelectFormChange}
							/>
						</div>
					)}
				<div className="row u-margin-top-lg">
					<div className="col-xs-12">
						<p>{workflow?.data.description}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<TransitionsTable
							statuses={statusesPagination?.data || []}
							readonly={true}
							roles={roles || []}
							workflow={workflow}
							mySecurityrights={mySecurityrights}
							siteId={siteId}
							loading={
								workflowUI?.isFetching ||
								workflowsLoading ||
								statusesLoading ||
								rolesLoadingState !== LoadingState.Loaded ||
								mySecurityRightsLoadingState !== LoadingState.Loaded
							}
							noDataMessage={'Geen workflow geselecteerd'}
						/>
					</div>
				</div>
			</>
		);
	};

	return <DataLoader loadingState={!workflowOptions.length} render={renderSelect} />;
};

export default ContentTypeDetailTab;
