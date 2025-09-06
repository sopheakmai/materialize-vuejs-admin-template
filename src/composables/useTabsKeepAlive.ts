import { useTabsStore } from '@/stores/tabs'
import { keepAliveConfig } from '@/config/keepAlive'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useTabsKeepAlive() {
  const tabsStore = useTabsStore()
  const router = useRouter()

  // Track which tab components are cached
  const cachedTabs = ref<Set<string>>(new Set())

  // Initialize with current tabs
  const initializeCache = () => {
    cachedTabs.value = new Set(
      tabsStore.tabs
        .filter(tab => !keepAliveConfig.excludedRoutes.includes(tab.name))
        .map(tab => tab.id),
    )
  }

  // Watch for tab additions and removals
  watch(() => tabsStore.tabs, (newTabs) => {
    // Add new tabs to cache
    newTabs.forEach((tab) => {
      if (!keepAliveConfig.excludedRoutes.includes(tab.name)) {
        cachedTabs.value.add(tab.id)
      }
    })

    // Clean up cache for tabs that no longer exist
    const currentTabIds = new Set(newTabs.map(tab => tab.id))
    cachedTabs.value.forEach((tabId: string) => {
      if (!currentTabIds.has(tabId)) {
        cachedTabs.value.delete(tabId)
      }
    })
  }, { deep: true })

  // Force re-render of component without losing state
  const refreshTab = (tabId: string) => {
    const tab = tabsStore.getTabById(tabId)
    if (tab) {
      router.replace({
        name: tab.name,
        params: tab.params || {},
        query: { ...tab.query, _refresh: Date.now() },
      })
    }
  }

  // Clear cache for a specific tab
  const clearTabCache = (tabId: string) => {
    if (cachedTabs.value.has(tabId)) {
      cachedTabs.value.delete(tabId)
      const tab = tabsStore.getTabById(tabId)
      if (tab && !keepAliveConfig.excludedRoutes.includes(tab.name)) {
        refreshTab(tabId)
        setTimeout(() => {
          cachedTabs.value.add(tabId)
        }, 100)
      }
    }
  }

  // Clear all cached tabs
  const clearAllTabsCache = () => {
    cachedTabs.value.clear()
    setTimeout(initializeCache, 100)
  }

  // Initialize on creation
  initializeCache()

  return {
    cachedTabs,
    refreshTab,
    clearTabCache,
    clearAllTabsCache,
  }
}
