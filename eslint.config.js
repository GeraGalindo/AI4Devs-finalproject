// @ts-check
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** Atributos JSX cuyo texto se muestra o se anuncia (DEV-038). */
const TEXT_ATTRIBUTES = '/^(aria-label|placeholder|title|alt)$/';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', 'backend/src/generated/**', 'e2e/test-results/**', 'e2e/playwright-report/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['backend/**/*.ts', 'e2e/**/*.ts', '*.js', 'frontend/vite.config.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['frontend/src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // DEV-038: ningún texto visible escrito directamente en JSX; todo pasa por t() y los catálogos
    // de frontend/src/locales/en. Excepciones: las pruebas y la vista técnica de diagnóstico de
    // DEV-001 (decisión D7), hasta que DEV-039 o DEV-006 la migren o la retiren.
    files: ['frontend/src/**/*.tsx'],
    ignores: ['frontend/src/**/*.test.tsx', 'frontend/src/test/**', 'frontend/src/features/diagnostics/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXText[value=/\\S/]',
          message: 'Visible text must come from the i18n catalogs: use t() (DEV-038).',
        },
        {
          selector: ":matches(JSXElement, JSXFragment) > JSXExpressionContainer > Literal[raw=/^['\"]/][value=/\\S/]",
          message: 'Visible text must come from the i18n catalogs: use t() (DEV-038).',
        },
        {
          selector:
            ':matches(JSXElement, JSXFragment) > JSXExpressionContainer > TemplateLiteral:has(TemplateElement[value.raw=/\\S/])',
          message: 'Visible text must come from the i18n catalogs: use t() (DEV-038).',
        },
        {
          // `alt=""` (imagen decorativa) sigue permitido: solo cuenta el texto no vacío.
          selector: `JSXAttribute[name.name=${TEXT_ATTRIBUTES}] > Literal[value=/\\S/]`,
          message: 'Accessible and visible attribute text must come from the i18n catalogs: use t() (DEV-038).',
        },
        {
          selector: `JSXAttribute[name.name=${TEXT_ATTRIBUTES}] > JSXExpressionContainer > :matches(Literal[raw=/^['"]/][value=/\\S/], TemplateLiteral:has(TemplateElement[value.raw=/\\S/]))`,
          message: 'Accessible and visible attribute text must come from the i18n catalogs: use t() (DEV-038).',
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
