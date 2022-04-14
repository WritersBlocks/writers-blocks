/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { subscribe, select, dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';

/**
 * Internal depenedencies
 */
import { readingScore } from '../utils/reading-score';
import { store } from '../store';
import {
	getQueueLength,
	isAnnotationAvailable,
	addBlockToQueue,
	scheduleAnnotations,
} from '../decorators/gutenberg';
import { ALLOWED_BLOCKS } from '../constants';

let _content = '';

const scheduleReadingScoreUpdate = debounce( ( content ) => {
	dispatch( store ).updateReadability( readingScore( content ) );
}, 500 );

const flattenBlocks = ( blocks ) => {
	return blocks.reduce( ( accumulator, block ) => {
		if ( block.innerBlocks.length ) {
			return [
				...accumulator,
				...flattenBlocks( block.innerBlocks ),
			];
		}

		return [ ...accumulator, block ];
	}, [] );
};

domReady( () => {
	subscribe( debounce( () => {
		const content = select( 'core/editor' ).getEditedPostAttribute(
			'content'
		);
		const isTyping = select( 'core/block-editor' ).isTyping();
		const strippedContent =
			typeof content === 'string'
				? content.replace( /<!--(.*?)-->/g, '' )
				: '';
		const problems = select( store ).getProblems();

		if (
			isTyping ||
			! strippedContent ||
			( strippedContent === _content && problems.length )
		) {
			return;
		}

		scheduleReadingScoreUpdate( content );

		if ( ! isAnnotationAvailable() ) {
			return;
		}

		const blocks = select( 'core/block-editor' ).getBlocks();

		if ( ! problems.length && blocks.length ) {
			const flattenedBlocks = flattenBlocks( blocks );
			const allowedBlocks = flattenedBlocks.filter( ( block ) =>
				ALLOWED_BLOCKS.includes( block.name )
			);

			allowedBlocks.forEach(( block ) => {
				addBlockToQueue( block );
			} );
		}

		const selectedBlock = select( 'core/block-editor' ).getSelectedBlock();

		if ( selectedBlock ) {
			addBlockToQueue( selectedBlock, true );
		}

		if ( getQueueLength() > 0 ) {
			scheduleAnnotations();
		}

		_content = strippedContent;
	}, 100 ) );
} );
