import { readingScore } from "../reading-score";

export default (text) => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];

    return !sentences ? [] : sentences.map((sentence) => {
        const { score, words } = readingScore(sentence);
        const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;

        return words > 14 && level ? {
            value: sentence,
            type: `readability-${level === 'warning' ? 'very-' : ''}hard`,
            level,
            message: `sentence is${level ===  'warning' ? ' very' : ''} hard to read`,
            index: 0,
            offset: sentence.length,
        } : null;
    }).filter(Boolean);
};
