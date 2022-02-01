import { readingScore } from "../reading-score";
import { tokenize } from '../tokenizer';

export default (text) => {
    const paragraphs = text.replace(/\n$/gm, '').split(/\n/g).filter((line) => line.length);
    const { sentences } = tokenize(paragraphs.join(' '));

    return !sentences ? [] : sentences.map((sentence, index) => {
        const { score, words } = readingScore(sentence);
        const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;

        return words > 14 && level ? {
            value: sentence,
            type: `readability-${level === 'warning' ? 'very-' : ''}hard`,
            level,
            message: `sentence is${level ===  'warning' ? ' very' : ''} hard to read`,
            index: index === 0 ? 0 : sentences[index - 1].length + 1,
            offset: sentences.reduce((accumulator, currentValue, currentIndex) => currentIndex <= index ? accumulator + currentValue.length : accumulator, 0),
        } : null;
    }).filter(Boolean);
};
