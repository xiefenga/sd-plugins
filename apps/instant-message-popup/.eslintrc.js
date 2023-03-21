/* eslint-env node  */

module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['@0x1461a0/eslint-config/javascript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsx: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        '@0x1461a0/eslint-config/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  ignorePatterns: ['dist'],
}
