/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    '@0x1461a0/eslint-config/typescript',
  ],
  rules: {
    'no-undef': 'off',
    'camelcase': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  'ignorePatterns': ['lib'],
}