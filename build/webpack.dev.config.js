// 本地开发预览
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        main: './examples/main',
        vendors: ['vue'],
    },
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    optimization: {
        splitChunks: {
            name: 'vendors',
            filename: 'vendor.bundle.js',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../examples/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html'),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '../examples/dist'),
        compress: true,
        open: true,
        port: 9090
    },
});
