/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { ALLOWED_BLOCKS } from '../constants';

/**
 * Add the vertical spacing class to the wrapping block element
 */
const addClassName = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes } = props;

		if (!ALLOWED_BLOCKS.includes(name)) {
			return <BlockEdit {...props} />;
		}

		const { className, isBlurred } = attributes;

		return (
			<BlockEdit
				{...props}
				className={`${className || ''}${isBlurred ? 'is-blurred' : ''}`}
			/>
		);
	};
}, 'addClassName');

addFilter(
	'editor.BlockListBlock',
	'writers-blocks/border-filter/add-classname',
	addClassName
);
