const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './lib/index',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    // 自动删除console.log
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'],
                    },
                },
                parallel: true,
            })
        ],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'JsonViewNext',
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
        modules: [
            'node_modules'
        ]
    },
    externals: {
        vue: 'vue',
        'core-js': 'core-js',
        clipboard: 'clipboard'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
