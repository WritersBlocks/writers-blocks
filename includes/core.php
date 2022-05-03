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
 * @since  1.0.0
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'enqueue_block_editor_assets', $n( 'editor_scripts' ) );
	add_action( 'rest_api_init', $n( 'register_settings' ) );
}

/**
 * Helper to retrieve a setting.
 *
 * @param string $setting The name of the setting.
 * @return mixed
 * @since  1.0.0
 */
function get_setting( $setting, $parent = false ) {
	$settings = get_option( 'writers_blocks', [] );

	if ( $parent ) {
		$settings = $settings[ $parent ];
	}

	return isset( $settings[ $setting ] ) ? $settings[ $setting ] : '';
}

/**
 * Helper to return filtered settings.
 *
 * @return array
 * @since  1.0.0
 */
function get_options() {
	$options = get_option( 'writers_blocks', [] );

	$options['demo'] = defined( 'WRITERS_BLOCKS_DEMO' ) ? WRITERS_BLOCKS_DEMO : false;
	$options['mode'] = defined( 'WRITERS_BLOCKS_DEMO' ) && WRITERS_BLOCKS_DEMO === true ? 'editing' : $options['mode'];

	return apply_filters( 'writers_blocks_options', $options );
}

/**
 * Register settings for options table
 *
 * @since  1.0.0
 */
function register_settings() {
	register_setting(
		'writers_blocks',
		'writers_blocks',
		array(
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'mode' => array(
							'type' => 'string',
						),
						'demo' => array(
							'type' => 'boolean',
						),
						'spell' => array(
							'type' => 'boolean',
						),
						'simplify' => array(
							'type' => 'boolean',
						),
						'intensify' => array(
							'type' => 'boolean',
						),
						'assuming' => array(
							'type' => 'boolean',
						),
						'cliche' => array(
							'type' => 'boolean',
						),
						'indefinite_article' => array(
							'type' => 'boolean',
						),
						'contractions' => array(
							'type' => 'boolean',
						),
						'repeated_words' => array(
							'type' => 'boolean',
						),
						'contractions' => array(
							'type' => 'boolean',
						),
						'redundant_acronyms' => array(
							'type' => 'boolean',
						),
						'diacritics' => array(
							'type' => 'boolean',
						),
						'sentence_spacing' => array(
							'type' => 'boolean',
						),
						'passive' => array(
							'type' => 'boolean',
						),
						'equality' => array(
							'type' => 'boolean',
						),
						'profanities' => array(
							'type' => 'boolean',
						),
						'readability' => array(
							'type' => 'boolean',
						),
						'noun' => array(
							'type' => 'boolean',
						),
						'adjective' => array(
							'type' => 'boolean',
						),
						'adverb' => array(
							'type' => 'boolean',
						),
						'verb' => array(
							'type' => 'boolean',
						),
						'conjunction' => array(
							'type' => 'boolean',
						),
						'dictionary' => array(
							'type' => 'string',
						),
						'ignored_profanities' => array(
							'type' => 'string',
						),
						'ignored_spell' => array(
							'type' => 'string',
						),
						'ignored_equality' => array(
							'type' => 'string',
						),
						'ignored_simplify' => array(
							'type' => 'string',
						),
						'ignored_intensify' => array(
							'type' => 'string',
						),
						'ignored_diacritics' => array(
							'type' => 'string',
						),
						'ignored_passive' => array(
							'type' => 'string',
						),
						'ignored_assuming' => array(
							'type' => 'string',
						),
						'ignored_cliche' => array(
							'type' => 'string',
						),
					),
				),
			),
			'default' => [],
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
 * @since  1.0.0
 */
