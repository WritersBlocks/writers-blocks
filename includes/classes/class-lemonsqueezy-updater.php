<?php

/**
 * The name of this class should be unique to your plugin to
 * avoid conflicts with other plugins using an updater class.
 */
class LEMONSQUEEZY_UPDATER {

	/**
	 * @var string
	 */
	public $plugin_id;

	/**
	 * @var string
	 */
	public $plugin_slug;

	/**
	 * @var string
	 */
	public $version;

	/**
	 * @var string
	 */
	public $api_url;

	/**
	 * @var string
	 */
	public $cache_key;

	/**
	 * @var boolean
	 */
	public $cache_allowed;

	/**
	 * @param string $plugin_id   The ID of the plugin.
	 * @param string $plugin_slug The slug of the plugin.
	 * @param string $version     The current version of the plugin.
	 * @param string $version     The API URL to the update server.
	 */
	public function __construct( $plugin_id, $plugin_slug, $version, $api_url ) {
		$this->plugin_id     = $plugin_id;
		$this->plugin_slug   = $plugin_slug;
		$this->version       = $version;
		$this->api_url       = $api_url;

		$this->cache_key     = str_replace( '-', '_', $this->plugin_slug ) . '_updater';
		$this->cache_allowed = true; // Only disable this for debugging

		add_filter( 'plugins_api', array( $this, 'info' ), 20, 3 );
		add_filter( 'site_transient_update_plugins', array( $this, 'update' ) );
		// add_filter( 'upgrader_source_selection', array( $this, 'rename' ), 10, 3 );
		add_action( 'upgrader_process_complete', array( $this, 'purge' ), 10, 2 );
	}

	/**
	 * Get the license key. Normally, your plugin would have a settings page where
	 * you ask for and store a license key. Fetch it here.
	 *
	 * @return string
	 */
	protected function get_license_key() {
		// See class-settings-page.php
		$license_data = get_option( 'writers_blocks_license', '' );
        $license_data = json_decode( $license_data );

		return isset( $license_data->license_key ) && isset( $license_data->license_key->key )
            ? $license_data->license_key->key
            : null;
	}

	/**
	 * Fetch the update info from the remote server running the Lemon Squeezy plugin.
	 *
	 * @return object|bool
	 */
	public function request() {
		$lsq_license_key = $this->get_license_key();
		if ( ! $lsq_license_key ) {
			return false;
		}

		$remote = get_transient( $this->cache_key );
		if ( false === $remote || ! $this->cache_allowed ) {
			$remote = wp_remote_get(
				$this->api_url . "/update?license_key={$lsq_license_key}",
				array(
					'timeout' => 10,
				)
			);

			if (
				is_wp_error( $remote )
				|| 200 !== wp_remote_retrieve_response_code( $remote )
				|| empty( wp_remote_retrieve_body( $remote ) )
			) {
				return false;
			}

			set_transient( $this->cache_key, $remote, DAY_IN_SECONDS );
		}

		$remote = json_decode( wp_remote_retrieve_body( $remote ) );

		return $remote;
	}

	/**
	 * Override the WordPress request to return the correct plugin info.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/plugins_api/
	 *
	 * @param false|object|array $result
	 * @param string $action
	 * @param object $args
	 * @return object|bool
	 */
	public function info( $result, $action, $args ) {
		if ( 'plugin_information' !== $action ) {
			return false;
		}
		if ( $this->plugin_slug !== $args->slug ) {
			return false;
		}

		$remote = $this->request();
		if ( ! $remote || ! $remote->success || empty( $remote->update ) ) {
			return false;
		}

		$plugin_data = get_plugin_data( __FILE__ );

		$result       = $remote->update;
		$result->name = $plugin_data['Name'];
		$result->slug = $this->plugin_slug;
		$result->sections = (array) $result->sections;

		if (file_exists( WRITERS_BLOCKS_PATH . 'README.md' )) {
			$result->sections['description'] = file_get_contents( WRITERS_BLOCKS_PATH . 'README.md', false ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		}

		if (file_exists( WRITERS_BLOCKS_PATH . 'CHANGELOG.md' )) {
			$result->sections['changelog'] = file_get_contents( WRITERS_BLOCKS_PATH . 'CHANGELOG.md', false ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		}

		return $result;
	}

	/**
	 * Override the WordPress request to check if an update is available.
	 *
	 * @see https://make.wordpress.org/core/2020/07/30/recommended-usage-of-the-updates-api-to-support-the-auto-updates-ui-for-plugins-and-themes-in-wordpress-5-5/
	 *
	 * @param object $transient
	 * @return object
	 */
	public function update( $transient ) {
		if ( empty( $transient->checked ) ) {
			return $transient;
		}

		$res = (object) array(
			'id'            => $this->plugin_id,
			'slug'          => $this->plugin_slug,
			'plugin'        => $this->plugin_id,
			'new_version'   => $this->version,
			'url'           => '',
			'package'       => '',
			'icons'         => [
				'2x' => WRITERS_BLOCKS_URL . 'assets/images/icon-256X256.png',
				'1x' => WRITERS_BLOCKS_URL . 'assets/images/icon-128X128.png',
			],
			'banners'       => [
				'low' => WRITERS_BLOCKS_URL . 'assets/images/banner-772x250.jpg',
				'high' => WRITERS_BLOCKS_URL . 'assets/images/banner-1544x500.jpg',
			],
			'tested'        => WRITERS_BLOCKS_TESTED_WP_VERSION,
			'requires_php'  => WRITERS_BLOCKS_REQUIRES_WP_VERSION,
			'requires_php'  => WRITERS_BLOCKS_REQUIRES_PHP_VERSION,
			'compatibility' => WRITERS_BLOCKS_COMPATIBLE_WP_VERSION,
		);

		$remote = $this->request();

		if (
			$remote && $remote->success && ! empty( $remote->update )
			&& version_compare( $this->version, $remote->update->version, '<' )
		) {
			$res->new_version = $remote->update->version;
			$res->package     = $remote->update->download_link;

			$transient->response[ $res->plugin ] = $res;
		} else {
			$transient->no_update[ $res->plugin ] = $res;
		}

		return $transient;
	}

	/**
	 * When the update is complete, purge the cache.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/upgrader_process_complete/
	 *
	 * @param WP_Upgrader $upgrader
	 * @param array $options
	 * @return void
	 */
	public function purge( $upgrader, $options ) {
		if (
			$this->cache_allowed
			&& 'update' === $options['action']
			&& 'plugin' === $options['type']
			&& ! empty( $options['plugins'] )
		) {
			foreach ( $options['plugins'] as $plugin ) {
				if ( $plugin === $this->plugin_id ) {
					delete_transient( $this->cache_key );
				}
			}
		}
	}
}
