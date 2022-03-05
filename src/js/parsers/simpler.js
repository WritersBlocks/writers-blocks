import words from '../data/simpler';

const expression = new RegExp('\\b(' + words.map(({ value }) => value).join('|') + ')\\b', 'gi');

export default function simpler(text) {
    const matches = [...text.matchAll(expression)];
    
    if (!matches) {
        return [];
    }
    
    return matches.map((match) => {
        const [ value ] = [...match].filter(Boolean);
        const replacement = words.find(({ value: word }) => word === value);

        return {
            value,
            type: 'simpler',
            level: 'suggestion',
            message: `"${ value }" has a simpler alternative.`,
            index: match.index,
            offset: value.length + match.index,
            replacements: replacement?.replace ? replacement.replace.split(', ').map((value) => ({ value: value.toLocaleLowerCase(), action: 'replace' })) : [],
        };
    });
}
