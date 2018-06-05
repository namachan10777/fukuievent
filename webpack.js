const Path = require('path');
const Webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	target: 'web',
	output: {
		filename: 'index.js',
		path: Path.resolve('dist')
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
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
