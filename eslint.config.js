import process from 'node:process'
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    jsonc: true,
    unicorn: true,
    stylistic: true,
    ignores: [
      'src/plugins/iconify/*.js',
      'node_modules',
      'dist',
      '*.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'antfu/top-level-function': 'off',
      'style/indent': ['error', 2],
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/object-curly-spacing': ['error', 'always'],
      'style/semi': ['error', 'never'],
      'vue/multi-word-component-names': 'off',
      'no-restricted-imports': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/require-default-prop': 'off',
      'vue/valid-v-slot': 'off',
      'vue/no-required-prop-with-default': 'warn',
      'vue/custom-event-name-casing': 'off',
      'unicorn/no-new-array': 'error',
      'ts/consistent-type-definitions': ['error', 'type'],
      'style/quote-props': 0,
      'unused-imports/no-unused-vars': 0,
      'ts/no-unused-expressions': 0,
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
      'ts/no-redeclare': 'off',
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
)
