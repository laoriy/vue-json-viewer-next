// prod生产环境构建
const path = require('path');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
// https://github.com/webpack-contrib/terser-webpack-plugin/issues/335
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { name } = require('../src/package.json');

// https://stackoverflow.com/questions/47439067/uglifyjs-throws-unexpected-token-keyword-const-with-node-modules
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, '../dist/dist'),
        publicPath: '/dist/',
        filename: `${name}.min.js`,
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
    optimization: {
        minimize: true,
        // minimizer: [new TerserPlugin()],
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        // new UglifyJsPlugin({
        //     parallel: true,
        //     sourceMap: true,
        // }),

        new CompressionPlugin({
            filename: '[name].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
    ],
});
