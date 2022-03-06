/**
 * External dependencies
 */
import classnames from 'classnames';

import { useSelect, dispatch, select } from '@wordpress/data';
import { ToolbarButton } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { removeAnnotations, addAnnotations } from '../decorators/gutenberg';

const {
	WB_SETTINGS: { settings: DEFAULT_SETTINGS },
} = window;

export const EditorToolbarButton = ( props ) => {
	const [ settings, setSettings ] = useState( DEFAULT_SETTINGS );

	const siteSettings = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecord( 'root', 'site' );
	}, [] );

	useEffect( () => {
		if ( siteSettings ) {
			const { writers_blocks: settings } = siteSettings;
			setSettings( settings );
		}
	}, [ siteSettings ] );

	return (
		<ToolbarButton
			className={ classnames( 'components-toolbar__control', {
				'is-pressed': settings.editing_mode === '1',
			} ) }
			id="writers-blocks-toolbar-button"
			icon="edit"
			label="Edit"
			onClick={ () => {
				dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
					writers_blocks: {
						...settings,
						editing_mode: settings.editing_mode === '1' ? '0' : '1',
					},
				} );

				if ( settings.editing_mode === '1' ) {
					removeAnnotations();
				} else {
					const blockProblems = select(
						'writers-blocks/editor'
					).getProblems();
					addAnnotations( blockProblems );
				}
			} }
		/>
	);
};
