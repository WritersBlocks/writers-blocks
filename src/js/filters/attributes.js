/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	ALLOWED_BLOCKS,
	PROBLEM_TYPES_TO_LABEL,
	DEFAULT_STATE,
} from '../constants';

/**
 * Add attributes to blocks
 *
 * @param {Object} settings Default Block Settings
 * @param {string} name     Block Name
 * @return {Object}          Updated settings object
 */
function addAttributes( settings, name ) {
	if ( ! ALLOWED_BLOCKS.includes( name ) ) {
		return settings;
	}

	if ( settings.attributes ) {
		settings.attributes.isHighlighted = {
			type: 'boolean',
			default: DEFAULT_STATE.isHighlighted,
		};

		settings.attributes.isBlurred = {
			type: 'boolean',
			default: DEFAULT_STATE.isBlurred,
		};

		Object.keys( PROBLEM_TYPES_TO_LABEL ).forEach( ( type ) => {
			settings.attributes[ type ] = {
				type: 'boolean',
				default: DEFAULT_STATE[ type ],
			};
		} );
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'writers-blocks/border-filter/add-attributes',
	addAttributes
);
