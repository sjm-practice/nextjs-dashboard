import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  ...nextConfig,
  // General rules (no type information required)
  {
    plugins: nextConfig[1].plugins,
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-console': 'warn',
    },
  },
  // Disable ESLint rules that conflict with Prettier (must come after other rule sets)
  prettierConfig,
  // Type-aware rules (requires TypeScript project info)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: nextConfig[1].plugins,
    languageOptions: {
      ...nextConfig[1].languageOptions,
      parserOptions: {
        ...nextConfig[1].languageOptions.parserOptions,
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
];

export default eslintConfig;
