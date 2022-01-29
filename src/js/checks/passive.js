import words from '../data/passive';

const expression = new RegExp('\\b(am|are|were|being|is|been|was|be)\\b\\s*([\\w]+ed|' + words.map((word) => word.value).join('|') + ')\\b', 'gi');

export default (text) => {
    const matches = [...text.matchAll(expression)];

    if (!matches) {
        return [];
    }

    return matches.map((match) => {
        const [ value ] = [...match].filter(Boolean);

        return {
            value,
            type: 'passive',
            level: 'warning',
            index: match.index,
            offset: value.length + match.index,
        };
    });
};
