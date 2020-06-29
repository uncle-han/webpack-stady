const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: { // 压缩html
                removeComments: true, // 去除注释
				collapseWhitespace: true, // 去除空格
            }
        }),
    ],
}

