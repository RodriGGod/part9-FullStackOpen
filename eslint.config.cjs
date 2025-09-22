// eslint.config.cjs
module.exports = [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 11
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      // === reglas pedidas ===
      'semi': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-case-declarations': 'off'
    }
  }
];
