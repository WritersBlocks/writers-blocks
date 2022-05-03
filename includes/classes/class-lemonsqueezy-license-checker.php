<?php

// Exit if accessed directly
// if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Allows plugins to activate and validate license keys
 * Based on EDD open source updater: https://github.com/easydigitaldownloads/easy-digital-downloads/blob/master/includes/EDD_SL_Plugin_Updater.php
 *
 * @author Jeffrey Carandang
 * @version 1.0
 */
class LEMONSQUEEZY_LICENSE_CHECKER {

	private $api_url     = 'https://api.lemonsqueezy.com';
	private $api_version = 'v1';
	private $store_id    = 6151;
	private $product_id  = 7681;
	private $api_data    = [];
	private $name        = '';
	private $slug        = 'writers_blocks';
	private $wp_override = false;
	private $loggedin    = false;

	private $health_check_timeout = 5;

	/**
	 * Class constructor.
	 *
	 * @uses plugin_basename()
	 * @uses hook()
	 *
	 * @param string  $_api_url     The URL pointing to the custom API endpoint.
	 * @param string  $_plugin_file Path to the plugin file.
	 * @param array   $_api_data    Optional data to send with API calls.
	 */
	public function __construct( $_plugin_file, $_api_data = null ) {

		global $lemonsqueezy_plugin_data;

		$this->api_data    = $_api_data;
		$this->name        = plugin_basename( $_plugin_file );
		$this->slug        = basename( $_plugin_file, '.php' );
		$this->wp_override = isset( $_api_data['wp_override'] ) ? (bool) $_api_data['wp_override'] : false;

		$lemonsqueezy_plugin_data[ $this->slug ] = $this->api_data;

		/**
		 * Fires after the $lemonsqueezy_plugin_data is setup.
		 *
		 * @since 1.0
		 *
		 * @param array $lemonsqueezy_plugin_data Array of Lemon Squeezy plugin data.
		 */
		do_action( 'post_lemonsqueezy_plugin_plugin_updater_setup', $lemonsqueezy_plugin_data );

		// Set up hooks.
		$this->init();
	}

	/**
	 * Set up WordPress filters to hook into WP's update process.
	 *
	 * @uses add_filter()
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'check_update' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	/**
	 * Check for Updates at the defined API endpoint and modify the update array.
	 *
	 * This function dives into the update API just when WordPress creates its update array,
	 * then adds a custom API call and injects the custom plugin data retrieved from the API.
	 * It is reassembled from parts of the native WordPress plugin update code.
	 * See wp-includes/update.php line 121 for the original wp_update_plugins() function.
	 *
	 * @uses api_request()
	 *
	 * @param array   $_transient_data Update array build by WordPress.
	 * @return array Modified update array with custom plugin data.
	 */
	public function check_update( $_transient_data ) {

		global $pagenow;

		if ( ! is_object( $_transient_data ) ) {
			$_transient_data = new stdClass;
		}

		if ( 'plugins.php' === $pagenow && is_multisite() ) {
			return $_transient_data;
		}

		if ( ! empty( $_transient_data->response ) && ! empty( $_transient_data->response[ $this->name ] ) && false === $this->wp_override ) {
			return $_transient_data;
		}

		// Automatically validate license
		$this->validate_license();

		return $_transient_data;
	}

	/**
	 * Activates license
	 * 
	 * This function checks if the license is valid or not.
	 * The saves the return object as option for future use.
	 *
	 * @uses get_repo_api_data()
	 *
	 * @return string
	 */
	public function activate_license( $license_key = '' ) {
		$license_data = get_option( 'writers_blocks_license', '' );
		$license_data = json_decode( $license_data );

		if (
			! empty( $license_data ) &&
			isset( $license_data->license_key ) &&
			isset( $license_data->license_key->key ) &&
			isset( $license_data->license_key->status ) &&
			$license_data->license_key->status === 'active'
		) {

			if ( $license_data->license_key->key === $license_key ) {
				return '';
			} else {
				$this->get_repo_api_data( 'deactivate' );
			}
		}

		$response = $this->get_repo_api_data( 'activate', $license_key );

		return $response;
	}

