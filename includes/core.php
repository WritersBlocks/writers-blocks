<?php
/**
 * Core plugin functionality
 *
 * @package SyntaxPlugin
 */

namespace SyntaxPlugin\Core;

use SyntaxPlugin\Utility;

/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

    add_action( 'enqueue_block_editor_assets', $n( 'syntax_editor_scripts' ) );
}

/**
 * Registers the Icon Block using the metadata loaded from the `block.json`
 * file. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function syntax_editor_scripts() {
	wp_enqueue_script(
		'syntax',
		SYNTAX_PLUGIN_URL . './build/js/editor.js',
		Utility\get_asset_info( 'editor', 'js', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'js', 'version' ),
		false
	);

	wp_enqueue_style(
		'syntax-style',
		SYNTAX_PLUGIN_URL . './build/css/editor.css',
		Utility\get_asset_info( 'editor', 'css', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'css', 'version' )
	);
}
