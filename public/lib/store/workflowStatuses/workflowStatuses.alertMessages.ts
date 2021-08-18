import { AlertMessages } from '../../workflows.types';

export const getAlertMessages = (
	name?: string
): AlertMessages<'fetch' | 'fetchOne' | 'delete' | 'update'> => ({
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
