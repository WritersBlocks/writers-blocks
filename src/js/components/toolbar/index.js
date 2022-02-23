/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar as BlockToolbar, ToolbarGroup } from '@wordpress/components';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
// import { SearchToolbarButton } from './Search';
// import { BlurToolbarButton } from './Blur';
import { EditToolbarButton } from './Edit';

export const Toolbar = (props) => {
    const {
        // blockProblems,
        setAttributes,
        attributes: {
            isHighlighted,
            // isBlurred,
        },
    } = props;

    return (
        <BlockToolbar>
            <ToolbarGroup>
                <EditToolbarButton setAttributes={setAttributes} isHighlighted={isHighlighted} />
                {/* <BlurToolbarButton setAttributes={setAttributes} isBlurred={isBlurred} /> */}
                {/* <SearchToolbarButton /> */}
            </ToolbarGroup>
        </BlockToolbar>
    );
};
