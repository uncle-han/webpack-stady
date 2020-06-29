const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/build.js',
		path: resolve(__dirname, 'dist')
	},
	module: {
		/*
			js兼容性处理，
			1、基本的语法处理 babel-loader, @babel/core @babel/preset-env
			2、解决全部的语法兼容问题 babel-loader, @babel/core @babel/preset-env @babel/polyfill
				使用方式：
					在入口文件引人 @babel/polyfill
				把@bable/polyfill所有的解决兼容的语法都引进打包文件
				问题：打包文件体积过大，不是所有的兼容性问题都需要解决
		*/ 
		// rules: [{
		// 	test: /\.js$/,
		// 	loader: 'babel-loader',
		// 	options: {
		// 		presets: ['@babel/preset-env']
		// 	}
		// }]

		// 3、按需引人 babel-loader, @babel/core @babel/preset-env core-js
		   // **** 不需要在 打包的文件里面引人@babel-polyfill
		rules: [
			[
				'@babel/preset-env',
				{
					useBuilIns: 'usage',
					core: {
						version: 3
					},
					targets: {
						chrome: '60',
						firefox: '60',
						ie: '9',
						safari: '10',
						eage: '17'
					}
				}
			]
		]

	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
}