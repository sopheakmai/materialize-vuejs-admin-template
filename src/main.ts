import { abilitiesPlugin } from '@casl/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/@fake-db/db'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import 'vue3-perfect-scrollbar/style.css'
import '@/plugins/iconify/icons-bundle.js'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

// Mount vue app
app.mount('#app')
