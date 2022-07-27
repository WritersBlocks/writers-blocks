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

let _content = '';

const scheduleReadingScoreUpdate = debounce((content) => {
	dispatch(store).updateReadability(readingScore(content));
}, 500);

domReady(() => {
	subscribe(
		debounce(() => {
			const content = select('core/editor').getEditedPostContent();
			const isTyping = select('core/block-editor').isTyping();
			const strippedContent =
				typeof content === 'string'
					? content.replace(/<!--(.*?)-->/g, '')
					: '';

			if (isTyping || !strippedContent || strippedContent === _content) {
				return;
			}

			scheduleReadingScoreUpdate(strippedContent);

			_content = strippedContent;
		}, 500)
	);
});
