import { AlertMessages } from '../../workflows.types';

export const getAlertMessages = (
	name?: string
): AlertMessages<'create' | 'fetch' | 'fetchOne' | 'delete' | 'update'> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `U hebt de status ${name} succesvol aangemaakt`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Aanmaken van de status ${name} is mislukt`,
		},
	},
	fetch: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van statussen is mislukt',
		},
	},
	fetchOne: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van status is mislukt',
		},
	},
	delete: {
		success: {
			title: 'Verwijderen',
			message: `U hebt status ${name} succesvol verwijderd`,
		},
		error: {
			title: 'Verwijderen',
			message: `Verwijderen van status ${name} is mislukt`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `U hebt de status ${name} succesvol gewijzigd`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de status ${name} is mislukt`,
		},
	},
});
