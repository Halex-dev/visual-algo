import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import vueParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['**/dist/**'] },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: 'module' }
    }
  },
  { ignores: ['**/dist/**', '**/node_modules/**', '**/build/**', '**/src/components/preset/**'] },
  eslintConfigPrettier,
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      // Disabilitato per convenzione di nomi a parola singola nei componenti Vue
      '@typescript-eslint/no-non-null-assertion': 0,
      'prettier/prettier': [
        'warn',
        {
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          quoteProps: 'as-needed',
          jsxSingleQuote: false,
          trailingComma: 'none',
          bracketSpacing: true,
          bracketSameLine: true,
          arrowParens: 'always',
          proseWrap: 'preserve',
          htmlWhitespaceSensitivity: 'ignore',
          endOfLine: 'auto',
          vueIndentScriptAndStyle: true
        }
      ],
      // Disabilitato per tollerare uso esplicito di `any` in codice legacy
      '@typescript-eslint/no-explicit-any': 0,
      // Disabilitato per convenzione di nomi a parola singola nei componenti Vue
      'vue/multi-word-component-names': 0,
      'vue/no-lone-template': 0,
      'vue/v-on-event-hyphenation': ['warn', 'never', { autofix: true }],
      'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/script-indent': 'off'
    }
  }
];
