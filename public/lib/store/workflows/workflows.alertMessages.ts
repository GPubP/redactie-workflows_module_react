import { AlertMessages } from '../../workflows.types';

export const getAlertMessages = (
	name?: string
): AlertMessages<
	| 'create'
	| 'fetch'
	| 'fetchOne'
	| 'delete'
	| 'update'
	| 'activate'
	| 'deactivate'
	| 'updateTransitions'
> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `U hebt de workflow ${name} succesvol aangemaakt`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Aanmaken van de workflow ${name} is mislukt`,
		},
	},
	fetch: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van workflows is mislukt',
		},
	},
	fetchOne: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van workflow is mislukt',
		},
	},
	delete: {
		success: {
			title: 'Verwijderen',
			message: `U hebt workflow ${name} succesvol verwijderd`,
		},
		error: {
			title: 'Verwijderen',
			message: `Verwijderen van workflow ${name} is mislukt`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `U hebt de workflow ${name} succesvol gewijzigd`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de workflow ${name} is mislukt`,
		},
	},
	updateTransitions: {
		success: {
			title: 'Bewaard',
			message: `U hebt de rechten op de transities voor ${name} succesvol gewijzigd`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de rechten op de transities voor ${name} is mislukt`,
		},
	},
	activate: {
		success: {
			title: 'Geactiveerd',
			message: `U hebt de workflow ${name} succesvol geactiveerd`,
		},
		error: {
			title: 'Activeren mislukt',
			message: `Activeren van de workflow ${name} is mislukt`,
		},
	},
	deactivate: {
		success: {
			title: 'Gedeactiveerd',
			message: `U hebt de workflow ${name} succesvol gedeactiveerd`,
		},
		error: {
			title: 'Deactiveren mislukt',
			message: `Deactiveren van de workflow ${name} is mislukt`,
		},
	},
});
