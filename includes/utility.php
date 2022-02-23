<?php
/**
 * Utility Functions
 *
 * @package WritersBlocks
 */

namespace WritersBlocks\Utility;

/**
 * Get asset info from extracted asset files
 *
 * @param string $slug Asset slug as defined in build/webpack configuration
 * @param string $attribute Optional attribute to get. Can be version or dependencies
 * @return string|array
 */
function get_asset_info( $slug, $type, $attribute = null ) {
	if ( file_exists( WRITERS_BLOCKS_PATH . 'build/' . $type . '/' . $slug . '.asset.php' ) ) {
		$asset = require WRITERS_BLOCKS_PATH . 'build/' . $type . '/' . $slug . '.asset.php';
	}else {
		return null;
	}

	if ( ! empty( $attribute ) && isset( $asset[ $attribute ] ) ) {
		return $asset[ $attribute ];
	}

	return $asset;
}
