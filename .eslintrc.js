module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        '@react-native-community',
        'prettier', // 放后面的优先级高
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react-hooks', '@typescript-eslint'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'jsx-quotes': ['error', 'prefer-single'],
        'no-undef': [0], // types 里不一定需要引入 React 就可以作为类型
        '@typescript-eslint/no-var-requires': [0],
        curly: [2, 'multi-line'],
        // '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': [0], // 函数不一定要自己写返回类型，又 TS 自动推导
        '@typescript-eslint/no-explicit-any': [0], // 有时需要用到 any，如函数 isFunction 的参数
        '@typescript-eslint/ban-types': [0], // 可以使用内置类型，如 isFunction 函数需要返回 is Function
    },
};
