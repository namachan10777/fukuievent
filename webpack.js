const Path = require('path');
const Webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	target: 'web',
	output: {
		filename: 'renderer.js',
		path: Path.resolve('dist')
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test:/\.(ts|tsx)$/,
				use: [
					{loader: 'awesome-typescript-loader'}
				]
			}
		]
	},
	devtool: 'sourceMap'
}
