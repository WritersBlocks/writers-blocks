import { registerFormatType } from '@wordpress/rich-text';

registerFormatType('writers-blocks/syntax', {
	title: 'Syntax Highlighter',
	tagName: 'syntax',
	className: null,
});
