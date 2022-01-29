<?php
/**
 * Plugin Name:       Syntax
 * Description:       Check your reading score and grammar.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.0.1
 * Author:            Ryan DiMascio
 * Author URI:        https://writersblocks.xyz
 * Text Domain:       syntax
 *
 * @package           The Icon Block
 */

/**
 * Small wrapper around PHP's define function.
 * The defined constant is ignored if it has already been defined.
 * This allows the wp-config.php and/or config.local.php to override any constant in the plugin's config.php.
 *
 * @param string $name The constant name
 * @param mixed  $value The constant value
 *
 * @return void
 */
function syntax_plugin_define( $name, $value ) {
	if ( ! defined( $name ) ) {
		define( $name, $value );
	}
}

// Load main config for the plugin.
require_once __DIR__ . '/config.php';

// Require Composer autoloader if it exists.
if ( file_exists( SYNTAX_PLUGIN_PATH . 'vendor/autoload.php' ) ) {
	require_once SYNTAX_PLUGIN_PATH . 'vendor/autoload.php';
}

// Include files.
require_once SYNTAX_PLUGIN_PATH_INC . '/core.php';
require_once SYNTAX_PLUGIN_PATH_INC . '/utility.php';

// Bootstrap.
SyntaxPlugin\Core\setup();
