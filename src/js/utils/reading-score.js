/**
 */
import readingTime from 'reading-time/lib/reading-time';
import { automatedReadability } from 'automated-readability';
import { polarity } from 'polarity';

/**
 */
import { count as characterCounter } from '@wordpress/wordcount';

/**
 * Internal dependencies
 */
import { strip } from './strip-text';
import { tokenize } from './tokenizer';

/**
 *
 * @param {string} content
 */
export const readingScore = ( content ) => {
	const text = strip( content );

	const paragraphs = text
		.replace( /\n$/gm, '' )
		.split( /\n/g )
		.filter( ( line ) => line.length );
	const { sentences } = tokenize( paragraphs.join( ' ' ) );
	const words = sentences.reduce( ( accumulator, sentence ) => {
		const { words } = tokenize( sentence );

		accumulator.push( ...words );
		return accumulator;
	}, [] );

	const wordCount = characterCounter( text, 'words' );
	const characterCount = characterCounter(
		text,
		'characters_including_spaces'
	);
	const alphaNumericCharacters = text.match( /[a-zA-Z0-9]/g );
	const letters = text.match( /[a-zA-Z]/g )?.length || 0;
	const score = automatedReadability( {
		sentence: sentences.length,
		word: wordCount,
		character: alphaNumericCharacters?.length || 0,
	} );
	const { polarity: polarityScore } = polarity( words );
	const { minutes } = readingTime( text, { wordsPerMinute: 250 } );

	return {
		paragraphs: paragraphs.length,
		sentences: sentences.length,
		words: wordCount,
		characters: characterCount,
		score: Math.round( score ),
		letters,
		polarity: polarityScore,
		readingTime: minutes,
	};
};
