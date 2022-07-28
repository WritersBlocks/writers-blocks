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
		$this->cache_allowed = false; // Only disable this for debugging

		add_filter( 'plugins_api', array( $this, 'info' ), 20, 3 );
		add_filter( 'site_transient_update_plugins', array( $this, 'update' ) );
		add_filter( 'upgrader_source_selection', array( $this, 'rename' ), 10, 3 );
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

	public function screenshots() {
		$html        = '<ol>';
		$screenshots = [
			[
				'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-1.jpg',
				'type'    => 'img',
				'caption' => 'Highlight syntax, style, and spelling errors in your Gutenberg content.',
			],
			[
				'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-2.jpg',
				'type'    => 'img',
				'caption' => 'Click on highlighted words to view details and get suggestions.',
			],
			// [
			// 	'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-3.mp4',
			// 	'type'    => 'video',
			// 	'caption' => 'Toggle on and off spelling or style rules to show or hide specific rules.',
			// ],
			// [
			// 	'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-4.mp4',
			// 	'type'    => 'video',
			// 	'caption' => 'Real time error checking gives instant feedback for your writing.',
			// ],
			// [
			// 	'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-5.mp4',
			// 	'type'    => 'video',
			// 	'caption' => 'Prevent words from being highlighted by a rule.',
			// ],
			// [
			// 	'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-6.mp4',
			// 	'type'    => 'video',
			// 	'caption' => 'Replace highlighted content with curated suggestions.',
			// ],
			// [
			// 	'src'     => WRITERS_BLOCKS_URL . 'assets/images/screenshot-7.mp4',
			// 	'type'    => 'video',
			// 	'caption' => 'Create a custom dictionary to prevent unwanted misspellings.',
			// ],
		];

		foreach ($screenshots as $screenshot) {
			$html .= '<li>';
			$html .= '<a href="' . $screenshot['src'] . '" target="_blank">';
			
			if ($screenshot['type'] === 'img') {
				$html .= '<img src="' . $screenshot['src'] . '" alt="' . $screenshot['caption'] . '">';
			} else {
				$html .= '<video src="' . $screenshot['src'] . '" autoplay loop muted playsinline></video>';
			}

			$html .= '</a>';
			$html .= '<p class="caption">' . $screenshot['caption'] . '</p>';
			$html .= '</li>';
		}

		$html .= '</ol>';

		return $html;
	}

	public function installation() {
		$html = '<p>Install Writer\'s Blocks like you would any other WordPress plugin:</p>';
		$html .= '<ol>';
		$html .= '<li>Download the plugin from <a href="https://usewritersblocks.com" target="_blank">usewritersblocks.com</a>.</li>';
		$html .= '<li>Log in to your WordPress installation.</li>';
		$html .= '<li>Go to Plugins.</li>';
		$html .= '<li>Click <strong>Add New</strong>.</li>';
		$html .= '<li>Click <strong>Upload Plugin</strong>.</li>';
		$html .= '<li>Click <strong>Choose Files</strong>.</li>';
		$html .= '<li>Click <strong>Install Now</strong>.</li>';
		$html .= '<li>Click <strong>Activate</strong>.</li>';
		$html .= '</ol>';

		return $html;
	}

	public function faq() {
		$html = '';
		$faq  = [
			[
				'question' => 'Where is the plugin configuration screen?',
				'answer'   => 'There isn\'t one.',
			],
			[
				'question' => 'Does this support Classic Editor?',
				'answer'   => 'No.',
			],
			[
				'question' => 'Where do I activate my license?',
				'answer'   => 'In the plugin panel of any post or page. Click the three dots next to "Settings" and then click "Options".',
			],
		];

		foreach ($faq as $item) {
			$html .= '<p><strong>' . $item['question'] . '</strong></p>';
			$html .= '<p>' . $item['answer'] . '</p>';
		}

		return $html;
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
		$result->name = WRITERS_BLOCKS_NAME;
		$result->slug = $this->plugin_slug;
		$result->homepage = WRITERS_BLOCKS_SITE_URL;
		$result->author = '<a href="' . WRITERS_BLOCKS_SITE_URL . '" target="_blank">' . WRITERS_BLOCKS_NAME . '</a>';
		$result->contributors = [
			'rdimascio' => [
				'profile'      => WRITERS_BLOCKS_SITE_URL,
				'avatar'       => 'https://secure.gravatar.com/avatar/23e0c4a9f353c53e2218fdacbfe49cfc?s=200&d=mm&r=g',
				'display_name' => 'Ryan DiMascio',
			],
		];
		$result->icons = [
			'2x' => WRITERS_BLOCKS_URL . 'assets/images/icon-256X256.png',
			'1x' => WRITERS_BLOCKS_URL . 'assets/images/icon-128X128.png',
		];
		$result->banners = [
			'low' => WRITERS_BLOCKS_URL . 'assets/images/banner-772x250.jpg',
			'high' => WRITERS_BLOCKS_URL . 'assets/images/banner-1544x500.jpg',
		];
		$result->version = WRITERS_BLOCKS_VERSION;
		$result->tested = WRITERS_BLOCKS_TESTED_WP_VERSION;
		$result->requires = WRITERS_BLOCKS_REQUIRES_WP_VERSION;
		$result->requires_php = WRITERS_BLOCKS_REQUIRES_PHP_VERSION;
		$result->compatibility = WRITERS_BLOCKS_COMPATIBLE_WP_VERSION;
		$result->last_updated = explode( 'T', $result->updatedAt )[0];
		$result->sections = (array) $result->sections;

		if (file_exists( WRITERS_BLOCKS_PATH . 'assets/html/description.html' )) {
			$result->sections['description'] = file_get_contents( WRITERS_BLOCKS_PATH . 'assets/html/description.html', false ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		}

		$result->sections['installation'] = $this->installation();
		$result->sections['FAQ'] = $this->faq();

		if (file_exists( WRITERS_BLOCKS_PATH . 'assets/html/changelog.html' )) {
			$result->sections['changelog'] = file_get_contents( WRITERS_BLOCKS_PATH . 'assets/html/changelog.html', false ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		}

		$result->sections['screenshots'] = $this->screenshots();

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
			'icons'         => array(),
			'banners'       => array(),
			'banners_rtl'   => array(),
			'tested'        => '',
			'requires_php'  => '',
			'compatibility' => new stdClass(),
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

	private function plugin($searchHeaders) {
		if ( !function_exists('get_plugins') ){
			/** @noinspection PhpIncludeInspection */
			require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
		}

		$installedPlugins = get_plugins();
		$matches = array();
		foreach ($installedPlugins as $pluginBasename => $headers) {
			$diff1 = array_diff_assoc($headers, $searchHeaders);
			$diff2 = array_diff_assoc($searchHeaders, $headers);
			if ( empty($diff1) && empty($diff2) ) {
				$matches[] = $pluginBasename;
			}
		}

		//It's possible (though very unlikely) that there could be two plugins with identical
		//headers. In that case, we can't unambiguously identify the plugin that's being upgraded.
		if ( count($matches) !== 1 ) {
			return null;
		}

		return reset($matches);
	}

	private function active($upgrader) {
		if ( !isset($upgrader, $upgrader->skin) ) {
			return null;
		}

		$pluginFile = null;
		$skin = $upgrader->skin;

		if ( $skin instanceof Plugin_Upgrader_Skin ) {
			if ( isset($skin->plugin) && is_string($skin->plugin) && ($skin->plugin !== '') ) {
				$pluginFile = $skin->plugin;
			}
		} elseif ( isset($skin->plugin_info) && is_array($skin->plugin_info) ) {
			//This case is tricky because Bulk_Plugin_Upgrader_Skin (etc) doesn't actually store the plugin
			//filename anywhere. Instead, it has the plugin headers in $plugin_info. So the best we can
			//do is compare those headers to the headers of installed plugins.
			$pluginFile = $this->plugin($skin->plugin_info);
		}

		return $pluginFile;
	}

	/**
	 * Is there an update being installed right now, for this plugin or theme?
	 *
	 * @param WP_Upgrader|null $upgrader The upgrader that's performing the current update.
	 * @return bool
	 */
	public function upgrading($upgrader = null) {
		$id = null;

		if ( isset($upgrader) ) {
			$id = $this->active($upgrader);
		}

		return $this->plugin_id === $id;
	}

	/**
	 * Check for incorrect update directory structure. An update must contain a single directory,
	 * all other files should be inside that directory.
	 *
	 * @param string $remoteSource Directory path.
	 * @return bool
	 */
	public function validate($remoteSource) {
		global $wp_filesystem;
		/** @var WP_Filesystem_Base $wp_filesystem */

		$sourceFiles = $wp_filesystem->dirlist($remoteSource);
		if ( is_array($sourceFiles) ) {
			$sourceFiles = array_keys($sourceFiles);
			$firstFilePath = trailingslashit($remoteSource) . $sourceFiles[0];

			// If the first file is not a directory, then the directory structure is bad.
			return (count($sourceFiles) > 1) || (!$wp_filesystem->is_dir($firstFilePath));
		}

		//Assume it's fine.
		return false;
	}

	/**
	 * Rename the update directory to match the existing plugin/theme directory.
	 *
	 * When WordPress installs a plugin or theme update, it assumes that the ZIP file will contain
	 * exactly one directory, and that the directory name will be the same as the directory where
	 * the plugin or theme is currently installed.
	 *
	 * GitHub and other repositories provide ZIP downloads, but they often use directory names like
	 * "project-branch" or "project-tag-hash". We need to change the name to the actual plugin folder.
	 *
	 * This is a hook callback. Don't call it from a plugin.
	 *
	 * @param string $source The directory to copy to /wp-content/plugins or /wp-content/themes. Usually a subdirectory of $remoteSource.
	 * @param string $remoteSource WordPress has extracted the update to this directory.
	 * @param WP_Upgrader $upgrader
	 * @return string|WP_Error
	 */
	public function rename($source, $remoteSource, $upgrader) {
		global $wp_filesystem;
		/** @var WP_Filesystem_Base $wp_filesystem */

		//Basic sanity checks.
		if ( !isset($source, $remoteSource, $upgrader, $upgrader->skin, $wp_filesystem) ) {
			return $source;
		}

		//If WordPress is upgrading anything other than our plugin/theme, leave the directory name unchanged.
		if ( !$this->upgrading($upgrader) ) {
			return $source;
		}

		//Rename the source to match the existing directory.
		$correctedSource = trailingslashit($remoteSource) . $this->plugin_slug . '/';
		if ( $source !== $correctedSource ) {
			//The update archive should contain a single directory that contains the rest of plugin/theme files.
			//Otherwise, WordPress will try to copy the entire working directory ($source == $remoteSource).
			//We can't rename $remoteSource because that would break WordPress code that cleans up temporary files
			//after update.
			if ( $this->validate($remoteSource) ) {
				return new WP_Error(
					'writers-blocks-incorrect-directory-structure',
					sprintf(
						'The directory structure of the update is incorrect. All files should be inside ' .
						'a directory named <span class="code">%s</span>, not at the root of the ZIP archive. ' .
						'Source: <span class="code">%s</span> ' .
						'Corrected source: <span class="code">%s</span> ' .
						'Remote source: <span class="code">%s</span>',
						htmlentities($this->plugin_slug),
						htmlentities($source),
						htmlentities($correctedSource),
						htmlentities($remoteSource),
					)
				);
			}

			/** @var WP_Upgrader_Skin $upgrader ->skin */
			$upgrader->skin->feedback(sprintf(
				'Renaming %s to %s&#8230;',
				'<span class="code">' . basename($source) . '</span>',
				'<span class="code">' . $this->plugin_id . '</span>'
			));

			if ( $wp_filesystem->move($source, $correctedSource, true) ) {
				$upgrader->skin->feedback('Directory successfully renamed.');
				return $correctedSource;
			} else {
				return new WP_Error(
					'writers-blocks-rename-failed',
					'Unable to rename the update to match the existing directory.'
				);
			}
		}

		return $source;
	}
}
