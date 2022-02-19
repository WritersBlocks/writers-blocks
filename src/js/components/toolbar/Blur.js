import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar, IconButton } from '@wordpress/components';

export const BlurToolbarButton = ({ setAttributes, isBlurred }) => {
    return (
        <Toolbar>
            <IconButton
                className={ classnames( 'components-toolbar__control', { 'is-pressed': isBlurred } ) }
                label={ __( isBlurred ? 'Deblur text' : 'Blur text', 'writers-blocks' ) }
                icon="hidden"
                onClick={ () => {
                    setAttributes({ isBlurred: !isBlurred });
                } }
                data-toolbar-item
            />
        </Toolbar>
    );
};
