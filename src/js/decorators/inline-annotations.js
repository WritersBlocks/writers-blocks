/**
 * WordPress dependencies
 */
import { select, dispatch } from '@wordpress/data';

// The WP annotations package isn't loaded by default so force loading it.
import '@wordpress/annotations';

/**
 * Internal dependencies
 */
import {
	PROBLEM_TYPES,
	SYNTAX_TYPES,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';

export const removeAnnotations = (annotationType, blockId = null) => {
	// return new Promise( ( resolve, reject ) => {
	const annotations = select('core/annotations')
		.__experimentalGetAnnotations()
		.filter((annotation) =>
			blockId
				? annotation.blockClientId === blockId
				: true &&
				  [...PROBLEM_TYPES, ...SYNTAX_TYPES]
						.map(
							(type) =>
								`writers-blocks--${annotationType}--${type}`
						)
						.includes(annotation.source)
		);

	annotations.forEach(({ id }) => {
		// window.requestAnimationFrame( () => {
		dispatch('core/annotations').__experimentalRemoveAnnotation(id);
		// } );
	});

	// 	resolve();
	// } );
};

export const addAnnotations = (
	blockProblems,
	{ clientId = null, type, ignore = [], options = {} } = {}
) => {
	return new Promise((resolve, reject) => {
		if (clientId) {
			removeAnnotations(type, clientId);
		}

		const annotations = blockProblems.filter(
			(problem) =>
				problem.state !== 'ignored' && !ignore.includes(problem.id)
		);
		const readabilityAnnotations = annotations.filter(
			(problem) => problem.type === 'readability'
		);

		const ANNOTATION_LIST = [
			...readabilityAnnotations,
			...annotations.filter(
				(annotation) =>
					annotation.type &&
					annotation.type !== 'readability' &&
					annotation.type !== 'assuming' &&
					annotation.type !== 'spell'
			),
			...annotations.filter(
				(annotation) =>
					annotation.type && annotation.type === 'assuming'
			),
			...annotations.filter(
				(annotation) => annotation.type && annotation.type === 'spell'
			),
		];

		ANNOTATION_LIST.forEach((annotation, annotationIndex) => {
			const {
				blockId,
				blockName,
				annotationId,
				mode,
				type,
				index,
				offset,
			} = annotation;
			const [name] = type.split('-');

			if (options[name] ? options[name] === true : true) {
				// console.log(dispatch( 'core/annotations' ).__experimentalAddAnnotation);
				// requestAnimationFrame( () => {
				console.log('obj', {
					source: `writers-blocks--${mode}--${type}`,
					blockClientId: blockId,
					richTextIdentifier:
						BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName] || 'content',
					range: {
						start: index,
						end: offset,
					},
					id: annotationId,
				});
				dispatch('core/annotations').__experimentalAddAnnotation({
					source: `writers-blocks--${mode}--${type}`,
					blockClientId: blockId,
					richTextIdentifier:
						BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName] || 'content',
					range: {
						start: index,
						end: offset,
					},
					id: annotationId,
				});
				// } );
			}

			if (annotationIndex === ANNOTATION_LIST.length - 1) {
				resolve();
			}
		});
	});
};
