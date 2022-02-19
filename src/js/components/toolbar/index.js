/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SearchToolbarButton } from './Search';
import { BlurToolbarButton } from './Blur';
import { EditToolbarButton } from './Edit';

export const Toolbar = (props) => {
    const {
        blockProblems,
        setAttributes,
        attributes: {
            isHighlighted,
            isBlurred,
        },
    } = props;

    return (
        <ToolbarGroup>
            <EditToolbarButton setAttributes={setAttributes} isHighlighted={isHighlighted} problems={blockProblems} />
            <BlurToolbarButton setAttributes={setAttributes} isBlurred={isBlurred} problems={blockProblems} />
            <SearchToolbarButton />
        </ToolbarGroup>
    );
};