function sanitize_settings( $settings ) {
	$new_settings = [];

	if ( isset( $settings['mode'] ) ) {
		$new_settings['mode'] = $settings['mode'];
	}

	if ( isset( $settings['demo'] ) ) {
		$new_settings['demo'] = $settings['demo'];
	}

	if ( isset( $settings['simplify'] ) ) {
		$new_settings['simplify'] = $settings['simplify'];
	}

	if ( isset( $settings['intensify'] ) ) {
		$new_settings['intensify'] = $settings['intensify'];
	}

	if ( isset( $settings['assuming'] ) ) {
		$new_settings['assuming'] = $settings['assuming'];
	}

	if ( isset( $settings['cliche'] ) ) {
		$new_settings['cliche'] = $settings['cliche'];
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

	if ( isset( $settings['noun'] ) ) {
		$new_settings['noun'] = $settings['noun'];
	}
	
	if ( isset( $settings['adverb'] ) ) {
		$new_settings['adverb'] = $settings['adverb'];
	}

	if ( isset( $settings['adjective'] ) ) {
		$new_settings['adjective'] = $settings['adjective'];
	}

	if ( isset( $settings['verb'] ) ) {
		$new_settings['verb'] = $settings['verb'];
	}

	if ( isset( $settings['conjunction'] ) ) {
		$new_settings['conjunction'] = $settings['conjunction'];
	}

	if ( isset( $settings['spell'] ) ) {
		$new_settings['spell'] = $settings['spell'];
	}

	if ( isset( $settings['dictionary'] ) ) {
		$new_settings['dictionary'] = $settings['dictionary'];
	}

	if ( isset( $settings['ignored_equality'] ) ) {
		$new_settings['ignored_equality'] = $settings['ignored_equality'];
	}

	if ( isset( $settings['ignored_profanities'] ) ) {
		$new_settings['ignored_profanities'] = $settings['ignored_profanities'];
	}

	if ( isset( $settings['ignored_simplify'] ) ) {
		$new_settings['ignored_simplify'] = $settings['ignored_simplify'];
	}

	if ( isset( $settings['ignored_spell'] ) ) {
		$new_settings['ignored_spell'] = $settings['ignored_spell'];
	}

	if ( isset( $settings['ignored_intensify'] ) ) {
		$new_settings['ignored_intensify'] = $settings['ignored_intensify'];
	}

	if ( isset( $settings['ignored_passive'] ) ) {
		$new_settings['ignored_passive'] = $settings['ignored_passive'];
	}

	if ( isset( $settings['ignored_diacritics'] ) ) {
		$new_settings['ignored_diacritics'] = $settings['ignored_diacritics'];
	}

	if ( isset( $settings['ignored_assuming'] ) ) {
		$new_settings['ignored_assuming'] = $settings['ignored_assuming'];
	}

	if ( isset( $settings['ignored_cliche'] ) ) {
		$new_settings['ignored_cliche'] = $settings['ignored_cliche'];
	}

	return $new_settings;
}

/**
 * Enqueue the editor scripts and styles.
 *
 * @since  1.0.0
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
		'WRITERS_BLOCKS',
		[
			'settings' => get_options(),
			'license'  => json_decode( get_option( 'writers_blocks_license', '' ) ),
			'rest_url' => '/writers-blocks/v1',
		]
	);

	wp_enqueue_style(
		'writers-blocks-style',
		WRITERS_BLOCKS_URL . './build/css/editor.css',
		Utility\get_asset_info( 'editor', 'css', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'css', 'version' )
	);
}

/**
 * Registers default settings for the plugin.
 *
 * @since  1.0.0
 */
function activate() {
	// Do not override existing settings
	// if ( ! empty( get_option( 'writers_blocks' ) ) ) {
	// 	return;
	// }

	update_option(
		'writers_blocks',
		[
			'demo'                => false,
			'mode'                => 'writing',
			'simplify'            => true,
			'intensify'           => true,
			'assuming'            => true,
			'cliche'              => true,
			'passive'             => true,
			'readability'         => true,
			'indefinite_article'  => true,
			'equality'            => true,
			'profanities'         => true,
			'contractions'        => true,
			'repeated_words'      => true,
			'redundant_acronyms'  => true,
			'diacritics'          => true,
			'sentence_spacing'    => true,
			'noun'			      => true,
			'adjective'           => true,
			'adverb'              => true,
			'verb'                => true,
			'conjunction'	      => true,
			'spell'               => true,
			'dictionary'          => '',
			'ignored_profanities' => '',
			'ignored_spell'       => '',
			'ignored_simplify'    => '',
			'ignored_intensify'   => '',
			'ignored_equality'    => '',
			'ignored_passive'     => '',
			'ignored_diacritics'  => '',
			'ignored_assuming'    => '',
			'ignored_cliche'      => '',
		],
		false
	);
}

/**
 * Removes all settings and data.
 *
 * @since  1.0.0
 */
function deactivate() {
	delete_option( 'writers_blocks' );
	delete_option( 'writers-blocks_ls_data' );
}
