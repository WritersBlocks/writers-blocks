/**
 * External dependencies
 */
import { debounce } from 'lodash';

import { subscribe, select, dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';

/**
 * Internal depenedencies
 */
import { readingScore } from '../utils/reading-score';
import { store } from '../store';
import {
	getAnnotatableText,
	getQueueLength,
	isAnnotationAvailable,
	addBlockToQueue,
	scheduleAnnotations,
	addAnnotations,
} from '../decorators/gutenberg';

const {
	WB_SETTINGS: { settings },
} = window;

let _content = '';

const scheduleReadingScoreUpdate = debounce( ( content ) => {
	dispatch( store ).updateReadability( readingScore( content ) );
}, 500 );

domReady( () => {
	subscribe( () => {
		const content = select( 'core/editor' ).getEditedPostAttribute(
			'content'
		);
		const { writers_blocks } = select( 'core' ).getEntityRecord(
			'root',
			'site'
		) || { writers_blocks: settings };
		const {
			mode: writingMode,
		} = writers_blocks;
		const strippedContent =
			typeof content === 'string'
				? content.replace( /<!--(.*?)-->/g, '' )
				: '';
		const problems = select( store ).getProblems();

		if (
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
			const {
				problems: blockProblems,
				nodes: blockNodes,
			} = getAnnotatableText( blocks );

			if ( blockProblems.length ) {
				// const ignoredAnnotations = select(
				// 	store
				// ).getIgnoredAnnotations();

				dispatch( store ).addProblems( [
					...blockProblems,
					...blockNodes,
				] );

				if (
					writingMode === 'editing' ||
					writingMode === 'syntax'
				) {
					addAnnotations(
						writingMode === 'editing' ? blockProblems : blockNodes
					);
				}
			}
		}

		const selectedBlock = select( 'core/block-editor' ).getSelectedBlock();

		if ( selectedBlock ) {
			addBlockToQueue( selectedBlock );
		}

		if ( getQueueLength() > 0 ) {
			scheduleAnnotations();
		}

		_content = strippedContent;
	} );
} );
