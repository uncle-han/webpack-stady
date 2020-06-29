const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 2 * 1024,
                    name: '[hash:5].[ext]',
                    outputPath: 'img'
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(css|js|less|jpg|png|gif|html)/,
                loader: 'file-loader',
                // 其他
                options: {
                    outputPath: 'other',
                    name: '[hash:5].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    }
};
