import { flow } from 'lodash';
import { count as characterCounter } from '@wordpress/wordcount';
import readingTime from 'reading-time/lib/reading-time';
import { automatedReadability } from 'automated-readability';
import { polarity } from 'polarity';

import stripAstrals from './utils/strip-astrals';
import stripHTMComments from './utils/strip-html-comments';
import stripSpaces from './utils/strip-spaces';
import stripTags from './utils/strip-tags';
import stripHTMLEntities from './utils/strip-html-entities';
import { tokenize } from './tokenizer';

/**
 * 
 * @param {string} text
 */
export const readingScore = (content) => {
    const text = `${
        flow(
            stripTags,
            stripHTMComments,
            stripAstrals,
            stripSpaces,
            stripHTMLEntities,
        )(content)
    }\n`;

    const stripped = text.split(' ').filter(Boolean).join(' ');
    const paragraphs = stripped.replace(/\n$/gm, '').split(/\n/g).filter((line) => line.length);
    const { sentences } = tokenize(paragraphs.join(' '));
    const words = sentences.reduce((accumulator, sentence) => {
        const { words } = tokenize(sentence);

        accumulator.push(...words);
        return accumulator;
    }, []);

    const wordCount = characterCounter(stripped, 'words');
    const characterCount = characterCounter(stripped, 'characters_including_spaces');
    const alphaNumericCharacters = stripped.match(/[a-zA-Z0-9]/g);
    const letters = stripped.match(/[a-zA-Z]/g)?.length || 0;
    const score = automatedReadability({
        sentence: sentences.length,
        word: wordCount,
        character: alphaNumericCharacters?.length || 0,
    });
    const { polarity: polarityScore } = polarity(words);
    const { minutes } = readingTime(stripped, { wordsPerMinute: 275 });

    return {
        paragraphs: paragraphs.length,
        sentences: sentences.length,
        words: wordCount,
        characters: characterCount,
        score: Math.round(score),
        letters,
        polarity: polarityScore,
        readingTime: minutes,
    };
};
