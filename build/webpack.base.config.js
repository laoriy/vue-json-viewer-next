// 基础配置
const { VueLoaderPlugin } = require('vue-loader');

const tsLoaders = [
    {
        loader: 'cache-loader',
        options: {},
    },

    {
        loader: 'babel-loader',
        options: {},
    },
]

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts)$/,
                use: [
                    ...tsLoaders,
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
                test: /\.(tsx)$/,
                use: [
                    ...tsLoaders,
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsxSuffixTo: [/\.vue$/],// 支持vue中使用tsx语法
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
