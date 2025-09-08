import type { RouteLocationNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
// Don't import useI18n here as it can't be used in a store

// Types for our tab items
export type TabItem = {
  id: string // Unique identifier foconsole.log(route)r the tab
  title: string // Display title
  titleKey?: string // i18n key for the title
  route: string // Full route path
  icon?: string // Optional icon
  closable: boolean // Whether tab can be closed
  meta?: Record<string, any> // Any additional meta information
}

export const useTabsStore = defineStore('tabs', () => {
  // State
  const tabs = ref<TabItem[]>([])
  const activeTabId = ref<string | null>(null)
  const maxTabs = ref(30)

  const router = useRouter()
  const activeTab = computed(() => tabs.value.find(tab => tab.id === activeTabId.value) || null)

  function addTab(route: RouteLocationNormalized, options: { closable?: boolean } = {}) {
    // Generate unique ID based on full path
    const id = route.fullPath

    // Check if tab already exists
    const existingTab = tabs.value.find(tab => tab.id === id)
    if (existingTab) {
      // If exists, just activate it and update meta if changed
      activeTabId.value = id
      console.log(route)
      // Update meta if it has changed
      if (route.meta && (!existingTab.meta || JSON.stringify(existingTab.meta) !== JSON.stringify(route.meta))) {
        existingTab.meta = { ...route.meta }

        // Update title if meta.title exists
        if (route.meta.title) {
          existingTab.titleKey = route.meta.title as string
        }
      }

      return
    }

    // Determine the best title for the tab
    const getTabTitle = (): { title: string, titleKey?: string } => {
      // Get i18n instance using the composable - note this only works in components
      let translatedTitle: string | undefined
      let foundTitleKey: string | undefined

      // Check if there's a custom i18n title key in meta
      if (route.meta?.titleKey) {
        foundTitleKey = route.meta.titleKey as string
        // We can't translate here because we're in a store, not a component
        // Translation will happen in updateTabTitles()
        return {
          title: route.meta.titleKey as string, // Use key as temporary title
          titleKey: foundTitleKey,
        }
      }

      // Check for common i18n patterns for pages
      const routeName = route.name?.toString() || ''
      const i18nMenuKey = `menu.${routeName.replace(/-/g, '_')}`

      // We'll store the i18n key but not translate yet
      foundTitleKey = i18nMenuKey

      // First try to get the title from meta
      if (route.meta?.title) {
        // If the title is a translation key (contains a dot), keep it as titleKey
        if (typeof route.meta.title === 'string' && route.meta.title.includes('.')) {
          foundTitleKey = route.meta.title as string
          return {
            title: route.meta.title as string,
            titleKey: foundTitleKey,
          }
        }
        return { title: route.meta.title as string }
      }

      // Then try to extract from the path - convert e.g. 'dashboards-analytics' to 'Analytics'
      if (route.name) {
        const name = route.name.toString()
        // If name has a dash, get the last part, e.g. 'dashboards-analytics' -> 'analytics'
        const namePart = name.includes('-') ? name.split('-').pop() || name : name

        // Try to find i18n key for the route name
        const nameKey = namePart.toLowerCase()
        foundTitleKey = nameKey

        // Fallback to capitalized name
        return {
          title: namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/-/g, ' '),
          titleKey: foundTitleKey,
        }
      }

      // Finally, try to extract from the path
      if (route.path) {
        const pathSegments = route.path.split('/').filter(Boolean)
        if (pathSegments.length > 0) {
          const lastSegment = pathSegments[pathSegments.length - 1]
          // Remove any parameter indicators like :id or numbers
          const cleanSegment = lastSegment.replace(/^:/, '').replace(/^\d+$/, '')
          if (cleanSegment) {
            return {
              title: cleanSegment.charAt(0).toUpperCase() + cleanSegment.slice(1).replace(/-/g, ' '),
            }
          }
        }
      }

      // If all else fails
      return { title: 'Untitled' }
    }

    // Get title information with possible i18n key
    const titleInfo = getTabTitle()

    // Create new tab object
    const newTab: TabItem = {
      id,
      title: titleInfo.title,
      titleKey: titleInfo.titleKey,
      route: route.fullPath,
      icon: route.meta?.icon as string | undefined,
      closable: options.closable !== undefined ? options.closable : true,
      meta: { ...route.meta },
    }

    // Add to tabs array
    tabs.value.push(newTab)

    // If maxTabs is 0, there's no limit
    // Otherwise, if we exceed max tabs, remove the oldest closable tab
    if (maxTabs.value > 0 && tabs.value.length > maxTabs.value) {
      const closableTabIndex = tabs.value.findIndex(tab => tab.closable)
      if (closableTabIndex !== -1)
        tabs.value.splice(closableTabIndex, 1)
    }

    // Set as active
    activeTabId.value = id
  }

  /**
   * Close a tab by id
   */
  function closeTab(tabId: string) {
    const index = tabs.value.findIndex(tab => tab.id === tabId)

    // If not found or not closable, do nothing
    if (index === -1 || !tabs.value[index].closable)
      return

    // Remove the tab
    tabs.value.splice(index, 1)

    // If it was the active tab, activate another one
    if (activeTabId.value === tabId) {
      // Try to activate the tab to the right, or if not available, to the left
      if (tabs.value[index]) {
        // There's a tab that replaced the position of the closed one
        activeTabId.value = tabs.value[index].id
      }
      else if (tabs.value[index - 1]) {
        // Activate the previous tab
        activeTabId.value = tabs.value[index - 1].id
      }
      else {
        // No tabs left
        activeTabId.value = null
      }

      // Navigate to the newly active tab if one exists
      if (activeTabId.value) {
        const newActiveTab = tabs.value.find(tab => tab.id === activeTabId.value)
        if (newActiveTab)
          router.push(newActiveTab.route)
      }
    }
  }

  /**
   * Activate a tab
   */
  function activateTab(tabId: string) {
    const tab = tabs.value.find(tab => tab.id === tabId)

    if (!tab)
      return

    activeTabId.value = tabId
    router.push(tab.route)
  }

  /**
   * Close all tabs except pinned ones
   */
  function closeAllTabs() {
    // Keep only non-closable (pinned) tabs
    tabs.value = tabs.value.filter(tab => !tab.closable)

    // Update active tab if needed
    if (activeTab.value === null || activeTab.value.closable) {
      activeTabId.value = tabs.value.length > 0 ? tabs.value[0].id : null

      // Navigate to the new active tab if one exists
      if (activeTabId.value) {
        const newActiveTab = tabs.value.find(tab => tab.id === activeTabId.value)
        if (newActiveTab)
          router.push(newActiveTab.route)
      }
    }
  }

  /**
   * Close other tabs except the current one and pinned ones
   */
  function closeOtherTabs() {
    if (!activeTabId.value)
      return

    // Keep the active tab and non-closable tabs
    tabs.value = tabs.value.filter(tab => tab.id === activeTabId.value || !tab.closable)
  }

  /**
   * Close tabs to the left of the specified tab, except pinned ones
   */
  function closeTabsToLeft(tabId: string) {
    const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)

    if (tabIndex === -1)
      return

    // Keep tabs that are either pinned or at/after the target tab's index
    tabs.value = tabs.value.filter((tab, index) => !tab.closable || index >= tabIndex)
  }

  /**
   * Pin/unpin a tab
   */
  function togglePinTab(tabId: string) {
    const tab = tabs.value.find(tab => tab.id === tabId)

    if (!tab)
      return

    // Toggle closable property
    tab.closable = !tab.closable
  }

  /**
   * Update tab info (for example, when route meta changes)
   */
  function updateTab(tabId: string, data: Partial<TabItem>) {
    const tab = tabs.value.find(tab => tab.id === tabId)

    if (!tab)
      return

    // Update tab properties
    Object.assign(tab, data)
  }

  /**
   * Update all tab titles based on current i18n locale
   * Call this function when the language changes or when needed
   *
   * @param translator - Function to translate strings using i18n
   */
  function updateTabTitles(translator: (key: string) => string) {
    for (const tab of tabs.value) {
      if (tab.titleKey) {
        tab.title = translator(tab.titleKey)
      }

      // Also update from route meta if available
      if (tab.meta?.title) {
        if (typeof tab.meta.title === 'string' && tab.meta.title.includes('.')) {
          tab.title = translator(tab.meta.title as string)
        }
        else {
          tab.title = tab.meta.title as string
        }
      }
    }
  }

  // Return store
  return {
    // State
    tabs,
    activeTabId,
    maxTabs,

    // Getters
    activeTab,

    // Actions
    addTab,
    closeTab,
    activateTab,
    closeAllTabs,
    closeOtherTabs,
    closeTabsToLeft,
    togglePinTab,
    updateTab,
    updateTabTitles,
  }
})
