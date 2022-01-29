<?php
/**
 * Utility Functions
 *
 * @package SyntaxPlugin
 */

namespace SyntaxPlugin\Utility;

/**
 * Get asset info from extracted asset files
 *
 * @param string $slug Asset slug as defined in build/webpack configuration
 * @param string $attribute Optional attribute to get. Can be version or dependencies
 * @return string|array
 */
function get_asset_info( $slug, $attribute = null ) {
	if ( file_exists( SYNTAX_PLUGIN_PATH . 'build/js/' . $slug . '.asset.php' ) ) {
		$asset = require SYNTAX_PLUGIN_PATH . 'build/js/' . $slug . '.asset.php';
	} elseif ( file_exists( SYNTAX_PLUGIN_PATH . 'build/css/' . $slug . '.asset.php' ) ) {
		$asset = require SYNTAX_PLUGIN_PATH . 'build/css/' . $slug . '.asset.php';
	} else {
		return null;
	}

	if ( ! empty( $attribute ) && isset( $asset[ $attribute ] ) ) {
		return $asset[ $attribute ];
	}

	return $asset;
}
