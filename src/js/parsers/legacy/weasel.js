import words from '../../data/weasel';

const expression = new RegExp('\\b(' + words.list.join('|') + ')\\b', 'gi');

export default function weasel(text) {
	const matches = [...text.matchAll(expression)];
	
	if (!matches) {
		return [];
	}
	
	return matches.map((match) => {
		const [ value ] = [...match].filter(Boolean);

		return {
			value,
			type: 'weasel',
			level: 'warning',
			message: `"${value}" is a weasel word.`,
			index: match.index,
			offset: value.length + match.index,
			replacements: [{
				action: 'delete',
				value: '',
			}],
		};
	});
};
