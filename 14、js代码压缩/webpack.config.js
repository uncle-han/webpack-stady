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
			template: './src/index.html'
		})
	],
	// 压缩js代码，只需要将配置环境改为production环境
	mode: 'production'
}