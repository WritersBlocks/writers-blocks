import { registerPlugin } from '@wordpress/plugins';
import { PluginPrePublishPanel } from '@wordpress/edit-post';

const PluginPrePublishPanelTest = () => (
	<PluginPrePublishPanel>
		<p>Pre Publish Panel</p>
	</PluginPrePublishPanel>
);

registerPlugin( 'pre-publish-panel-test', {
	render: PluginPrePublishPanelTest,
} );
