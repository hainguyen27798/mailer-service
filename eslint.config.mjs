import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier: eslintPluginPrettier,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    extends: ['js/recommended', eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': ['error'],
      'import/extensions': 'off',
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'import/prefer-default-export': 'off',
      'import/no-named-as-default': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/order': 'off',
      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
