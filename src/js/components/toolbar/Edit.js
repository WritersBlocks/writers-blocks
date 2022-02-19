import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar, IconButton } from '@wordpress/components';

export const EditToolbarButton = ({ setAttributes, isHighlighted }) => {
    return (
        <Toolbar>
            <IconButton
                className={ classnames( 'components-toolbar__control', { 'is-pressed': isHighlighted } ) }
                label={ __( 'Edit', 'writers-blocks' ) }
                icon="edit"
                onClick={ () => {
                    setAttributes({ isHighlighted: !isHighlighted });
                } }
            />
        </Toolbar>
    );
};
