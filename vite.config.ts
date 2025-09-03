import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'src/styles/variables/_vuetify.scss',
      },
    }),
    Pages({
      dirs: ['./src/pages'],

      // ℹ️ We need three routes using single routes so we will ignore generating route for this SFC file
      onRoutesGenerated: routes => [
        // Email filter
        {
          path: '/apps/email/:filter',
          name: 'apps-email-filter',
          component: '/src/pages/apps/email/index.vue',
          meta: {
            navActiveLink: 'apps-email',
            layoutWrapperClasses: 'layout-content-height-fixed',
          },
        },

        // Email label
        {
          path: '/apps/email/label/:label',
          name: 'apps-email-label',
          component: '/src/pages/apps/email/index.vue',
          meta: {
            // contentClass: 'email-application',
            navActiveLink: 'apps-email',
            layoutWrapperClasses: 'layout-content-height-fixed',
          },
        },
        ...routes,
      ],
    }),
    Layouts({
      layoutsDirs: './src/layouts/',
    }),
    Components({
      dirs: ['src/@core/components', 'src/views/demos', 'src/components'],
      dts: 'types/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'],
      vueTemplate: true,
      dts: 'types/auto-imports.d.ts',
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
    }),
    DefineOptions(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      '@validators': fileURLToPath(new URL('./src/@core/utils/validators', import.meta.url)),
      'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    include: [
      'vuetify',
      'vuetify/components',
      'vuetify/directives',
      'vuetify/lib/iconsets/mdi',
      'vuetify/components/VApp',
      'vuetify/components/VBtn',
      'vuetify/components/VCard',
      'vuetify/components/VDialog',
      'vuetify/components/VTextField',
      'vuetify/components/VSelect',
      'vuetify/components/VMenu',
      'vuetify/components/VNavigationDrawer',
      'vuetify/components/VTable',
      'vuetify/components/VDataTable',
      'vuetify/components/VGrid',
      'vuetify/components/VAvatar',
      'vuetify/components/VChip',
      'vuetify/components/VImg',
      'vuetify/components/VBadge',
      'vuetify/components/VDivider',
      'vuetify/components/VList',
      'vuetify/components/VForm',
      'vuetify/components/VThemeProvider',
      'vuetify/components/transitions',
      'vue3-apexcharts',
      'webfontloader',
      '@iconify/vue',
      'axios-mock-adapter',
    ],
  },
})
