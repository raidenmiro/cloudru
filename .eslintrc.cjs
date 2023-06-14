const { presets, configure } = require('eslint-kit')

/** @type {import('eslint-kit').Linter.Config} */
module.exports = configure({
  presets: [
    presets.typescript(),
    presets.prettier(),
    presets.node(),
    presets.react({ version: '18.0' })
  ],
  extend: {
    plugins: ['@typescript-eslint', 'perfectionist'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'perfectionist/sort-interfaces': 'error'
    }
  },
  extends: [
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:perfectionist/recommended-natural',
    'plugin:perfectionist/recommended-line-length'
  ]
})
