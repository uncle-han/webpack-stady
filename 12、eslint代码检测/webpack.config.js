const { resolve } = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
			filename: 'js/build.js',
			path: resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				// 使用eslint-loader 依赖eslint这个库
				// eslint有一个很出名的风格库
				// eslint的配置项在package.json中设置
				/*
					"eslintConfig": {
						"extends": "airbnb-base"
					}
				*/
				// eslint-config-airbnb-base 依赖 eslint-plugin-import 和 eslint
				// 需要下载的库有 eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
			
				options: {
					fix: true
				}
			}
		]
	},
	plugins: [],
	mode: 'development'
}
