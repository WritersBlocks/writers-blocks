import { subscribe, select, dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { debounce } from 'lodash';

// The WP annotations package isn't loaded by default so force loading it.
import "@wordpress/annotations";

/**
 * Internal depenedencies
 */
import check from '../parsers';
import { readingScore } from '../utils/reading-score';
import { store } from '../store';
import {
	PROBLEM_TYPES,
	ALLOWED_BLOCKS,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';

let _content = '';
let isUpdatingProblems = false;

let queue = [];

const getProblemsFromBlock = (block) => {
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

const getProblems = (blocks) => {
	const allowedBlocks = blocks.filter( (block) => ALLOWED_BLOCKS.includes(block.name) );
	
	return allowedBlocks.flatMap(getProblemsFromBlock);
};

const addAnnotations = (blockProblems, { clientId } = {}) => {
	const { suggestionsToShow: SHOWN_ANNOTATION_TYPES = {} } = select('writers-blocks/editor').getUserSettings();

	if (clientId) {
		const annotationsInBlock = select('core/annotations')
			.__experimentalGetAnnotations()
			.filter( annotation => annotation.blockClientId === clientId && PROBLEM_TYPES.map((type) => `writers-blocks--${type}`).includes(annotation.source) );

		annotationsInBlock.forEach( annotation => {
			dispatch('core/annotations').__experimentalRemoveAnnotation( annotation.id );
		} );
	}

	blockProblems.forEach(({ blockId, blockName, blockAttributes, type, index, offset }) => {
		const [name] = type.split('-');

		if ((SHOWN_ANNOTATION_TYPES[name] ?? true) && (blockAttributes[type] ?? true) && blockAttributes.isHighlighted === true) {
			wp.data.dispatch('core/annotations').__experimentalAddAnnotation({
				source: `writers-blocks--${type}`,
				blockClientId: blockId,
				richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
				range: {
					start: index,
					end: offset,
				},
			});
		}
	});
};

const scheduleBlockProblemsUpdate = debounce(() => {
	if (isUpdatingProblems) {
		return;
	}

	isUpdatingProblems = true;
	const block = queue.shift();

	if (!block) {
		isUpdatingProblems = false;
		return;
	}

	const blockProblems = getProblemsFromBlock(block);
	
	if (blockProblems.length) {
		const { clientId } = block;
		const problems = select(store).getProblems();

		dispatch(store).addProblems([
			...problems.filter((problem) => problem.blockId !== clientId),
			...blockProblems,
		]);

		addAnnotations(blockProblems, { clientId });
	}

	isUpdatingProblems = false;

	if (queue.length) {
		scheduleBlockProblemsUpdate();
	}
}, 500);

const scheduleReadingScoreUpdate = debounce((content) => {
	dispatch(store).updateReadability(readingScore(content));
}, 500);

domReady(() => {
	subscribe( () => {
		const content = select('core/editor').getEditedPostAttribute('content');
		const strippedContent = content.replace(/<!--(.*?)-->/g, '');
		const problems = select(store).getProblems();
	
		if (!strippedContent || (strippedContent === _content && problems.length)) {
			return;
		}
	
		const blocks = select('core/block-editor').getBlocks();
	
		if (!problems.length && blocks.length) {
			const blockProblems = getProblems(blocks);
			
			if (blockProblems.length) {
				dispatch(store).addProblems(blockProblems);
				addAnnotations(blockProblems);
			}
		}
	
		const selectedBlock = select('core/block-editor').getSelectedBlock();
	
		if (selectedBlock) {
			queue = queue.filter( (block) => block.clientId !== selectedBlock.clientId );
			queue.push(selectedBlock);
		}
	
		if (queue.length) {
			scheduleBlockProblemsUpdate();
		}
	
		scheduleReadingScoreUpdate(content);
	
		_content = strippedContent;
	});
});
