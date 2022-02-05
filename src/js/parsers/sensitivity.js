import { text } from 'alex';

const typeMap = {
    'retext-equality': 'equality',
    'retext-profanities': 'profanity',
};

export default function sensitivity(content) {
    const { messages } = text(content);
    
    if (!messages.length) {
        return [];
    }
    
    return messages.map((match) => {
        const { actual: value, position: { start: { offset: index }, end: { offset } }, message, fatal, source } = match;

        return {
            value,
            type: typeMap[source],
            level: fatal ? 'warning' : 'suggestion',
            message,
            index,
            offset,
        };
    });
}
