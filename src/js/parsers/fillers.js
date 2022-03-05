import words from '../data/fillers';

const expression = new RegExp('\\b(' + words.join('|') + ')\\b', 'gi');

export default function fillers(text) {
	const matches = [...text.matchAll(expression)];
	
	if (!matches) {
		return [];
	}
	
	return matches.map((match) => {
		const [ value ] = [...match].filter(Boolean);

		return {
			value,
			type: 'filler',
			level: 'warning',
			message: `"${value}" is a filler word.`,
			index: match.index,
			offset: value.length + match.index,
			replacements: [{
				action: 'delete',
				value: '',
			}],
		};
	});
};
