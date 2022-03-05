import words from '../data/passive';

const expression = new RegExp('\\b(am|are|were|being|is|been|was|be)\\b\\s*([\\w]+ed|' + words.map((word) => word.value).join('|') + ')\\b', 'gi');

export default function passive(text) {
    const matches = [...text.matchAll(expression)];

    if (!matches) {
        return [];
    }

    return matches.map((match) => {
        const [ value ] = [...match].filter(Boolean);
        const replacement = words.find(({ value: word }) => word === value);

        return {
            value,
            type: 'passive',
            level: 'warning',
            message: `"${value}" may be passive voice.`,
            index: match.index,
            offset: value.length + match.index,
            replacements: replacement?.replace ? replacement.replace.split(', ').map((value) => ({ value: value.toLocaleLowerCase(), action: 'replace' })) : [],
        };
    });
}
