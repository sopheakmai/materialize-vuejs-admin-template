import antfu from '@antfu/eslint-config'
import process from 'node:process'

export default antfu(
  {
    vue: true,
    typescript: true,
    jsonc: true,
    unicorn: true,
    ignores: [
      'src/@iconify/*.js',
      'node_modules',
      'dist',
      '*.d.ts',
      'eslint-internal-rules',
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
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
)
