const path = require('path');
const aliasMapJson = require('./alias.json');

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

// eslint用于规范代码,请勿随意更改配置
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  ignorePatterns: ['build', 'dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: aliasMapJson.map(([alias, relativePath]) => {
          return [alias, resolvePath(relativePath)];
        }),
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'no-restricted-exports': 0,
    'react/function-component-definition': 0,
    'no-unused-expressions': 0,
    'react/jsx-no-bind': 0,
    'import/no-cycle': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'default-param-last': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-use-before-define': 0,
    'react/display-name': 0,
    'no-restricted-syntax': 0,

    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off', // It would be better to enable this rule.
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': 'off', // Doesn't play nicely with Windows
    'no-nested-ternary': 'off',
    'operator-linebreak': 'off',
    'quote-props': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    semi: ['warn', 'never'],
  },
};
