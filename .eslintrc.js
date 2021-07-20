// eslint配置
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: 0,
        'linebreak-style': 0,
        'no-trailing-spaces': 0,
        'class-methods-use-this': 0,
        'import/prefer-default-export': 0,
        'no-restricted-syntax': 0,
        'no-tabs': 0,
        'import/no-unresolved': 0,
        'no-underscore-dangle': 0,
        'comma-dangle': 'off',
        'max-len': 'off',
        camelcase: 'off',
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        'guard-for-in': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/no-extraneous-dependencies': 0,
        'function-paren-newline': 0,
        'import/extensions': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 2,

        // 不安全项
        'no-param-reassign': 0,

        'no-dupe-class-members': 2,
        // 提示警告
        'no-return-await': 1,
        'import/no-cycle': 1,
        'no-nested-ternary': 1,
        'no-new-func': 1,
        'vue/no-side-effects-in-computed-properties': 1,
        'vue/valid-template-root': 1,
        'no-continue': 1,
        'operator-assignment': 1,
        'no-bitwise': 1,

        // TODO:待修改
        'prefer-destructuring': 2,
        'array-callback-return': 2,
        'func-names': 2,
        'no-plusplus': 2,
        'no-shadow': 2,
        'no-mixed-operators': 2,
        'no-fallthrough': 2,
        'default-case': 2,
        'no-useless-constructor': 2,
        'no-unused-expressions': 2,
        // 关闭iview input组件，col组件个别标签报错
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        // 保证js、ts项目arrow风格一致
        'arrow-parens': [2, 'always', { requireForBlockBody: false }],
        'implicit-arrow-linebreak': [0, 'beside'],
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
