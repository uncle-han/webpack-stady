const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    // 'style-loader', // 以前的方式， 用新建一个style标签，将字符串的css放到style标签里面
                    MiniCssExtractPlugin.loader, // 这个插件是将打包在build.js里面的css提取成一个单独的文件
                    'css-loader' // 将css打包进入build.js文件，以字符串的形式
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 解决闪动的问题，闪动的问题产生的原因是生成html结构，style-loader将css放到style标签里面，渲染一遍页面，就会出现闪动
        new MiniCssExtractPlugin({
            filename: '/css/index.css'
        }) 
    ]
};
