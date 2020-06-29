const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
process.env.NODE_ENV = 'development'

const CssLoader = [
    // 这里需要的loader为 style-loader(开发环境需要，生产就不用了), css-loader, less, less-loder, mini-css-extract-plugin
    // mini-css-extract-plugin提取样式，指定文件夹需要给插件配置filename来实现 如：{ filename: 'css/index.css }
    // MiniCssExtractPlugin.loader, // 将css提取出来成一个文件
    'style-loader',
    // {
    //     loader: 'postcss-loader',
    //     options: {
    //         ident: 'postcss',
    //         plugin: () => {
    //             /*
    //                 postcss-preset-env默认选择的是production环境，读取package.json文件里面browsersList中的配置
    //                 可以通过process.env.NODE_ENV = 'development'来指定环境，从而读取browsersList的配置
    //             */
    //             require('postcss-preset-env')();
    //         }
    //     }
    // },
    'css-loader', // 将css打包到js文件
]

module.exports = {
    entry: './src/index.js',
    // entry: ['./src/index.js', './src/index.html'], // 实现html的热更新，将要更新的html文件作为入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                /*
                    oneOf的概念：只会执行一个loader，改loader执行完了，就不会往下走
                    当匹配到了.png这个文件，要用url-loader来处理，url-loader处理完了，就不再往下走
                    当匹配到了.html文件结尾的文件，用html-loader来处理，html-loader处理完了，就不再往下走,
                    注意的问题：
                    当有多个loader处理一个文件的时候，要将其他loader在oneOf里面提取出来，放在和oneOf同级
                */
                oneOf: [
                    {
                        // 处理图片 需要到url-loader  file-lodaer(url-loader的依赖)
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024, // 对小于8kb的进行BSsh64处理
                            filename: '[hash:8].[ext]', // 生成的文件名，hash支取8位，再加上文件的扩展名
                            esModule: false // 关闭es6模块，开启commentjs模块，配合html-loader来处理
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.css$/,
                        use: [
                            ...CssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...CssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        // 这里需要的loader有 babel-loader @babel/preset-env @babel-core @babel/polyfill core-js
                        // @babel/polyfill 在入口文件引人，实现完全语法兼容
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '50',
                                            ie: '8'
                                        }
                                    }
                                ]
                            ]
                        }
                        
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: { // 压缩html
                removeComments: true, // 去除注释
				collapseWhitespace: true, // 去除空格
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        }),
        new OptimizeCssAssetsWebpackPlugin() // 启用压缩css插件
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
        hot: true
    }
}

