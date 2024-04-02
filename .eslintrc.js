const config = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        type: 'module',
    },
    env: {
        node: true,
        browser: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    rules: {
        'vue/multi-word-component-names': 'off',
    },
};

module.exports = config;
