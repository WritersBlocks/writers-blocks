const { resolve } = require( 'path' );

/**
 * External dependencies
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const { WebWorkerPlugin } = require('@shopify/web-worker/webpack');

module.exports = {
	...defaultConfig,
	entry: {
		'js/editor': path.resolve( process.cwd(), 'src/js/editor.js' ),
		'css/editor': path.resolve( process.cwd(), 'src/css/editor.css' ),
	},
	output: {
		...defaultConfig.output,
		clean: true,
		chunkFilename: 'js/[name].[contenthash].chunk.js',
	},
	plugins: [
		...defaultConfig.plugins,
		new RemoveEmptyScriptsPlugin(),
		new WebWorkerPlugin({
			filename: 'js/[name].[contenthash].worker.js',
		}),
	],
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							plugins: [ require.resolve( '@shopify/web-worker/babel' ) ],
						},
					},
				],
			},
		],
	},
};
