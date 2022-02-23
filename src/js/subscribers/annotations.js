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

let _content = '';

const scheduleReadingScoreUpdate = debounce((content) => {
	dispatch(store).updateReadability(readingScore(content));
}, 500);

domReady(() => {
	subscribe( () => {
		const content = select('core/editor').getEditedPostAttribute('content');
		const strippedContent = typeof content === 'string' ? content.replace(/<!--(.*?)-->/g, '') : '';
		const problems = select(store).getProblems();

		if (!strippedContent || (strippedContent === _content && problems.length)) {
			return;
		}

		scheduleReadingScoreUpdate(content);

		if (!isAnnotationAvailable()) {
			return;
		}

		const blocks = select('core/block-editor').getBlocks();

		if (!problems.length && blocks.length) {
			const blockProblems = getAnnotatableText(blocks);
			
			if (blockProblems.length) {
				dispatch(store).addProblems(blockProblems);
				addAnnotations(blockProblems);
			}
		}

		const selectedBlock = select('core/block-editor').getSelectedBlock();

		if (selectedBlock) {
			addBlockToQueue(selectedBlock);
		}

		if (getQueueLength() > 0) {
			scheduleAnnotations();
		}

		_content = strippedContent;
	});
});
