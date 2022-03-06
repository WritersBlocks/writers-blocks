import { subscribe, select } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

import { isAnnotationAvailable } from '../decorators/gutenberg';
import { EditorToolbarButton } from '../components/editor-toolbar-button';

// domReady(() => {
// 	subscribe( () => {
// 		const toolbar = document.querySelector('.edit-post-header-toolbar__left');
//         const toolbarButton = document.querySelector('#writers-blocks-toolbar-button');

// 		if (!isAnnotationAvailable() || !toolbar || toolbarButton) {
// 			return;
// 		}

//         const { writers_blocks } = select('core').getEntityRecord('root', 'site') || {};
//         const { editing_mode } = writers_blocks || DEFAULT_SETTINGS;

//         toolbar.appendChild(placeholder);

//         render(
// <ToolbarButton
//     className={ classnames( 'components-toolbar__control', { 'is-pressed': editing_mode } ) }
//     id="writers-blocks-toolbar-button"
//     icon='edit'
//     label='Edit'
//     onClick={ () => {
//         dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
//             writers_blocks: {
//                 ...writers_blocks,
//                 editing_mode: editing_mode === "1" ? "0" : "1",
//             }
//         } ).then(({ writers_blocks }) => {
//             console.log(writers_blocks);
//         });
//     } }
// />,
//             placeholder
//         );
//     });
// });

subscribe( () => {
	const quickpostbutton = document.querySelector(
		'#createwithrani-quick-post-button-wrapper'
	);

	// If the Quick Post Button already exists, skip render
	if ( quickpostbutton || ! isAnnotationAvailable() ) {
		return;
	}

	domReady( () => {
		const editorToolbar = document.querySelector(
			'.edit-post-header-toolbar__left'
		);

		// If toolbar doesn't exist, we can't continue
		if ( ! editorToolbar ) {
			return;
		}

		const buttonWrapper = document.createElement( 'div' );
		buttonWrapper.id = 'createwithrani-quick-post-button-wrapper';
		buttonWrapper.style.cssText = 'display:flex;';

		editorToolbar.appendChild( buttonWrapper );

		render(
			<EditorToolbarButton />,
			document.getElementById(
				'createwithrani-quick-post-button-wrapper'
			)
		);
	} );
} );
