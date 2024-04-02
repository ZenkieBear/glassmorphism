const config = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    type: 'module'
  },
  env: {
    node: true,
    browser: true,
    
    // es6: true,
    // mocha: true,
    // jest: true,
    // jasmine: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/multi-word-component-names': 'off'
  },
};

module.exports = config
