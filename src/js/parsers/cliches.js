import phrases from '../data/cliches';

function normalizeText(string = '') {
    // replace conjunctives, trim whitespace
    // and augment common multiple word groups

    let text = `${string}`.trim();
    const ignore = /(^#|^$)/.test(text);
    if (ignore) return null;

    text = text.replace(/\s+/g, " ");
    text = text.replace(/ (&|n|and) /i, ' (&|n|and) ');
    text = text.replace(/ (his|her) /i, ' (his|her) ');
    text = text.replace(/([\s^])?(your|my) /i, '$1(your|my) ');
    text = text.replace(/([\s^])?(you|we) /gi, '$1(you|we) ');

    return text;
}

const expression = new RegExp('\\b(' + phrases.map(normalizeText).filter(Boolean).join('|') + ')\\b', 'gi');

export default function cliches(text) {
	const matches = [...text.matchAll(expression)];
	
	if (!matches) {
		return [];
	}
	
	return matches.map((match) => {
		const [ value ] = [...match].filter(Boolean);

		return {
			value,
			type: 'cliche',
			level: 'warning',
			message: `"${value}" is a cliche.`,
			index: match.index,
			offset: value.length + match.index,
			replacements: [],
		};
	});
};
