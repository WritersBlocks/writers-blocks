import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton } from '@wordpress/components';
import { useSelect, select } from '@wordpress/data';

import { removeAnnotations, addAnnotations } from '../../decorators/gutenberg';

export const EditToolbarButton = ({ setAttributes, isHighlighted }) => {
    const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock());

    return (
        <ToolbarButton
            className={ classnames( 'components-toolbar__control', { 'is-pressed': isHighlighted } ) }
            label={ __( isHighlighted ? 'Turn off editing mode' : 'Turn on editing mode', 'writers-blocks' ) }
            icon="edit"
            onClick={ () => {
                setAttributes({ isHighlighted: !isHighlighted });
                
                if (isHighlighted) {
                    removeAnnotations(selectedBlock.clientId);
                } else {
                    const blockProblems = select('writers-blocks/editor').getBlockProblems(selectedBlock.clientId);
                    addAnnotations(blockProblems, { clientId: selectedBlock.clientId });
                }
            } }
        />
    );
};
