import { pathOr } from 'ramda';

export const sortAlphabetically = <T>(data: T[], prop: string[]): T[] => {
	return data.sort((a, b) => {
		return pathOr('', prop, a)
			.toLowerCase()
			.localeCompare(pathOr('', prop, b));
	});
};
