module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'standard-with-typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules/*',
    'dist/*',
    'jest.config.js',
    'tests/*',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-duplicate-imports': 'error',
    'no-self-compare': 'error',
    'no-plusplus': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // eslint-disable-next-line quote-props
    eqeqeq: 'error',
    // eslint-disable-next-line quote-props
    camelcase: 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
};
