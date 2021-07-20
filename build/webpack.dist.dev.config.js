// dev生产环境构建
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { name } = require('../src/package.json');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, '../dist/dist'),
        publicPath: '/dist/',
        filename: `${name}.js`,
        library: `${name}`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        },
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            dry: false,
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
        }),
    ],
});
