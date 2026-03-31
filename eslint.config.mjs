import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  // General rules (no type information required)
  {
    plugins: {
      ...nextVitals[1].plugins,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-console': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  // Disable ESLint rules that conflict with Prettier (must come after other rule sets)
  prettierConfig,
  // Type-aware rules (requires TypeScript project info)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: nextVitals[1].plugins,
    languageOptions: {
      ...nextVitals[1].languageOptions,
      parserOptions: {
        ...nextVitals[1].languageOptions.parserOptions,
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
]);

export default eslintConfig;
