import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          semi: false,
          singleQuote: true,
          jsxSingleQuote: false,
          trailingComma: 'none',
          bracketSpacing: true,
          endOfLine: 'auto'
        }
      ]
    }
  }
]
