/**
 * External dependencies
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

module.exports = {
	...defaultConfig,

	entry: {
		'js/editor' : path.resolve( process.cwd(), 'src/js/editor.js' ),
		'css/editor': path.resolve( process.cwd(), 'src/css/editor.css' ),
	},

	plugins: [
		...defaultConfig.plugins,

		new RemoveEmptyScriptsPlugin(),
	],
};
