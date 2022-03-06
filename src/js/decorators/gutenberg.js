/**
 * External dependencies
 */
import { v4 as uuid } from 'uuid';
import { select, dispatch } from '@wordpress/data';
import { debounce } from 'lodash';

// The WP annotations package isn't loaded by default so force loading it.
import '@wordpress/annotations';

/**
 * Internal depenedencies
 */
import check from '../parsers';
import { store } from '../store';
import {
	PROBLEM_TYPES,
	ALLOWED_BLOCKS,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';

const {
	WB_SETTINGS: { settings: SHOWN_ANNOTATION_TYPES },
	btoa,
} = window;

let isUpdatingProblems = false;
let queue = [];

export function isAnnotationAvailable() {
	return (
		select( 'core/block-editor' ) &&
		typeof select( 'core/block-editor' ).getBlocks === 'function' &&
		select( 'core/annotations' ) &&
		typeof dispatch( 'core/annotations' ).__experimentalAddAnnotation ===
			'function'
	);
}

export const getQueueLength = () => queue.length;

export const addBlockToQueue = ( block ) => {
	if ( block ) {
		queue = [
			// remove all scheduled annotations for this block
			...queue.filter( ( block ) => block.clientId !== block.clientId ),
			block,
		];
	}
};

export const getAnnotatableTextFromBlock = ( block ) => {
	const {
		clientId: blockId,
		name: blockName,
		attributes: blockAttributes,
	} = block;

	const isAllowed = ALLOWED_BLOCKS.includes( blockName );
	const attribute = BLOCK_TYPE_CONTENT_ATTRIBUTE[ blockName ];

	if ( ! isAllowed ) {
		return [];
	}

	const problems = check( blockAttributes[ attribute ], {
		preserveWhiteSpace: blockName !== 'core/list',
	} );

	if ( ! problems.length ) {
		return [];
	}

	return problems.map( ( problem ) => ( {
		blockId,
		blockName,
		blockAttributes,
		annotationId: uuid(),
		id: btoa(
			`${ problem.type }_${ problem.index }_${ problem.offset }_${ problem.value }`
		),
		...problem,
	} ) );
};

export const removeAnnotations = ( blockId = null ) => {
	const annotations = select( 'core/annotations' )
		.__experimentalGetAnnotations()
		.filter( ( annotation ) =>
			blockId
				? annotation.blockClientId === blockId
				: true &&
				  PROBLEM_TYPES.map(
						( type ) => `writers-blocks--${ type }`
				  ).includes( annotation.source )
		);

	annotations.forEach( ( annotation ) => {
		dispatch( 'core/annotations' ).__experimentalRemoveAnnotation(
			annotation.id
		);
	} );
};

export const getAnnotatableText = ( blocks ) => {
	const allowedBlocks = blocks.filter( ( block ) =>
		ALLOWED_BLOCKS.includes( block.name )
	);

	return allowedBlocks.flatMap( getAnnotatableTextFromBlock );
};

export const addAnnotations = (
	blockProblems,
	{ clientId = null, ignore = [] } = {}
) => {
	if ( clientId ) {
		removeAnnotations( clientId );
	}

	const annotations = blockProblems.filter(
		( problem ) =>
			problem.state !== 'ignored' && ! ignore.includes( problem.id )
	);
	const readabilityAnnotations = annotations.filter( ( problem ) =>
		problem.type.includes( 'readability' )
	);

	readabilityAnnotations.forEach( ( annotation ) => {
		const {
			blockId,
			blockName,
			annotationId,
			type,
			index,
			offset,
		} = annotation;
		const [ name ] = type.split( '-' );

		if (
			SHOWN_ANNOTATION_TYPES[ name ]
				? SHOWN_ANNOTATION_TYPES[ name ] === '1'
				: true
		) {
			dispatch( 'core/annotations' ).__experimentalAddAnnotation( {
				source: `writers-blocks--${ type }`,
				blockClientId: blockId,
				richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[ blockName ],
				range: {
					start: index,
					end: offset,
				},
				id: annotationId,
			} );
		}
	} );

	annotations
		.filter( ( annotation ) => ! annotation.type.includes( 'readability' ) )
		.forEach( ( annotation ) => {
			const {
				blockId,
				blockName,
				annotationId,
				type,
				index,
				offset,
			} = annotation;
			const [ name ] = type.split( '-' );

			if (
				SHOWN_ANNOTATION_TYPES[ name ]
					? SHOWN_ANNOTATION_TYPES[ name ] === '1'
					: true
			) {
				dispatch( 'core/annotations' ).__experimentalAddAnnotation( {
					source: `writers-blocks--${ type }`,
					blockClientId: blockId,
					richTextIdentifier:
						BLOCK_TYPE_CONTENT_ATTRIBUTE[ blockName ],
					range: {
						start: index,
						end: offset,
					},
					id: annotationId,
				} );
			}
		} );
};

export const scheduleAnnotations = debounce( () => {
	if ( isUpdatingProblems ) {
		return;
	}

	isUpdatingProblems = true;
	const block = queue.shift();

	if ( ! block ) {
		isUpdatingProblems = false;
		return;
	}

	const blockProblems = getAnnotatableTextFromBlock( block );

	if ( blockProblems.length ) {
		const { clientId } = block;
		const problems = select( store ).getProblems();

		dispatch( store ).addProblems( [
			...problems.filter( ( problem ) => problem.blockId !== clientId ),
			...blockProblems,
		] );

		addAnnotations( blockProblems, { clientId } );
	}

	isUpdatingProblems = false;

	if ( queue.length ) {
		scheduleAnnotations();
	}
}, 500 );
