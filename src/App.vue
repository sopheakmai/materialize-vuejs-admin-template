<script setup lang="ts">
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { useTabs } from '@/composables/useTabs'
import { hexToRgb } from '@layouts/utils'
import { useTheme } from 'vuetify'
import { onBeforeMount, onMounted } from 'vue'

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()

const { global } = useTheme()

// Initialize tabs system
const { initializeTabs } = useTabs()
const router = useRouter()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()

// Monitor page navigation and prevent unintended reloads
onBeforeMount(() => {
  // Listen for popstate events (browser back/forward)
  window.addEventListener('popstate', (e) => {
    e.preventDefault()
    if (router.currentRoute.value && router.currentRoute.value.path) {
      // Let Vue Router handle it instead of browser
      router.replace(router.currentRoute.value.path)
    }
  })

  // Add listener to prevent link clicks from causing page reloads
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const link = target.closest('a')

    // Skip if it's not a link or has specific attributes
    if (!link
      || !link.getAttribute('href')
      || link.getAttribute('target') === '_blank'
      || link.hasAttribute('download')
      || link.getAttribute('rel') === 'external') {
      return
    }

    const href = link.getAttribute('href')
    if (!href)
      return

    // Skip for javascript: links, hash links, and external links
    if (href.startsWith('javascript:')
      || href.startsWith('#')
      || href.startsWith('mailto:')
      || href.startsWith('tel:')
      || href.includes('://')) {
      return
    }

    // Handle internal links with Vue Router
    e.preventDefault()
    try {
      router.push(href).catch((err) => {
        console.warn('Navigation aborted:', err)
      })
    }
    catch (err) {
      console.error('Navigation error:', err)
    }
  }, true)
})

// Initialize tabs when app is mounted
onMounted(() => {
  initializeTabs()
})
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
