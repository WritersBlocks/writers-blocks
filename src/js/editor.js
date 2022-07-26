import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

// The WP annotations package isn't loaded by default so force loading it.
import '@wordpress/annotations';

import { PluginPanelWithErrorBoundary } from './components/panel/plugin';

// import './filters';
import './subscribers';

domReady( () => {
	/**
	 * Register Access Panel Plugin
	 */
	registerPlugin( 'writers-blocks', {
		render: PluginPanelWithErrorBoundary,
	} );
} );
