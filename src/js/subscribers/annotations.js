/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { subscribe, select } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';

/**
 * Internal depenedencies
 */
import { store } from '../store';
import {
	getQueueLength,
	isAnnotationAvailable,
	addBlockToQueue,
	scheduleAnnotations,
} from '../decorators/gutenberg';
import { ALLOWED_BLOCKS, BLOCK_TYPE_CONTENT_ATTRIBUTE } from '../constants';

let _blocks = {};

const {
	WRITERS_BLOCKS: { settings: DEFAULT_SETTINGS },
} = window;

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

const isBlockAllowed = ( block ) => ALLOWED_BLOCKS.includes( block.name );

const getBlockContent = ( block ) => block.attributes[ BLOCK_TYPE_CONTENT_ATTRIBUTE[ block.name ] ?? 'content' ] ?? '';

const hasContentChanged = ( blockContent ) => JSON.stringify( blockContent ) !== JSON.stringify( _blocks );

domReady( () => {
	subscribe( debounce( () => {
		if ( ! isAnnotationAvailable() ) {
			return;
		}

		const isTyping = select( 'core/block-editor' ).isTyping();

		if ( isTyping ) {
			return;
		}

		const blocks = select( 'core/block-editor' ).getBlocks();
		const problems = select( store ).getProblems();
		const blockContent = flattenBlocks( blocks ).filter( isBlockAllowed ).reduce( ( accumulator, block ) => {
			accumulator[ block.clientId ] = getBlockContent( block );
			return accumulator;
		}, {} );

		if (
			! blocks.length ||
			( ! hasContentChanged( blockContent ) && problems.length )
		) {
			return;
		}

		// If there's a selected block being edited, push it to the top of the queue.
		const selectedBlock = select( 'core/block-editor' ).getSelectedBlock();
		if ( selectedBlock ) {
			const selectedBlockContent = getBlockContent( selectedBlock );
			if ( ! _blocks[ selectedBlock.clientId ] || selectedBlockContent !== _blocks[ selectedBlock.clientId ] ) {
				addBlockToQueue( selectedBlock, true );

				_blocks[ selectedBlock.clientId ] = selectedBlockContent;
			}
		}

		Object.keys( blockContent ).forEach(( blockId ) => {
			if (
				! Object.prototype.hasOwnProperty.call( _blocks, blockId ) ||
				_blocks[ blockId ] !== blockContent[ blockId ]
			) {
				addBlockToQueue( select( 'core/block-editor' ).getBlock( blockId ) );
				_blocks[ blockId ] = blockContent[ blockId ];
			}
		} );

		if ( getQueueLength() > 0 ) {
			scheduleAnnotations();
		}
	}, 250 ) );
} );
