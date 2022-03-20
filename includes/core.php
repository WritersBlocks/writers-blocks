<?php
/**
 * Core plugin functionality
 *
 * @package WritersBlocks
 */

namespace WritersBlocks\Core;

use WritersBlocks\Utility;

/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'init' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );
	add_action( 'enqueue_block_editor_assets', $n( 'editor_scripts' ) );
	add_action( 'rest_api_init', $n( 'rest_api_init' ) );
	add_action( 'rest_api_init', $n( 'register_settings' ) );
}

/**
 * Helper to retrieve a setting.
 *
 * @param string $setting The name of the setting.
 * @return mixed
 */
function get_setting( $setting, $parent = false ) {
	$settings = get_option( 'writers_blocks', [] );

	if ( $parent ) {
		$settings = $settings[ $parent ];
	}

	return isset( $settings[ $setting ] ) ? $settings[ $setting ] : '';
}

/**
 * Register settings for options table
 *
 * @since  1.0
 */
function register_settings() {
	register_setting(
		'writers_blocks',
		'writers_blocks',
		array(
			'show_in_rest'      => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'license_key' => array(
							'type' => 'string',
						),
						'license_verified' => array(
							'type' => 'string',
						),
						'editing_mode' => array(
							'type' => 'string',
						),
						'syntax_mode' => array(
							'type' => 'string',
						),
						'simplify' => array(
							'type' => 'string',
						),
						'intensify' => array(
							'type' => 'string',
						),
						'indefinite_article' => array(
							'type' => 'string',
						),
						'contractions' => array(
							'type' => 'string',
						),
						'repeated_words' => array(
							'type' => 'string',
						),
						'contractions' => array(
							'type' => 'string',
						),
						'redundant_acronyms' => array(
							'type' => 'string',
						),
						'diacritics' => array(
							'type' => 'string',
						),
						'sentence_spacing' => array(
							'type' => 'string',
						),
						'passive' => array(
							'type' => 'string',
						),
						'equality' => array(
							'type' => 'string',
						),
						'profanities' => array(
							'type' => 'string',
						),
						'readability' => array(
							'type' => 'string',
						),
						'nouns' => array(
							'type' => 'string',
						),
						'adjectives' => array(
							'type' => 'string',
						),
						'adverbs' => array(
							'type' => 'string',
						),
						'verbs' => array(
							'type' => 'string',
						),
					),
				),
			),
			'default'      => [],
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_settings',
		)
	);
}

/**
 * Sanitize settings for DB
 *
 * @param array $settings The array of setting to sanitize.
 *
 * @return array
 * @since  1.0
 */
function sanitize_settings( $settings ) {
	$new_settings = [];

	if ( isset( $settings['license_key'] ) ) {
		$new_settings['license_key'] = trim( $settings['license_key'] );
	}

	if ( isset( $settings['license_verified'] ) ) {
		$new_settings['license_verified'] = $settings['license_verified'];
	}

	if ( isset( $settings['editing_mode'] ) ) {
		$new_settings['editing_mode'] = $settings['editing_mode'];
	}

	if ( isset( $settings['syntax_mode'] ) ) {
		$new_settings['syntax_mode'] = $settings['syntax_mode'];
	}

	if ( isset( $settings['simplify'] ) ) {
		$new_settings['simplify'] = $settings['simplify'];
	}

	if ( isset( $settings['intensify'] ) ) {
		$new_settings['intensify'] = $settings['intensify'];
	}

	if ( isset( $settings['passive'] ) ) {
		$new_settings['passive'] = $settings['passive'];
	}

	if ( isset( $settings['indefinite_article'] ) ) {
		$new_settings['indefinite_article'] = $settings['indefinite_article'];
	}

	if ( isset( $settings['contractions'] ) ) {
		$new_settings['contractions'] = $settings['contractions'];
	}

	if ( isset( $settings['repeated_words'] ) ) {
		$new_settings['repeated_words'] = $settings['repeated_words'];
	}

	if ( isset( $settings['redundant_acronyms'] ) ) {
		$new_settings['redundant_acronyms'] = $settings['redundant_acronyms'];
	}

	if ( isset( $settings['equality'] ) ) {
		$new_settings['equality'] = $settings['equality'];
	}

	if ( isset( $settings['profanities'] ) ) {
		$new_settings['profanities'] = $settings['profanities'];
	}

	if ( isset( $settings['diacritics'] ) ) {
		$new_settings['diacritics'] = $settings['diacritics'];
	}

	if ( isset( $settings['sentence_spacing'] ) ) {
		$new_settings['sentence_spacing'] = $settings['sentence_spacing'];
	}

	if ( isset( $settings['readability'] ) ) {
		$new_settings['readability'] = $settings['readability'];
	}

	if ( isset( $settings['nouns'] ) ) {
		$new_settings['nouns'] = $settings['nouns'];
	}
	
	if ( isset( $settings['adverbs'] ) ) {
		$new_settings['adverbs'] = $settings['adverbs'];
	}

	if ( isset( $settings['adjectives'] ) ) {
		$new_settings['adjectives'] = $settings['adjectives'];
	}

	if ( isset( $settings['verbs'] ) ) {
		$new_settings['verbs'] = $settings['verbs'];
	}

	return $new_settings;
}

