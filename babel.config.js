module.exports = {
    presets: [
        [
            '@babel/env',
            {
                loose: true,
                modules: false,
            },
        ]
    ],
    plugins: ['@vue/babel-plugin-jsx', '@babel/transform-runtime']
};