	/**
	 * Deactivates license
	 * 
	 * This function checks if the license is valid or not.
	 * The saves the return object as option for future use.
	 *
	 * @uses get_repo_api_data()
	 *
	 * @return string
	 */
	public function deactivate_license( $license_key = '' ) {
		$response = $this->get_repo_api_data( 'deactivate', $license_key );

		return $response;
	}

	/**
	 * Validates license
	 * 
	 * This function checks if the license is valid or not.
	 * The saves the return object as option for future use.
	 *
	 * @uses get_repo_api_data()
	 *
	 * @return string
	 */
	public function validate_license() {
		$response = $this->get_repo_api_data( 'validate' );

		return $response;
	}

	/**
	 * Register REST route
	 *
	 * @since 1.0
	 */
	public function register_rest_route() {
		$this->loggedin = is_user_logged_in();

		register_rest_route(
			'writers-blocks/v1',
			'/license/',
			array(
				'methods'              => 'GET',
				'permission_callback'  => '__return_true',
				'args'                 => array(
					'action'  => array(
						'required'          => true,
						'validate_callback' => array( $this, 'validate_action' ),
					),
					'license' => array(
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'callback'             => array( $this, 'rest_callback' ),
			)
		);
	}

	/**
	 * Handle license activation via REST endpoint
	 *
	 * @access  public
	 * @return  object|null
	 */
	public function rest_callback( WP_REST_Request $request ) {
		$action  = $request->get_param( 'action' );
		$license = $request->get_param( 'license' );

		if ( ! $license || empty( $license ) ) {
			return false;
		}

		$license_data = $this->get_repo_api_data( $action, $license );

		return json_decode( $license_data );
	}

	/**
	 * Handles Lemon Squeezy external request
	 * 
	 * @param string  $action      Accepts activate, validate and deactivate
	 * @param array   $license_key The license key.
	 *
	 * @uses wp_safe_remote_post()
	 *
	 * @return string The API response.
	 */
	public function get_repo_api_data( $action = '', $license_key = '' ) {

		// Bail if invalid action
		if ( ! $this->validate_action( $action ) ) {
			return false;
		}

		$instance_id  = '';
		$license_data = get_option( 'writers_blocks_license', '' );
		$license_data = json_decode( $license_data );

		if ( ! empty( $license_data ) ) {

			if ( empty( $license_key ) && isset( $license_data->license_key ) && isset( $license_data->license_key->key ) ) {
				$license_key = $license_data->license_key->key;
			}

			if ( isset( $license_data->instance ) && isset( $license_data->instance->id ) ) {
				$instance_id = $license_data->instance->id;
			}
		}

		$args = [
			'method'    => 'POST',
			'timeout'   => $this->health_check_timeout,
			'headers'   => [
				'Content-Type' => 'application/x-www-form-urlencoded',
				'Accept'       => 'application/json',
			],
			'body'      => [
				'license_key'   => strtolower( $license_key ),
				'instance_name' => $this->name,
				'instance_id'   => $instance_id,
			],
		];

		$request  = wp_remote_post( 
			"{$this->api_url}/{$this->api_version}/licenses/{$action}",
			$args
		);
		$response = wp_remote_retrieve_body( $request );
		$data     = json_decode( $response );

		if ( empty( $data ) || ( isset( $data->meta ) && (
			$data->meta->store_id !== $this->store_id ||
			$data->meta->product_id !== $this->product_id
		) ) ) {
			$response = json_encode( [
				'valid' => false,
				'error' => esc_attr( 'Invalid license key.' ),
				'instance' => [
					'id' => $instance_id,
				],
			] );
		} else if ( ! empty( $data ) ) {

			if (
				isset( $data->license_key ) &&
				'activate' === $action &&
				'active' === $data->license_key->status
			) {
				$response = json_encode(
					array_merge( (array) $license_data, (array) $data )
				);
			}
		}

		// save license data to wp_option
		update_option( 'writers_blocks_license', $response );

		return $response;
	}

	/**
	 * Validate update action
	 *
	 * @since 1.0
	 *
	 * @param string $value
	 *
	 * @return bool
	 */
	public function validate_action( $value ) {
		return in_array( $value, array( 'activate', 'deactivate', 'validate' ), true );
	}
}
