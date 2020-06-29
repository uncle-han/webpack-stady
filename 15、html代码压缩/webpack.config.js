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
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true, // 去除注释
				collapseWhitespace: true, // 去除空格
				// 具体minify的配置，百度获取
			}
		})
	],
	// 压缩js代码，只需要将配置环境改为production环境
	mode: 'production' // production的环境自动压缩js代码
}