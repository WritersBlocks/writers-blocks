import { flow } from 'lodash';
import { count as characterCount } from '@wordpress/wordcount';
import readingTime from 'reading-time/lib/reading-time';

import stripAstrals from './strip-astrals';
import stripHTMComments from './strip-html-comments';
import stripSpaces from './strip-spaces';
import stripTags from './strip-tags';
import stripHTMLEntities from './strip-html-entities';

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

    const paragraphs = text.replace(/\n$/gm, '').split(/\n/g).filter((line) => line.length).length;
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g)?.length || 0;
    const words = characterCount(text, 'words');
    const characters = characterCount(text, 'characters_including_spaces');
    const alphaNumericCharacters = text.match(/[a-zA-Z0-9]/g)?.length || 0;
    const letters = text.match(/[a-zA-Z]/g)?.length || 0;
    const score = 4.71 * (alphaNumericCharacters / words) + 0.5 * (words / sentences) - 21.43;
    const { time } = readingTime(text, { wordsPerMinute: 275 });

    return {
        paragraphs,
        sentences,
        words,
        characters,
        score: Math.round(score),
        letters,
        readingTime: time,
    };
};
