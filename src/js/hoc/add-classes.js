import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

import { store } from '../store';

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
		const { name, attributes, clientId } = props;
		const blockProblems = useSelect((select) => {
			return select(store).getBlockProblems(clientId);
		});

		if (!blocksWithContent().includes(name) || !blockProblems?.length) {
			return <BlockListBlock {...props} />;
		}

		const { className, content } = attributes;
		const [ { problems } ] = blockProblems;
		const classes = problems.map((problem) => `has-problems--${problem.type}-${problem.level}`).join(' ');

		return (
			<BlockListBlock {...props} className={`${className || ''} has-problems ${classes}`.trim()}>
				<div className="has-problems__content">
					{content}
				</div>
			</BlockListBlock>
		);
	};
}, 'addClassName');

addFilter(
	'editor.BlockListBlock',
	'writers-blocks/syntax/add-class-name',
	addClassName,
);
