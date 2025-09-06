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
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href')
      if (href
        && !link.getAttribute('target')
        && !link.hasAttribute('download')
        && !href.startsWith('javascript:')
        && !href.startsWith('#')) {
        e.preventDefault()
        if (!href.includes('://')) {
          router.push(href)
        }
      }
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
