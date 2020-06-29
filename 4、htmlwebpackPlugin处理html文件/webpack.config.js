const path = require('path');
// 生成一份html文件，生成的文件自动引人其他文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 如果不加template，打包出来的html文件，没有内容，加了template的参数，指向模板文件，则生成和模板html文件一样
            template: './src/index.html'
        })
    ]
}