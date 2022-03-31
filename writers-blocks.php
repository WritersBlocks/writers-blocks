<?php
/**
 * Plugin Name:       Writer's Blocks
 * Description:       Writer's Blocks is a suite of tools built for the Gutenberg editor. Write with more power and clarity, cut dead weight, and make your content more accessible, inclusive, and readable.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.0.1
 * Author:            Ryan DiMascio
 * Author URI:        https://usewritersblocks.com
 * Text Domain:       writers-blocks
 *
 * @package           Writer's Blocks
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
function wb_plugin_define( $name, $value ) {
	if ( ! defined( $name ) ) {
		define( $name, $value );
	}
}

// Load main config for the plugin.
require_once __DIR__ . '/config.php';

// Require Composer autoloader if it exists.
if ( file_exists( WRITERS_BLOCKS_PATH . 'vendor/autoload.php' ) ) {
	require_once WRITERS_BLOCKS_PATH . 'vendor/autoload.php';
}

if ( ! class_exists( 'LEMONSQUEEZY_LICENSE_CHECKER' ) ) {
	require_once WRITERS_BLOCKS_PATH_INC . 'classes/class-lemonsqueezy-license-checker.php';

	$license_checker = new LEMONSQUEEZY_LICENSE_CHECKER( __FILE__ );
}

// Include files.
require_once WRITERS_BLOCKS_PATH_INC . '/core.php';
require_once WRITERS_BLOCKS_PATH_INC . '/utility.php';

// Activation/Deactivation.
register_activation_hook( __FILE__, '\WritersBlocks\Core\activate' );
register_deactivation_hook( __FILE__, '\WritersBlocks\Core\deactivate' );

// Bootstrap.
WritersBlocks\Core\setup();
