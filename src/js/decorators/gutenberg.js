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
// import parse from '../parsers';
import { store } from '../store';
import {
	ALLOWED_BLOCKS,
	SYNTAX_TYPES,
	PROBLEM_TYPES,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';
import { Parser } from '../workers/parser';
import { tokenize } from '../utils/tokenizer';
import { strip } from '../utils/strip-text';

const {
	WB_SETTINGS: { settings: DEFAULT_SETTINGS },
} = window;

let isUpdatingProblems = false;
let queue = [];

export const removeAnnotations = ( annotationType, blockId = null ) => {
	// return new Promise( ( resolve, reject ) => {
		const annotations = select( 'core/annotations' )
			.__experimentalGetAnnotations()
			.filter( ( annotation ) =>
				blockId
					? annotation.blockClientId === blockId
					: true &&
					[ ...PROBLEM_TYPES, ...SYNTAX_TYPES ]
							.map(
								( type ) =>
									`writers-blocks--${ annotationType }--${ type }`
							)
							.includes( annotation.source )
			);

		annotations.forEach( ( { id } ) => {
			// window.requestAnimationFrame( () => {
				// setInterval( () => {
					dispatch( 'core/annotations' ).__experimentalRemoveAnnotation( id );
				// }, 100 );
			// } );
		} );

	// 	resolve();
	// } );
};

export const addAnnotations = (
	blockProblems = [],
	{ clientId = null, type = 'style', ignore = [], options = DEFAULT_SETTINGS } = {},
) => {
	// return new Promise( ( resolve, reject ) => {
		if ( clientId ) {
			removeAnnotations( type, clientId );
		}
	
		const annotations = blockProblems.filter(
			( problem ) =>
				problem.state !== 'ignored' && ! ignore.includes( problem.id )
		);
		const readabilityAnnotations = annotations.filter(
			( problem ) => problem.type === 'readability'
		);

		const ANNOTATION_LIST = [
			...readabilityAnnotations,
			...annotations.filter(
				( annotation ) =>
					annotation.type &&
					annotation.type !== 'readability' &&
					annotation.type !== 'assuming' &&
					annotation.type !== 'spell'
			),
			...annotations.filter(
				( annotation ) =>
					annotation.type &&
					annotation.type === 'assuming'
			),
			...annotations.filter(
				( annotation ) =>
					annotation.type &&
					annotation.type === 'spell'
			),
		];

		ANNOTATION_LIST.forEach( ( annotation, index ) => {
			const {
				blockId,
				blockName,
				annotationId,
				mode,
				type,
				index: start,
				offset: end,
			} = annotation;
			const [ name ] = type.split( '-' );
	
			if ( options[ name ] ) {
				window.requestIdleCallback( () => {
					dispatch( 'core/annotations' ).__experimentalAddAnnotation( {
						source: `writers-blocks--${ mode }--${ type }`,
						blockClientId: blockId,
						richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[ blockName ] || 'content',
						range: {
							start,
							end,
						},
						id: annotationId,
					} );
				} );
			}
		} );
	// } );
};

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

export const addBlockToQueue = ( block, unshift ) => {
	if ( block ) {
		// remove all scheduled annotations for this block
		queue = queue.filter( ( queuedBlock ) => block.clientId !== queuedBlock.clientId );

		if ( unshift ) {
			queue.unshift( block );
		} else {
			queue.push( block );
		}
	}
};

export const parseBlockText = async ( text = '', { preserveWhiteSpace = true, offset = 0 } ) => {
	if ( ! text ) {
		return {
			nodes: [],
			messages: [],
		};
	}

	const {
		writers_blocks,
	} = select( 'core' ).getEntityRecord( 'root', 'site' ) ?? {
		writers_blocks: DEFAULT_SETTINGS.demo !== true ? DEFAULT_SETTINGS : JSON.parse( window.localStorage.getItem( 'writers_blocks' ) ),
	};
	const {
		dictionary = '',
		ignored_passive: ignoredPassive = '',
		ignored_equality: ignoredEquality = '',
		ignored_spell: ignoredSpell = '',
		ignored_profanities: ignoredProfanities = '',
		ignored_simplify: ignoredSimplify = '',
		ignored_diacritics: ignoredDiacritics = '',
		ignored_intensify: ignoredIntensify = '',
		ignored_assuming: ignoredAssuming = '',
		ignored_cliche: ignoredCliche = '',
	} = writers_blocks;

	return Parser.parse( text, {
		offset,
		preserveWhiteSpace,
		dictionary,
		ignored: {
			passive: ignoredPassive,
			equality: ignoredEquality,
			spell: ignoredSpell,
			profanities: ignoredProfanities,
			simplify: ignoredSimplify,
			diacritics: ignoredDiacritics,
			intensify: ignoredIntensify,
			assuming: ignoredAssuming,
			cliche: ignoredCliche,
		},
	} );
};

export const formatAnnotation = (
	{ clientId, name, attributes },
	annotation,
	mode = 'style',
) => ( {
	annotationId: uuid(),
	mode,
	blockId: clientId,
	blockName: name,
	blockAttributes: attributes,
	...annotation,
} );

export const getAnnotatableTextFromBlock = async ( block ) => {
	const {
		name: blockName,
		attributes: blockAttributes,
		blockId,
	} = block;

	const id = uuid();
	const isAllowed = ALLOWED_BLOCKS.includes( blockName );
	const attribute = BLOCK_TYPE_CONTENT_ATTRIBUTE[ blockName ] || 'content';

	if ( ! isAllowed ) {
		return {
			nodes: [],
			problems: [],
		};
	}

	console.log(
		`${ blockName } start`
	)
	window.performance.mark( `${ blockName }-${id}-start` );

	const { nodes, messages: problems } = await parseBlockText( blockAttributes[ attribute ], {
		preserveWhiteSpace: blockName !== 'core/list',
	} );

	window.performance.mark( `${ blockName }-${id}-end` );
	window.performance.measure( `${ blockName }-${id}-time`, `${ blockName }-${id}-start`, `${ blockName }-${id}-end` );
	console.log(
		`${ blockName }: ${ window.performance.getEntriesByName( `${ blockName }-${id}-time` )[ 0 ].duration }ms`,
	)

	return {
		nodes: nodes.map( ( node ) => formatAnnotation( block, node, 'syntax' ) ),
		problems: problems.map( ( problem ) => formatAnnotation( block, problem ) ),
	};
};

export const getAnnotatableText = ( blocks ) => {
	const allowedBlocks = blocks.filter( ( block ) =>
		ALLOWED_BLOCKS.includes( block.name )
	);
	const { nodes, problems } = allowedBlocks.reduce(
		async ( acc, block ) => {
			const {
				nodes: blockNodes,
				problems: blockProblems,
			} = await getAnnotatableTextFromBlock( block );
			acc.nodes = [ ...acc.nodes, ...blockNodes ];
			acc.problems = [ ...acc.problems, ...blockProblems ];

			return acc;
		},
		{ nodes: [], problems: [] }
	);

	return {
		nodes,
		problems,
	};
};

export const scheduleAnnotations = debounce( async () => {
	if ( isUpdatingProblems ) {
		return;
	}

	isUpdatingProblems = true;
	const block = queue.shift();

	if ( ! block ) {
		isUpdatingProblems = false;
		return;
	}

	const {
		problems: blockProblems,
		nodes: blockNodes,
	} = await getAnnotatableTextFromBlock( block );
	const { clientId } = block;

	if ( blockProblems.length ) {
		const problems = select( store ).getProblems();
		const nodes = select( store ).getWords();
		const filteredProblems = problems.filter( ( problem ) => problem.blockId !== clientId );
		const filteredNodes = nodes.filter( ( node ) => node.blockId !== clientId );

		dispatch( store ).addProblems( [
			...filteredProblems,
			...filteredNodes,
			...blockProblems,
			...blockNodes,
		] );
	}

	const {
		writers_blocks,
	} = select( 'core' ).getEntityRecord( 'root', 'site' ) ?? {
		writers_blocks: DEFAULT_SETTINGS,
	};

	const {
		mode: writingMode = DEFAULT_SETTINGS.demo === true ? 'editing' : 'writing',
	} = writers_blocks;

	if ( writingMode === 'syntax' || writingMode === 'editing' || DEFAULT_SETTINGS.demo === true ) {
		addAnnotations(
			writingMode === 'editing' || DEFAULT_SETTINGS.demo === true
				? blockProblems
				: blockNodes,
			{
				clientId,
				type: writingMode === 'editing' || DEFAULT_SETTINGS.demo === true
					? 'style'
					: 'syntax',
			}
		);
	}

	isUpdatingProblems = false;

	if ( queue.length ) {
		scheduleAnnotations();
	}
}, 500 );
