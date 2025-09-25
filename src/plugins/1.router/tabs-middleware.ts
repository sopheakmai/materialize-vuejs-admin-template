import { useTabsStore } from '@core/stores/tabs'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * Middleware to add routes to tabs when navigating
 */
export const tabsMiddleware = (to: RouteLocationNormalized) => {
  // Skip for auth pages or error pages
  if (
    to.meta.layout === 'blank'
    || to.path.includes('/login')
    || to.path.includes('/error')
    || to.path.includes('/not-authorized')
  ) {
    return
  }

  // Skip for specific routes that shouldn't be added to tabs
  if (to.meta.skipTab) {
    return
  }

  // If we should auto-add this route to tabs
  if (to.meta.addToTabs !== false) {
    // Get tabs store
    const tabsStore = useTabsStore()

    // Add this route to tabs
    tabsStore.addTab(to, {
      // If tab should be pinned
      closable: to.meta.pinTab !== true,
    })
  }
}
