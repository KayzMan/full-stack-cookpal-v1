import js from '@eslint/js';
import the_globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...the_globals.node,
        ...the_globals.es2025,
      },
    },
  },

  eslintConfigPrettier,
];
