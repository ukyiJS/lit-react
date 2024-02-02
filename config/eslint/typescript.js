const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/member-ordering': [
      'error',
      { default: ['signature', 'field', 'constructor', 'method'] },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/block-spacing': 'error',
    '@typescript-eslint/brace-style': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/space-before-blocks': 'error',
    '@typescript-eslint/space-infix-ops': 'error',
  }
})