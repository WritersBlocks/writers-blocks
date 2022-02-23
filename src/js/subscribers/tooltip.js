import { subscribe, select } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { Popover } from '@wordpress/components';

const getPopoverPosition = (element) => element.getBoundingClientRect();


const Tooltip = ({ isShown, target }) => {
	return (
		isShown ? (
			<Popover
				position="top center"
				getAnchorRect={() => getPopoverPosition(target)}
			>
				<h1>Hello World</h1>
			</Popover>
		) : null
	);
};

subscribe(() => {

	domReady(() => {
		const editorWrapper = document.querySelector('.edit-post-visual-editor');
		const isTyping = select('core/block-editor').isTyping();

		if (!editorWrapper) {
			return;
		}

		let popoverWrapper = document.getElementById('writers-blocks-popover-wrapper');
		const selectedAnnotation = document.querySelector(
			'.wp-block.is-selected mark[class*="annotation-text-writers-blocks"][data-rich-text-format-boundary="true"]'
		);

		if (!selectedAnnotation && !popoverWrapper) {
			return;
		}

		if (!popoverWrapper) {
			popoverWrapper = document.createElement("div");
			popoverWrapper.id = "writers-blocks-popover-wrapper";

			editorWrapper.prepend(popoverWrapper);
		}

		render(
			<Tooltip
				isShown={!!selectedAnnotation && !isTyping}
				target={selectedAnnotation}
			/>,
			document.getElementById("writers-blocks-popover-wrapper")
		);
	});
});
