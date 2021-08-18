import { Button } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { FormikValues, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';

import { DefaultFormActionsProps } from './DefaultFormActions.types';

const DefaultFormActions = <State extends FormikValues>({
	onCancel = () => null,
	hasChanges = false,
	isLoading = false,
	saveBtnDisabled = false,
}: DefaultFormActionsProps<State>): ReactElement => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const { submitForm, resetForm } = useFormikContext();

	return (
		<ActionBar className="o-action-bar--fixed" isOpen>
			<ActionBarContentSection>
				<div className="u-wrapper row end-xs">
					<Button onClick={() => onCancel(resetForm)} negative>
						{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
					</Button>
					<Button
						iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
						disabled={isLoading || saveBtnDisabled || !hasChanges}
						className="u-margin-left-xs"
						onClick={submitForm}
						type="success"
					>
						{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
					</Button>
				</div>
			</ActionBarContentSection>
		</ActionBar>
	);
};

export default DefaultFormActions;
