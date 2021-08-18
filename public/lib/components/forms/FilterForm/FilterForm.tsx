import { TextField } from '@acpaas-ui/react-components';
import { Filter, FilterBody } from '@acpaas-ui/react-editorial-components';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';

import { FILTER_FORM_VALIDATION_SCHEMA } from './FilterForm.const';
import { FilterFormProps } from './FilterForm.types';

const FilterForm: FC<FilterFormProps> = ({
	initialState,
	onCancel,
	onSubmit,
	activeFilters,
	deleteActiveFilter,
}) => {
	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={FILTER_FORM_VALIDATION_SCHEMA}
		>
			{({ submitForm, resetForm }) => {
				return (
					<Form>
						<Filter
							title="Filter"
							noFilterText="Geen filters beschikbaar"
							onConfirm={submitForm}
							onClean={() => onCancel(resetForm)}
							confirmText="Toepassen"
							cleanText="Alles leegmaken"
							activeFilters={activeFilters}
							onFilterRemove={deleteActiveFilter}
						>
							<FilterBody>
								<div className="col-xs-12 col-md">
									<Field
										as={TextField}
										label="Naam"
										name="name"
										id="name"
										placeholder="Zoeken op naam"
										iconright="search"
									/>
								</div>
							</FilterBody>
						</Filter>
					</Form>
				);
			}}
		</Formik>
	);
};

export default FilterForm;
