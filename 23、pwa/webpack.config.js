const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
process.env.NODE_ENV = 'production'

// webpack开启PWA 渐进式网络开发应用程序(离线可访问)
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const CssLoader = [
    // 这里需要的loader为 style-loader(开发环境需要，生产就不用了), css-loader, less, less-loder, mini-css-extract-plugin
    // mini-css-extract-plugin提取样式，指定文件夹需要给插件配置filename来实现 如：{ filename: 'css/index.css }
    // MiniCssExtractPlugin.loader, // 将css提取出来成一个文件
    'style-loader',
    'css-loader', // 将css打包到js文件
    {
        loader: 'postcss-loader',
        options: {
            idnet: 'postcss',
            plugin: () => {
                /*
                    postcss-preset-env默认选择的是production环境，读取package.json文件里面browsersList中的配置
                    可以通过process.env.NODE_ENV = 'development'来指定环境，从而读取browsersList的配置
                */
                require('postcss-preset-env')();
            }
        }
    }
]

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
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
                test: /\.css$/,
                use: [
                    ...CssLoader,
                    'less-loader'
                ]
            },
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     // 有两个loader处理同一个文件的时候，就优先执行当前这个loader进行处理
            //     enforce: 'pre',
            //     /*
            //         为什么要优先执行eslint-loader?
            //         假如先执行babel-loader，生成的一些比较低级语法，如：将const 声明的变量改为var 会报声明不得当的错误
            //         先检查语法没有问题了，再转换成低级的语法
            //     */
            //     options: {
            //         fix: true // 自动修复错误
            //     }
            // },
            {
                // 这里需要的loader有 babel-loader @babel/presets-env @babel-core @babel/polyfill core-js
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
                exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'midea'
                }
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
        // new MiniCssExtractPlugin({
        //     filename: 'css/index.css'
        // }),
        // new OptimizeCssAssetsWebpackPlugin(), // 启用压缩css插件
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true, // 帮助serveWork快速启动
            skipWaiting: true  // 删除旧的serverWork
        })
    ]
}

