const { presets, configure } = require('eslint-kit')

/** @type {import('eslint-kit').Linter.Config} */
module.exports = configure({
  presets: [
    presets.typescript(),
    presets.prettier(),
    presets.node(),
    presets.react({ version: '18.0' }),
    presets.imports({ sort: { newline: true } })
  ],
  extend: {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'perfectionist'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-enums': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-objects': 'error'
    }
  },
  extends: [
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:perfectionist/recommended-natural',
    'plugin:perfectionist/recommended-line-length'
  ]
})
