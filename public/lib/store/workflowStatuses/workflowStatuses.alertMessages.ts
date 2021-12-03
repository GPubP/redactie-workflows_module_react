import { AlertMessages } from '../../workflows.types';

export const getAlertMessages = (
	name?: string
): AlertMessages<'create' | 'fetch' | 'fetchOne' | 'delete' | 'update' | 'fetchOccurrences'> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `Je hebt de status ${name} succesvol aangemaakt.`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Aanmaken van de status ${name} is mislukt.`,
		},
	},
	fetch: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van statussen is mislukt.',
		},
	},
	fetchOne: {
		error: {
			title: 'Ophalen',
			message: 'Ophalen van status is mislukt.',
		},
	},
	fetchOccurrences: {
		error: {
			title: 'Er ging iets mis',
			message:
				'Er ging iets mis bij het ophalen van worklfows waarin deze status gebruikt wordt.',
		},
	},
	delete: {
		success: {
			title: 'Verwijderen',
			message: `Je hebt status ${name} succesvol verwijderd.`,
		},
		error: {
			title: 'Verwijderen',
			message: `Verwijderen van status ${name} is mislukt.`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `Je hebt de status ${name} succesvol gewijzigd.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de status ${name} is mislukt.`,
		},
	},
});
