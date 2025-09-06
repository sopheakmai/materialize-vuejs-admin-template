import { useTabsStore } from '@/stores/tabs'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTabsKeepAlive } from './useTabsKeepAlive'
import type { RouteLocationNormalized } from 'vue-router'

export function useTabs() {
  const tabsStore = useTabsStore()
  const router = useRouter()
  const { t } = useI18n()
  const { refreshTab, clearTabCache, clearAllTabsCache } = useTabsKeepAlive()

  // Routes that should not create tabs
  const excludedRoutes = [
    'login',
    'register',
    'forgot-password',
    'not-authorized',
    '404',
    'error',
  ]

  // Check if route should create a tab
  const shouldCreateTab = (route: RouteLocationNormalized): boolean => {
    // Skip if route name is in excluded list
    if (excludedRoutes.includes(String(route.name))) {
      return false
    }

    // Skip if route meta explicitly says no tab
    if (route.meta?.noTab === true) {
      return false
    }

    // Skip if it's a redirect route
    if (route.redirectedFrom) {
      return false
    }

    return true
  }

  // Initialize tabs system
  const initializeTabs = () => {
    // On initialization/reload, clear existing tabs and add only the current route as a tab
    tabsStore.clearTabs()

    // Add current route as the only tab if it should create one
    const currentRoute = router.currentRoute.value
    if (shouldCreateTab(currentRoute)) {
      tabsStore.addTab(currentRoute, t)
    }

    // Listen to route changes for future navigation
    router.afterEach((to) => {
      if (shouldCreateTab(to)) {
        tabsStore.addTab(to, t)
      }
    })
  }

  // Navigate to tab
  const navigateToTab = (tabId: string) => {
    const tab = tabsStore.getTabById(tabId)
    if (tab) {
      // Skip navigation if we're already on this tab
      if (tabsStore.activeTabId === tabId
        && router.currentRoute.value.name === tab.name) {
        return
      }

      tabsStore.switchToTab(tabId)
      router.push({
        name: tab.name,
        params: tab.params || {},
        query: tab.query || {},
        replace: true, // Use replace to avoid adding to browser history
      }).catch((err) => {
        console.error('Tab navigation error:', err)
        // If navigation fails, still update tab state
        tabsStore.switchToTab(tabId)
      })
    }
  }

  // Close tab and navigate appropriately
  const closeTabAndNavigate = (tabId: string) => {
    const tab = tabsStore.getTabById(tabId)
    if (tab && tab.closable) {
      const wasActive = tabsStore.activeTabId === tabId
      tabsStore.closeTab(tabId)

      // If we closed the active tab, navigate to the new active tab
      if (wasActive && tabsStore.activeTab) {
        router.push({
          name: tabsStore.activeTab.name,
          params: tabsStore.activeTab.params || {},
          query: tabsStore.activeTab.query || {},
          replace: true, // Use replace to avoid adding to browser history
        }).catch(err => console.error('Navigation error:', err))
      }
      else if (wasActive && tabsStore.tabs.length === 0) {
        // No tabs left, go to CRM dashboard
        router.push({ path: '/dashboards/crm', replace: true })
          .catch(err => console.error('Navigation error:', err))
      }
    }
  }

  // Close other tabs and navigate to kept tab
  const closeOtherTabsAndNavigate = (keepTabId: string) => {
    tabsStore.closeOtherTabs(keepTabId)
    navigateToTab(keepTabId)
  }

  // Close all tabs and navigate to home
  const closeAllTabsAndNavigate = () => {
    tabsStore.closeAllTabs()

    if (tabsStore.activeTab) {
      navigateToTab(tabsStore.activeTab.id)
    }
    else {
      router.push({ path: '/dashboards/crm', replace: true })
        .catch(err => console.error('Navigation error:', err))
    }
  }

  // Open new tab with route
  const openTab = (routeName: string, params?: Record<string, any>, query?: Record<string, any>) => {
    router.push({
      name: routeName,
      params: params || {},
      query: query || {},
      replace: false, // We want this one in history
    }).catch(err => console.error('Navigation error:', err))
  }

  // Refresh current tab
  const refreshCurrentTab = () => {
    const currentRoute = router.currentRoute.value
    if (shouldCreateTab(currentRoute)) {
      const tabId = tabsStore.generateTabId(currentRoute)

      // Mark tab for refresh in store
      tabsStore.markTabForRefresh(tabId)

      // Clear tab cache to force re-render
      clearTabCache(tabId)

      // Force re-render by navigating to the same route
      router.replace({
        name: String(currentRoute.name),
        params: currentRoute.params,
        query: { ...currentRoute.query, _refresh: Date.now() },
      })
    }
  }

  return {
    // Store access
    tabsStore,

    // Initialization
    initializeTabs,

    // Navigation
    navigateToTab,
    openTab,
    refreshCurrentTab,

    // Tab management
    closeTabAndNavigate,
    closeOtherTabsAndNavigate,
    closeAllTabsAndNavigate,

    // Keep alive
    refreshTab,
    clearTabCache,
    clearAllTabsCache,

    // Utilities
    shouldCreateTab,
  }
}
