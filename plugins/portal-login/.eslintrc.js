/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  globals: {
    process: true,
    require: true,
    RequestInit: true,
  },
  extends: [
    '@0x1461a0/eslint-config/react-ts',
  ],
  rules: {
    'no-undef': 'off',
    'camelcase': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  ignorePatterns: ['dist'],
}