/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const { WebWorkerPlugin } = require('@shopify/web-worker/webpack');
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

module.exports = {
	...defaultConfig,
	entry: {
		'js/editor': resolve( process.cwd(), 'src/js/editor.js' ),
		'css/editor': resolve( process.cwd(), 'src/css/editor.css' ),
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