/**
 * Registers the Icon Block using the metadata loaded from the `block.json`
 * file. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function editor_scripts() {
	wp_enqueue_script(
		'writers-blocks',
		WRITERS_BLOCKS_URL . './build/js/editor.js',
		Utility\get_asset_info( 'editor', 'js', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'js', 'version' ),
		false
	);
	wp_localize_script(
		'writers-blocks',
		'WB_SETTINGS',
		[
			'settings' => get_option( 'writers_blocks', [] ),
		]
	);

	wp_enqueue_style(
		'writers-blocks-style',
		WRITERS_BLOCKS_URL . './build/css/editor.css',
		Utility\get_asset_info( 'editor', 'css', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'css', 'version' )
	);
}

function admin_scripts( $page ) {
	if ( strpos( $page, 'writers-blocks' ) !== false ) {
		wp_enqueue_script(
			'writers-blocks-admin',
			WRITERS_BLOCKS_URL . './build/js/admin.js',
			Utility\get_asset_info( 'admin', 'js', 'dependencies' ),
			Utility\get_asset_info( 'admin', 'js', 'version' ),
			false
		);
		wp_localize_script(
			'writers-blocks-admin',
			'WB_SETTINGS',
			[
				'settings' => get_option( 'writers_blocks', [] ),
			]
		);

		wp_enqueue_style(
			'writers-blocks-admin',
			WRITERS_BLOCKS_URL . './build/css/admin.css',
			Utility\get_asset_info( 'admin', 'css', 'dependencies' ),
			Utility\get_asset_info( 'admin', 'css', 'version' )
		);
	}
}

function init() {
	register_post_meta( 'post', 'wb_ignored', [
		'type' => 'array',
		'single' => true,
		'show_in_rest' => [
			'schema' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
				],
			],
		],
		'auth_callback' => function() {
			return current_user_can( 'edit_posts' );
		}
	] );

	register_post_meta( 'page', 'wb_ignored', [
		'type' => 'array',
		'single' => true,
		'show_in_rest' => [
			'schema' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
				],
			],
		],
		'auth_callback' => function() {
			return current_user_can( 'edit_posts' );
		}
	] );
}

/**
 * Registers the REST API routes for the plugin.
 */
function rest_api_init() {
	register_rest_route(
		'writers-blocks/v1',
		'word',
		[
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\handle_synonyms_request',
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

	register_rest_route(
		'writers-blocks/v1',
		'rewrite',
		[
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\handle_suggestion_request',
			'permission_callback' => function () {
				return true;
			},
			'args'                => [
				'text' => [
					'validate_callback' => function ( $param ) {
						return ! empty( $param );
					},
					'required'          => true,
				],
				'tone' => [
					'required'          => false,
				],
			],
		]
	);

	register_rest_route(
		'writers-blocks/v1',
		'license',
		[
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\handle_verification_request',
			'permission_callback' => function () {
				return true;
			},
			'args'                => [
				'license' => [
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

function handle_suggestion_request( $request ) {
	$text = $request->get_param( 'text' );
	$tone = $request->get_param( 'tone' ) || 'neutral';

	if ( ! $text ) {
		return new \WP_Error( 400 );
	}

	return get_sentence_suggestions( $text, $tone );
}

function get_sentence_suggestions( $text, $tone ) {
	$response = wp_remote_post( 'https://writers-blocks-site.vercel.app/api/rewrite', [
		'method'      => 'POST',
		'body'        => wp_json_encode( [
			'text' => $text,
			'tone' => $tone,
		] ),
		'headers'     => [
			'Content-Type' => 'application/json',
			'Accept'       => 'application/json',
		],
	] );

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$body = wp_remote_retrieve_body( $response );

	return $body;
}

function handle_verification_request( $request ) {
	$settings = get_option( 'writers_blocks', [] );
	$has_license_been_verified = isset( $settings['license_verified'] ) ? $settings['license_verified'] : "0";
	$license = $request->get_param( 'license' ) ?? $settings['license_key'];

	if ( ! $license ) {
		return new \WP_Error( 400 );
	}

	return get_verification_status( $license, $has_license_been_verified );
}

function get_verification_status( $license, $is_verified ) {
	$response = wp_remote_post( 'https://writers-blocks-site.vercel.app/api/license/verify', [
		'method'  => 'POST',
		'body'    => wp_json_encode( [
			'license'   => $license,
			'increment' => !$is_verified,
		] ),
		'headers' => [
			'Content-Type' => 'application/json',
			'Accept'       => 'application/json',
		],
	] );

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

	if ( ! $response_body ) {
		return json_encode( [
			'success' => false,
			'message' => 'That license does not exist for the provided product.',
		] );
	}

	if ( $response_body['success'] ) {
		$settings['license_verified'] = "1";
		update_option( 'writers_blocks', $settings );
	}

	return $response_body;
}

function activate() {
	// Do not override existing settings
	// if ( ! empty( get_option( 'writers-blocks' ) ) ) {
	// 	return;
	// }

	update_option(
		'writers_blocks',
		[
			'license_key'        => '',
			'license_verified'   => '0',
			'editing_mode'       => '1',
			'syntax_mode'		 => '0',
			'simplify'           => '1',
			'intensify'          => '1',
			'passive'            => '1',
			'readability'        => '1',
			'indefinite_article' => '1',
			'equality'           => '1',
			'profanities'        => '1',
			'contractions'       => '1',
			'repeated_words'     => '1',
			'redundant_acronyms' => '1',
			'diacritics'         => '1',
			'sentence_spacing'   => '1',
			'nouns'			     => '1',
			'adjectives'         => '1',
			'adverbs'            => '1',
			'verbs'              => '1',
		],
		false
	);
}

function deactivate() {
	delete_option( 'writers_blocks' );
}
