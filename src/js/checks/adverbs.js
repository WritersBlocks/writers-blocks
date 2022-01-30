import words from '../data/adverbs';

export default function adverbs(text) {
    const expression = new RegExp('\\b(' + words.join('|') + ')(y)\\b', 'gi');
    const matches = [...text.matchAll(expression)];
    
    if (!matches) {
        return [];
    }
    
    return matches.map((match) => {
        const [ value ] = [...match].filter(Boolean);

        return {
            value,
            type: 'adverbs',
            level: 'warning',
            message: 'adverbs can weaken meaning',
            index: match.index,
            offset: value.length + match.index,
        };
    });
}
