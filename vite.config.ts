import { fileURLToPath } from 'node:url'
import type { ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createVitePlugins } from './config/vite/index'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(env),
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@config': fileURLToPath(new URL('./config/', import.meta.url)),
        '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./src/assets/styles/variables/_template.scss', import.meta.url)),
      },
    },
    build: {
      chunkSizeWarningLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: [
              'vue',
              'vue-router',
              'pinia',
              'vue-i18n',
              '@vueuse/core',
            ],
            vuetify: [
              'vuetify',
            ],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './src/**/*.vue',
      ],
    },
  }
}
