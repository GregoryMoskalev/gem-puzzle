module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint' ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:import/typescript',

    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};
