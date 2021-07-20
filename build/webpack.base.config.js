// 基础配置
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');


function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {},
                    },
                    {
                        loader: 'babel-loader',
                        options: {},
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/],
                            happyPackMode: false,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 不超过15k
                            limit: 15360,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue', '.json', '.less'],
    },
    plugins: [new VueLoaderPlugin()],
};
