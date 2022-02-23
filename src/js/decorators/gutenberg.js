import { select, dispatch } from '@wordpress/data';
import { debounce } from 'lodash';

// The WP annotations package isn't loaded by default so force loading it.
import "@wordpress/annotations";

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

const { WB_SETTINGS: { settings: SHOWN_ANNOTATION_TYPES }, btoa } = window;

let isUpdatingProblems = false;
let queue = [];

export function isAnnotationAvailable() {
	return select( "core/block-editor" ) && typeof select( "core/block-editor" ).getBlocks === 'function' &&
		select( "core/annotations" ) && typeof dispatch( "core/annotations" ).__experimentalAddAnnotation === 'function';
}

export const getQueueLength = () => queue.length;

export const addBlockToQueue = (block) => {
    if (block) {
        queue = [
            // remove all scheduled annotations for this block
            ...queue.filter( (block) => block.clientId !== block.clientId ),
            block,
        ];
    }
};

export const getAnnotatableTextFromBlock = (block) => {
    const { clientId: blockId, name: blockName, attributes: blockAttributes } = block;

    const isAllowed = ALLOWED_BLOCKS.includes(blockName);
    const attribute = BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName];

    if (!isAllowed) {
        return [];
    }
	
	const problems = check(
		blockAttributes[attribute],
		{
			preserveWhiteSpace: blockName !== 'core/list',
		}
	);

    if (!problems.length) {
        return [];
    }

    return problems.map((problem) => ({
        blockId,
        blockName,
		blockAttributes,
        ...problem,
    }));
};

export const removeAnnotations = (blockId = null) => {
    const annotations = select('core/annotations')
        .__experimentalGetAnnotations()
        .filter(
            (annotation) =>
                blockId ? annotation.blockClientId === blockId : true &&
                PROBLEM_TYPES.map((type) => `writers-blocks--${type}`).includes(annotation.source)
        );

    annotations.forEach( annotation => {
        dispatch('core/annotations').__experimentalRemoveAnnotation( annotation.id );
    } );
};

export const getAnnotatableText = (blocks) => {
	const allowedBlocks = blocks.filter( (block) => ALLOWED_BLOCKS.includes(block.name) );
	
	return allowedBlocks.flatMap(getAnnotatableTextFromBlock);
};

export const addAnnotations = (blockProblems, { clientId = null } = {}) => {
	if (clientId) {
		removeAnnotations(clientId);
	}

	const problemsWithAnnotations = [];
	const readabilityProblems = blockProblems.filter( (problem) => problem.type.includes('readability') );

	readabilityProblems
		.forEach((problem) => {
			const { blockId, blockName, blockAttributes, type, index, offset } = problem;
			const [name] = type.split('-');

			// const { isHighlighted } = select('core/block-editor').getBlockAttributes(blockId);

			if (
				(SHOWN_ANNOTATION_TYPES[name] ? SHOWN_ANNOTATION_TYPES[name] === '1' : true)
				// (blockAttributes[type] ?? true) &&
				// isHighlighted === true
			) {
				dispatch('core/annotations').__experimentalAddAnnotation({
					source: `writers-blocks--${type}`,
					blockClientId: blockId,
					richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
					range: {
						start: index,
						end: offset,
					},
				}).then( (annotation) => {
					problemsWithAnnotations.push({
						...problem,
						annotationId: annotation.id,
					});
				});
			}
		});

	blockProblems
		.filter( (problem) => ! problem.type.includes('readability') )
		.forEach((problem) => {
			const { blockId, blockName, blockAttributes, type, index, offset } = problem;
			const [name] = type.split('-');

			// const { isHighlighted } = select('core/block-editor').getBlockAttributes(blockId);

			if (
				(SHOWN_ANNOTATION_TYPES[name] ? SHOWN_ANNOTATION_TYPES[name] === '1' : true)
				// (blockAttributes[type] ?? true) &&
				// isHighlighted === true
			) {
				dispatch('core/annotations').__experimentalAddAnnotation({
					source: `writers-blocks--${type}`,
					blockClientId: blockId,
					richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
					range: {
						start: index,
						end: offset,
					},
				}).then( (annotation) => {
					problemsWithAnnotations.push({
						...problem,
						annotationId: annotation.id,
					});
				});;
			}
		});

	return problemsWithAnnotations;
};

export const scheduleAnnotations = debounce(() => {
	if (isUpdatingProblems) {
		return;
	}

	isUpdatingProblems = true;
	const block = queue.shift();

	if (!block) {
		isUpdatingProblems = false;
		return;
	}

	const blockProblems = getAnnotatableTextFromBlock(block);
	
	if (blockProblems.length) {
		const { clientId } = block;
		const problems = select(store).getProblems();

		dispatch(store).addProblems([
			...problems.filter((problem) => problem.blockId !== clientId),
			...blockProblems,
		]);

		const annotations = addAnnotations(blockProblems, { clientId });
		dispatch(store).addAnnotations(annotations);
	}

	isUpdatingProblems = false;

	if (queue.length) {
		scheduleAnnotations();
	}
}, 500);
