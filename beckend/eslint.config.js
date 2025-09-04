// backend/eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,   // 👈 Node backend ke liye
      sourceType: 'module',
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ],
      'no-console': 'warn',   // 👈 Console logs detect karega
    },
  },
]
