module.exports = {
  extends: [
    'eslint-config-lit-react-example/base',
    'eslint-config-lit-react-example/typescript',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
  ],
};
