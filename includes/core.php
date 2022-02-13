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
	add_action( 'rest_api_init', $n( 'rest_api_init' ) );
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

/**
 * Registers the REST API routes for the plugin.
 */
function rest_api_init() {
	// $n = function( $function ) {
	// 	return __NAMESPACE__ . "\\$function";
	// };

	register_rest_route(
		'writers-blocks/v1',
		'word',
		[
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_synonyms_request',
			'permission_callback' => function () {
				return true;
			},
			'args'                => [
				'word' => [
					'validate_callback' => function ( $param ) {
						return ! empty( $param );
					},
					'required'          => true,
				],
			],
		]
	);
}

/**
 * Handles the request to get the words.
 *
 * @param \WP_REST_Request $request Rest request
 * @return array
 */
function handle_synonyms_request( $request ) {
	$word = $request->get_param( 'word' );

	if ( ! $word ) {
		return new \WP_Error( 400 );
	}

	return get_words( $word );
}

function get_words( $word ) {
	$response = wp_remote_get( 'https://wordsapiv1.p.rapidapi.com/words/' . $word, [
		'headers' => [
			'x-rapidapi-host' => 'wordsapiv1.p.rapidapi.com',
			'x-rapidapi-key'  => 'c8ac571d46msh4dd198d38f845bap18af7djsn14a4e4b226fb',
		],
	] );

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$body = wp_remote_retrieve_body( $response );

	return json_decode( $body );
}
