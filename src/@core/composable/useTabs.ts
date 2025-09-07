import { useTabsStore } from '@core/stores/tabs'
import { useI18n } from 'vue-i18n'
import type { RouteLocationNormalized } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

export function useTabs() {
  const tabsStore = useTabsStore()
  const route = useRoute()
  const router = useRouter()
  const { t, locale } = useI18n({ useScope: 'global' })
  
  // Update tab titles when locale changes
  watch(() => locale.value, () => {
    tabsStore.updateTabTitles(key => t(key))
  }, { immediate: true })
  
  /**
   * Add current route as a tab
   */
  const addCurrentRouteTab = (options: { closable?: boolean } = {}) => {
    tabsStore.addTab(route as RouteLocationNormalized, options)
    // Update translations immediately after adding
    tabsStore.updateTabTitles(key => t(key))
  }
  
  /**
   * Add a specific route as a tab
   */
  const addRouteTab = async (path: string, options: { closable?: boolean } = {}) => {
    // Resolve the route to get its metadata
    const resolvedRoute = router.resolve(path)
    
    // Add the tab
    tabsStore.addTab(resolvedRoute as RouteLocationNormalized, options)
    
    // Update translations immediately after adding
    tabsStore.updateTabTitles(key => t(key))
    
    // Navigate to the route
    await router.push(path)
  }
  
  /**
   * Close a tab and handle navigation
   */
  const closeTab = (tabId: string) => {
    tabsStore.closeTab(tabId)
  }
  
  /**
   * Activate a tab
   */
  const activateTab = (tabId: string) => {
    tabsStore.activateTab(tabId)
  }
  
  /**
   * Close all tabs except pinned ones
   */
  const closeAllTabs = () => {
    tabsStore.closeAllTabs()
  }
  
  /**
   * Close other tabs except the current one and pinned ones
   */
  const closeOtherTabs = () => {
    tabsStore.closeOtherTabs()
  }
  
  /**
   * Pin/unpin a tab
   */
  const togglePinTab = (tabId: string) => {
    tabsStore.togglePinTab(tabId)
  }
  
  /**
   * Refresh current tab
   */
  const refreshCurrentTab = async () => {
    if (tabsStore.activeTab) {
      // Use router to force a refresh by navigating to the same route
      await router.replace({
        path: route.path,
        query: { ...route.query, _refresh: Date.now().toString() },
      })
    }
  }
  
  /**
   * Manually refresh tab translations
   */
  const refreshTabTranslations = () => {
    tabsStore.updateTabTitles(key => t(key))
  }
  
  return {
    // Original store properties
    tabs: computed(() => tabsStore.tabs),
    activeTabId: computed(() => tabsStore.activeTabId),
    activeTab: computed(() => tabsStore.activeTab),
    maxTabs: computed(() => tabsStore.maxTabs),
    
    // Actions
    addCurrentRouteTab,
    addRouteTab,
    closeTab: tabsStore.closeTab,
    activateTab: tabsStore.activateTab,
    closeAllTabs: tabsStore.closeAllTabs,
    closeOtherTabs: tabsStore.closeOtherTabs,
    closeTabsToLeft: tabsStore.closeTabsToLeft,
    togglePinTab: tabsStore.togglePinTab,
    refreshCurrentTab,
    refreshTabTranslations,
    
    // i18n
    currentLocale: computed(() => locale.value),
    
    // Allow setting max tabs
    setMaxTabs: (max: number) => { tabsStore.maxTabs = max },
  }
}
