
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@0x1461a0/eslint-config/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'brace-style': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    camelcase: 'off',
  },
  ignorePatterns: ['dist'],
}
