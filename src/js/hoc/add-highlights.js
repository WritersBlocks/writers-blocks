import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, dispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { useCallback, useEffect } from '@wordpress/element';

import { store } from '../store';
import { debounce } from 'lodash';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/quote',
	'core/pullquote',
	'core/verse',
	'core/media-text',
	'core/preformatted',
];

const TYPES = [
	'simpler',
	'adverbs',
	'hedges',
	'weasel',
	'passive',
	'readability-hard',
	'readability-very-hard',
	'so',
];

/**
 * Apply spacing attributes to all allowed top-level blocks
 *
 * @return {Array} - A list of blocks that allow spacing.
 */
const blocksWithContent = () => {
	const blocks = useSelect((select) => select('core/blocks').getBlockTypes());

	const contentBlocks = blocks.filter((block) => {
		return ALLOWED_BLOCKS.includes(block.name);
	});

	return contentBlocks.map((a) => a.name);
};

/**
 * Add the vertical spacing class to the wrapping block element
 */
const addClassName = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name, attributes, clientId, isSelected } = props;
		const blockProblems = useSelect((select) => {
			return select(store).getBlockProblems(clientId);
		});

		const addHighlights = useCallback( debounce((blockProblems) => {

			TYPES.forEach((type) => {
				dispatch( "core/annotations" ).__experimentalRemoveAnnotationsBySource( `writers-blocks--${type}` );
			});

			blockProblems.forEach(({ blockId, blockName, problems }) => {
				problems.forEach(({ type, index, offset }) => {
					dispatch('core/annotations').__experimentalAddAnnotation({
						source: `writers-blocks--${type}`,
						blockClientId: blockId,
						richTextIdentifier: blockName === 'core/list' ? 'values' : 'content',
						range: {
							start: index,
							end: offset,
						},
					});
				});
			});
		}, 250), []);

		useEffect(() => {
			if (isSelected) {
				addHighlights(blockProblems);
			}
		}, [blockProblems, isSelected]);

		if (!blocksWithContent().includes(name) || !blockProblems?.length) {
			return <BlockListBlock {...props} />;
		}

		return <BlockListBlock {...props} />;
	};
}, 'addClassName');

addFilter(
	'editor.BlockListBlock',
	'writers-blocks/syntax/add-class-name',
	addClassName,
);
