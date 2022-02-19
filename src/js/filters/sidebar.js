/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ALLOWED_BLOCKS } from '../constants';
import { store } from '../store';

import { Sidebar } from '../components/sidebar';

const addSidebar = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const {
            clientId,
            name,
            isSelected,
        } = props;

        if (!ALLOWED_BLOCKS.includes(name)) {
            return <BlockEdit {...props} />;
        }

        const blockProblems = select(store).getBlockProblems(clientId);

        if (!isSelected || !blockProblems.length) {
            return <BlockEdit {...props} />;
        }

        const problems = blockProblems.reduce((acc, problem) => {
            const { type } = problem;
            const [formattedType] = type.split('-');

            if (acc[formattedType]) {
                acc[formattedType].push(problem);
            } else {
                acc[formattedType] = [problem];
            }

            return acc;
        }, {});

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <Sidebar {...props} problems={problems} />
                </InspectorControls>
            </Fragment>
        );
    };
}, 'addSidebar');

addFilter(
    'editor.BlockEdit',
    'writers-blocks/border-filter/add-sidebar',
    addSidebar,
);
