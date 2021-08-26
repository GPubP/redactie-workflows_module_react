import {
	Link as AUILink,
	Button,
	Card,
	CardBody,
	CardDescription,
	CardTitle,
} from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Status } from '@acpaas-ui/react-editorial-components';
import {
	alertService,
	DeletePrompt,
	FormikOnChangeHandler,
	LeavePrompt,
	useDetectValueChanges,
	useNavigate,
	useOnNextRender,
	useSiteContext,
} from '@redactie/utils';
import { FormikProps, FormikValues } from 'formik';
import React, { FC, ReactElement, useMemo, useRef, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { WorkflowSettingsForm } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { useWorkflowsUIStates } from '../../hooks';
import { WorkflowDetailModel, workflowsFacade } from '../../store/workflows';
import { WORKFLOW_ALERT_CONTAINER_IDS } from '../../store/workflows/workflows.const';
import { MODULE_PATHS, SITES_ROOT } from '../../workflows.const';
import { WorkflowDetailRouteProps } from '../../workflows.types';

const SiteWorkflowSettings: FC<WorkflowDetailRouteProps> = ({
	allowedPaths,
	onCancel,
	onSubmit,
	workflow,
}) => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const { siteId } = useSiteContext();
	const [listState, detailState] = useWorkflowsUIStates(workflow?.uuid);
	const isUpdate = useMemo(() => !!workflow?.uuid, [workflow]);

	const formikRef = useRef<FormikProps<FormikValues>>();
	const isLoading = useMemo(
		() => (isUpdate ? !!detailState?.isUpdating : !!listState?.isCreating),
		[detailState, isUpdate, listState]
	);
	const [formValue, setFormValue] = useState<WorkflowDetailModel | null>(workflow || null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { navigate } = useNavigate(SITES_ROOT);
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(
		!isLoading && !!workflow && !!formValue,
		formValue
	);
	const [resetChangeDetectionOnNextRender] = useOnNextRender(() => resetChangeDetection());

	/**
	 * Methods
	 */
	const renderDangerAlert = ({
		title = 'Foutmelding',
		message = 'Niet alle velden van het formulier zijn correct ingevuld',
	} = {}): void => {
		alertService.danger(
			{ title, message },
			{ containerId: WORKFLOW_ALERT_CONTAINER_IDS.update }
		);
	};

	const onFormSubmit = async (value: WorkflowDetailModel | null): Promise<void> => {
		if (!value) {
			return renderDangerAlert();
		}

		if (!formikRef || !formikRef.current) {
			return renderDangerAlert({
				message: 'Er is iets fout gelopen. Probeer later opnieuw.',
			});
		}

		await onSubmit({ ...workflow, ...value });
		// Otherwise the reset change detection is called to early
		resetChangeDetectionOnNextRender();
	};

	const onDeletePromptConfirm = async (): Promise<void> => {
		await workflowsFacade
			.deleteSiteWorkflow(siteId, workflow, {
				successAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.overview,
				errorAlertContainerId: WORKFLOW_ALERT_CONTAINER_IDS.update,
			})
			.then(() => navigate(MODULE_PATHS.site.workflowsOverview))
			.catch(() => setShowDeleteModal(false));
	};

	const onDeletePromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	const onActiveToggle = (): void => {
		workflow?.meta?.active
			? workflowsFacade.deactivateWorkflow({
					uuid: workflow.uuid,
					name: workflow?.data?.name,
			  })
			: workflowsFacade.activateWorkflow({
					uuid: workflow?.uuid,
					name: workflow?.data?.name,
			  });
	};

	const getLoadingStateBtnProps = (
		loading: boolean
	): { iconLeft: string; disabled: boolean } | null => {
		return loading
			? {
					iconLeft: 'circle-o-notch fa-spin',
					disabled: true,
			  }
			: null;
	};

	const renderStatusCard = (): ReactElement => {
		const occurrences = workflow.meta?.occurrences || [];
		const occurrencesCount = occurrences.length;
		const isActive = !!workflow.meta?.active;
		const pluralSingularText = occurrencesCount === 1 ? 'site' : 'sites';
		const text = (
			<>
				Deze workflow wordt gebruikt in{' '}
				<strong>
					{occurrencesCount} {pluralSingularText}
				</strong>
			</>
		);

		const statusText = workflow.meta?.active ? (
			occurrencesCount > 0 ? (
				<p> {text} en kan daarom niet gedeactiveerd worden.</p>
			) : (
				<p>
					{text}. Deactiveer deze workflow indien je hem tijdelijk niet meer wil kunnen
					gebruiken.
				</p>
			)
		) : (
			<p>{text}. Activeer de workflow om hem beschikbaar te maken binnen sites.</p>
		);

		return (
			<Card>
				<CardBody>
					<CardTitle>
						Status:{' '}
						{workflow?.meta?.active ? (
							<Status label={t(CORE_TRANSLATIONS.STATUS_ACTIVE)} type="ACTIVE" />
						) : (
							<Status
								label={t(CORE_TRANSLATIONS['STATUS_NON-ACTIVE'])}
								type="INACTIVE"
							/>
						)}
					</CardTitle>
					<CardDescription>{statusText}</CardDescription>
					{occurrencesCount > 0 && (
						<ul>
							{occurrences.map((occurrence, index) => (
								<li key={`${index}_${occurrence.uuid}`}>
									<AUILink
										to={generatePath(`${MODULE_PATHS.site.dashboard}/`, {
											siteId: occurrence.uuid,
										})}
										component={Link}
									>
										{occurrence.name}
									</AUILink>
								</li>
							))}
						</ul>
					)}
					{isActive && occurrencesCount === 0 && (
						<Button
							{...getLoadingStateBtnProps(!!detailState?.isUpdating)}
							onClick={onActiveToggle}
							className="u-margin-top u-margin-right"
							type="primary"
						>
							{t('BUTTON_DEACTIVATE')}
						</Button>
					)}
					{!isActive && (
						<Button
							{...getLoadingStateBtnProps(!!detailState?.isUpdating)}
							onClick={onActiveToggle}
							className="u-margin-top u-margin-right"
							type="primary"
						>
							{t('BUTTON_ACTIVATE')}
						</Button>
					)}
					{occurrencesCount === 0 && (
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
		);
	};

	/**
	 * Render
	 */
	return (
		<>
			<WorkflowSettingsForm
				formikRef={instance => (formikRef.current = instance || undefined)}
				workflow={workflow}
				isUpdate={isUpdate}
				onSubmit={onFormSubmit}
			>
				{({ submitForm }) => {
					return (
						<>
							<FormikOnChangeHandler
								onChange={values => {
									setFormValue(values as WorkflowDetailModel);
								}}
							/>
							{isUpdate && <div className="u-margin-top">{renderStatusCard()}</div>}
							<ActionBar className="o-action-bar--fixed" isOpen>
								<ActionBarContentSection>
									<div className="u-wrapper u-text-right">
										<Button onClick={onCancel} negative>
											{isUpdate
												? t(CORE_TRANSLATIONS.BUTTON_CANCEL)
												: t(CORE_TRANSLATIONS.BUTTON_BACK)}
										</Button>
										<Button
											iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
											disabled={isLoading || !hasChanges}
											className="u-margin-left-xs"
											onClick={submitForm}
											type="success"
										>
											{isUpdate
												? t(CORE_TRANSLATIONS.BUTTON_SAVE)
												: t(CORE_TRANSLATIONS['BUTTON_SAVE-NEXT'])}
										</Button>
									</div>
								</ActionBarContentSection>
							</ActionBar>
							<LeavePrompt
								allowedPaths={allowedPaths}
								when={hasChanges}
								shouldBlockNavigationOnConfirm
								onConfirm={submitForm}
							/>
							<DeletePrompt
								body="Ben je zeker dat je deze workflow wil verwijderen? Dit kan niet ongedaan gemaakt worden."
								isDeleting={isLoading}
								show={showDeleteModal}
								onCancel={onDeletePromptCancel}
								onConfirm={onDeletePromptConfirm}
							/>
						</>
					);
				}}
			</WorkflowSettingsForm>
		</>
	);
};

export default SiteWorkflowSettings;
