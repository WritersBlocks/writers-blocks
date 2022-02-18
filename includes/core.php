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

	add_action( 'admin_menu', $n( 'admin_menu' ), 20 );
	add_action( 'admin_init', $n( 'setup_fields_sections' ) );
	add_action( 'admin_init', $n( 'register_settings' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );
    add_action( 'enqueue_block_editor_assets', $n( 'syntax_editor_scripts' ) );
	add_action( 'rest_api_init', $n( 'rest_api_init' ) );
	add_action( 'rest_api_init', $n( 'register_settings' ) );
}

/**
 * Output setting menu option
 *
 * @since  1.0
 */
function admin_menu() {
	add_options_page(
		"Writer's Blocks Settings",
		"Writer's Blocks ",
		'manage_options',
		'writers-blocks',
		__NAMESPACE__ . '\settings_screen'
	);
}

/**
 * Output setting screen
 *
 * @since  1.0
 */
function settings_screen() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( "Writer's Blocks Settings", 'writers-blocks' ); ?></h1>

		<div class="writers-blocks-settings">
			<form action="options.php" method="post">
				<?php settings_fields( 'writers-blocks' ); ?>
				<?php do_settings_sections( 'writers-blocks' ); ?>
				<?php submit_button( esc_html__( 'Save Changes', 'writers-blocks' ) ); ?>
			</form>
		</div>
	</div>
	<?php
}

/**
 * Register setting fields and sections
 *
 * @since  1.0.0
 */
