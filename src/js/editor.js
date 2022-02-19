import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

import { PluginPanel } from './components/panel/plugin';

import './filters';
import './subscribers';

domReady(() => {
    /**
     * Register Access Panel Plugin
     */
    registerPlugin('writers-blocks', {
        render: PluginPanel,
    });
});
