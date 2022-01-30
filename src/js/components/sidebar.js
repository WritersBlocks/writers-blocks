import { __ } from '@wordpress/i18n';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { useDispatch, useSelect, withSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import check from '../checks';
import { readingScore } from '../utils/reading-score';

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

const AccessPanel = ({ contentBlocks }) => {
	const [ problems, setProblems ] = useState([]);
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const content = useSelect( (select) =>
		select('core/editor').getEditedPostAttribute('content')
	);
	
	useEffect( () => {
		const blockData = contentBlocks.map((block) => ({
			...block,
			...(block?.attributes?.content?.length ? {
				warnings: check(block.attributes.content),
			} : {}),
		}));

		const problems = blockData.filter((block) => {
			return block?.warnings?.length;
		});

		setProblems(problems);
	}, [ contentBlocks ]);

	console.log(problems);
	console.log(readingScore(content));

	useEffect( () => {
		problems.forEach((block) => {
			const { attributes: { className }, clientId, warnings } = block;
			const classes = warnings.map((warning) => `has-problems--${warning.type}-${warning.level}`).join(' ');
	
			if (!className || !className.includes('has-problems')) {
				updateBlockAttributes(clientId, {
					className: `has-problems ${classes}`,
				});
			}
		});
	}, [ problems ]);
	
	return (
		<>
			<PluginSidebarMoreMenuItem target="syntax-highlighter" icon="text">
				{__('Syntax Highlighter', 'syntax')}
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="syntax-highlighter"
				icon="text"
				title={__('Syntax Highlighter', 'syntax')}
			>
				<div
					className="syntax-highlighter__readability components-panel__body is-opened"
					id="syntax-highlighter_readability"
				>

				</div>
				<div
					className="syntax-highlighter__problems components-panel__body is-opened"
					id="syntax-highlighter_problems"
				>

				</div>
			</PluginSidebar>
		</>
	);
};

/**
 * Register Access Panel Plugin
 */
registerPlugin('syntax-highlighter', {
	render: withSelect((select) => {
		const { getBlocks } = select('core/block-editor');

		return {
			contentBlocks: getBlocks().filter((block) => ALLOWED_BLOCKS.includes(block.name)),
		};
	})(AccessPanel),
});