function setup_fields_sections() {

	add_settings_section(
		'writers-blocks-instructions',
		'',
		__NAMESPACE__ . '\render_instructions',
		'writers-blocks'
	);

	add_settings_section(
		'writers-blocks-crendentials',
		'',
		'',
		'writers-blocks'
	);

	add_settings_section(
		'writers-blocks-suggestions',
		'',
		'',
		'writers-blocks'
	);

	add_settings_field(
		'writers_blocks_license_key',
		esc_html__( 'License Key', 'writers-blocks' ),
		__NAMESPACE__ . '\render_license_key_field',
		'writers-blocks',
		'writers-blocks-crendentials',
		[
			'label_for' => 'license_key',
		]
	);

	add_settings_field(
		'writers_blocks_license_verified',
		'',
		__NAMESPACE__ . '\render_license_verified_field',
		'writers-blocks',
		'writers-blocks-crendentials',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_simpler',
		'',
		__NAMESPACE__ . '\render_simpler_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_adverb',
		'',
		__NAMESPACE__ . '\render_adverb_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_hedge',
		'',
		__NAMESPACE__ . '\render_hedge_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_weasel',
		'',
		__NAMESPACE__ . '\render_weasel_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_passive',
		'',
		__NAMESPACE__ . '\render_passive_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_readability',
		'',
		__NAMESPACE__ . '\render_readability_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_filler',
		'',
		__NAMESPACE__ . '\render_filler_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_cliche',
		'',
		__NAMESPACE__ . '\render_cliche_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_equality',
		'',
		__NAMESPACE__ . '\render_equality_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);

	add_settings_field(
		'writers_blocks_profanity',
		'',
		__NAMESPACE__ . '\render_profanity_field',
		'writers-blocks',
		'writers-blocks-suggestions',
		[
			'class' => 'hidden',
		]
	);
}

/**
 * Display instructions for setting fields and sections
 *
 * @since  1.0.0
 */
function render_instructions() {
	?>
	<section class="credentials-instructions">
	</section>
	<?php
}

/**
 * Render the Private Key field.
 */
function render_license_key_field() {
	$key  = 'license_key';
	$name = "writers-blocks[$key]";
	?>
	<div id="authkey-container">
		<textarea name="<?php echo esc_attr( $name ); ?>" class="large-text" rows="4" id="license_key" placeholder="<?php esc_html_e( 'Paste your License Key here' ); ?>"><?php echo esc_attr( get_setting( $key ) ); ?></textarea>
		<button type="button" class="button button-secondary" id="verify-license"><?php echo esc_html( 'Verify License', 'writers-blocks' ); ?></button>
	</div>
	<?php
}

function render_license_verified_field() {
	$key  = 'license_verified';
	$name = "writers-blocks[$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key ) ); ?>" />
	<?php
}

function render_simpler_field() {
	$key  = 'simpler';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_adverb_field() {
	$key  = 'adverb';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_hedge_field() {
	$key  = 'hedge';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_weasel_field() {
	$key  = 'weasel';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_passive_field() {
	$key  = 'passive';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_readability_field() {
	$key  = 'readability';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_filler_field() {
	$key  = 'filler';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_cliche_field() {
	$key  = 'cliche';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_equality_field() {
	$key  = 'equality';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

function render_profanity_field() {
	$key  = 'profanity';
	$name = "writers-blocks[suggestions][$key]";
	?>
	<input name="<?php echo esc_attr( $name ); ?>" type="hidden" value="<?php echo esc_attr( get_setting( $key, 'suggestions' ) ); ?>" />
	<?php
}

/**
 * Helper to retrieve a setting.
 *
 * @param string $setting The name of the setting.
 * @return mixed
 */
function get_setting( $setting, $parent = false ) {
	$settings = get_option( 'writers-blocks', [] );

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
		'writers-blocks',
		'writers-blocks',
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
					),
				),
			),
			'default'           => [],
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

	if ( isset( $settings['suggestions'] ) ) {
		$new_settings['suggestions'] = [
			'simpler'     => isset( $settings['suggestions']['simpler'] ) ? '1' : '0',
			'adverb'      => isset( $settings['suggestions']['adverb'] ) ? '1' : '0',
			'hedge'       => isset( $settings['suggestions']['hedge'] ) ? '1' : '0',
			'weasel'      => isset( $settings['suggestions']['weasel'] ) ? '1' : '0',
			'passive'     => isset( $settings['suggestions']['passive'] ) ? '1' : '0',
			'readability' => isset( $settings['suggestions']['readability'] ) ? '1' : '0',
			'filler'      => isset( $settings['suggestions']['filler'] ) ? '1' : '0',
			'cliche'      => isset( $settings['suggestions']['cliche'] ) ? '1' : '0',
			'equality'    => isset( $settings['suggestions']['equality'] ) ? '1' : '0',
			'profanity'   => isset( $settings['suggestions']['profanity'] ) ? '1' : '0',
		];
	}

	return $new_settings;
}

/**
 * Registers the Icon Block using the metadata loaded from the `block.json`
 * file. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function syntax_editor_scripts() {
	wp_enqueue_script(
		'writers-blocks',
		SYNTAX_PLUGIN_URL . './build/js/editor.js',
		Utility\get_asset_info( 'editor', 'js', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'js', 'version' ),
		false
	);
	wp_localize_script(
		'writers-blocks',
		'WB_SETTINGS',
		[
			'settings' => get_option( 'writers-blocks', [] ),
		]
	);

	wp_enqueue_style(
		'writers-blocks-style',
		SYNTAX_PLUGIN_URL . './build/css/editor.css',
		Utility\get_asset_info( 'editor', 'css', 'dependencies' ),
		Utility\get_asset_info( 'editor', 'css', 'version' )
	);
}

function admin_scripts( $page ) {
	if ( strpos( $page, 'writers-blocks' ) !== false ) {
		wp_enqueue_script(
			'writers-blocks-admin',
			SYNTAX_PLUGIN_URL . './build/js/admin.js',
			Utility\get_asset_info( 'admin', 'js', 'dependencies' ),
			Utility\get_asset_info( 'admin', 'js', 'version' ),
			false
		);
		wp_localize_script(
			'writers-blocks-admin',
			'WB_SETTINGS',
			[
				'settings' => get_option( 'writers-blocks', [] ),
			]
		);

		wp_enqueue_style(
			'writers-blocks-admin',
			SYNTAX_PLUGIN_URL . './build/css/admin.css',
			Utility\get_asset_info( 'admin', 'css', 'dependencies' ),
			Utility\get_asset_info( 'admin', 'css', 'version' )
		);
	}
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
	$settings = get_option( 'writers-blocks', [] );
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
		update_option( 'writers-blocks', $settings );
	}

	return $response_body;
}

function activate() {
	// Do not override existing settings
	if ( ! empty( get_option( 'writers-blocks' ) ) ) {
		return;
	}

	update_option(
		'writers-blocks',
		[
			'license_key'      => '',
			'license_verified' => '0',
			'suggestions'      => [
				'simpler'     => '1',
				'adverb'      => '1',
				'hedge'       => '1',
				'weasel'      => '1',
				'passive'     => '1',
				'readability' => '1',
				'filler'      => '1',
				'cliche'      => '1',
				'equality'    => '1',
				'profanity'   => '1',
			],
		],
		false
	);
}

function deactivate() {
	delete_option( 'writers-blocks' );
}
