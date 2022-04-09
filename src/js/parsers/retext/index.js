/**
 * External dependencies
 */
import { VFile } from 'vfile';
import { sort } from 'vfile-sort';
import { unified } from 'unified';
import retextEnglish from 'retext-english';
import retextSpell from 'retext-spell';
import retextEquality from 'retext-equality';
import retextProfanities from 'retext-profanities';
import retextSimplify from 'retext-simplify';
import retextReadability from 'retext-readability';
import retextIndefiniteArticle from 'retext-indefinite-article';
import retextSentenceSpacing from 'retext-sentence-spacing';
import retextRepeatedWords from 'retext-repeated-words';
import retextRedundantAcronyms from 'retext-redundant-acronyms';
import retextPassive from 'retext-passive';
import retextIntensify from 'retext-intensify';
import retextDiacritics from 'retext-diacritics';
import retextContractions from 'retext-contractions';
import remarkMessageControl from 'remark-message-control';
import retextPos from 'retext-pos';
import { visit } from 'unist-util-visit';

/**
 * Internal dependencies
 */
import { getPartOfSpeech } from '../../utils/part-of-speech';
import { SYNTAX_TYPES } from '../../constants';
import dic from '../dictionary/en/dic';
import aff from '../dictionary/en/aff';

export function parse( value, config ) {
	return core( value, makeText( config ) );
}

function makeText( {
	ignored: {
		passive = '',
		intensify = '',
		diacritics = '',
		equality = '',
		profanities = '',
		simplify = '',
		spell = '',
	},
} ) {
	return unified()
		.use( retextEnglish )
		.use( retextEquality, {
			ignore: equality.split( ',' ),
		} )
		.use( retextProfanities, {
			ignore: profanities.split( ',' ),
		} )
		.use( retextSimplify, {
			ignore: simplify.split( ',' ),
		} )
		.use( retextReadability )
		.use( retextIndefiniteArticle )
		.use( retextSentenceSpacing )
		.use( retextRepeatedWords )
		.use( retextRedundantAcronyms )
		.use( retextPassive, {
			ignore: passive.split( ',' ),
		} )
		.use( retextIntensify, {
			ignore: intensify.split( ',' ),
		} )
		.use( retextDiacritics, {
			ignore: diacritics.split( ',' ),
		} )
		.use( retextContractions, {
			straight: true,
		} )
		.use( retextPos )
		.use( retextSpell, {
			dictionary: callback => callback( null, { aff, dic } ),
			ignore: spell.split( ',' ),
		} )
		.use( () => ( tree ) => tree );
}

function core( value, processor, options = {} ) {
	const nodes = [];
	const file = new VFile( value );
	const tree = processor.use( filter, options ).parse( file );

	processor.runSync( tree, file );

	visit( tree, 'WordNode', ( node ) => {
		const {
			data: { partOfSpeech },
			children: [
				{
					value,
					position: {
						end: { offset },
						start: { offset: index },
					},
				},
			],
		} = node;

		const isNodeProcessed = nodes.find( ( node ) => {
			return (
				node.value === value &&
				node.index === index &&
				node.offset === offset
			);
		} );

		if ( ! isNodeProcessed ) {
			const syntaxType = getPartOfSpeech( partOfSpeech );

			if ( SYNTAX_TYPES.includes( syntaxType ) ) {
				nodes.push( {
					type: syntaxType,
					value,
					index,
					offset,
				} );
			}
		}
	} );

	sort( file );

	return {
		nodes,
		tree: file,
	};
}

function filter( options = {} ) {
	if ( options.allow && options.deny ) {
		throw new Error(
			'Do not provide both allow and deny configuration parameters'
		);
	}

	return remarkMessageControl( {
		name: 'alex',
		reset: Boolean( options.deny ),
		enable: options.deny,
		disable: options.allow,
		source: [ 'retext-equality', 'retext-profanities' ],
	} );
}
