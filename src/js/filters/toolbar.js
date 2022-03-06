/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ALLOWED_BLOCKS } from '../constants';
import { store as problemStore } from '../store';

import { Toolbar } from '../components/toolbar';

const addToolbar = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { clientId, name, isSelected } = props;

		if ( ! ALLOWED_BLOCKS.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const blockProblems = select( problemStore ).getBlockProblems(
			clientId
		);

		if ( ! isSelected ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<BlockControls>
					<Toolbar { ...props } blockProblems={ blockProblems } />
				</BlockControls>
			</Fragment>
		);
	};
}, 'addToolbar' );

addFilter(
	'editor.BlockEdit',
	'writers-blocks/border-filter/add-toolbar',
	addToolbar
);
