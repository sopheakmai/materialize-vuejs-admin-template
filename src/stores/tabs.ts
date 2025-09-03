import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export type Tab = {
  id: string
  title: string
  path: string
  name: string
  params?: Record<string, any>
  query?: Record<string, any>
  meta?: Record<string, any>
  closable: boolean
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as Tab[],
    activeTabId: '' as string,
  }),

  getters: {
    activeTab: state => state.tabs.find(tab => tab.id === state.activeTabId),
    tabsCount: state => state.tabs.length,
  },

  actions: {
    // Generate unique tab ID based on route
    generateTabId(route: RouteLocationNormalized): string {
      const params = Object.keys(route.params).length > 0 ? JSON.stringify(route.params) : ''
      const query = Object.keys(route.query).length > 0 ? JSON.stringify(route.query) : ''
      return `${String(route.name)}-${params}-${query}`
    },

    // Get tab title from route meta or name with i18n support
    getTabTitle(route: RouteLocationNormalized, t?: (key: string) => string): string {
      // Check if route has a custom title in meta
      if (route.meta?.title) {
        return route.meta.title as string
      }

      // Try to get i18n translation for route name
      if (route.name && t) {
        const routeKey = String(route.name).replace(/-/g, '_')
        const translationKey = `menu.${routeKey}`
        const translation = t(translationKey)

        // If translation exists and is different from the key, use it
        if (translation && translation !== translationKey) {
          return translation
        }
      }

      // Convert route name to readable title as fallback
      if (route.name) {
        return String(route.name)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      return 'Dashboard CRM'
    },

    // Check if tab is closable (home/dashboard tabs might not be closable)
    isTabClosable(route: RouteLocationNormalized): boolean {
      // Don't allow closing dashboard/home tabs
      const nonClosableRoutes = ['dashboards-crm', 'login', 'register']
      return !nonClosableRoutes.includes(String(route.name))
    },

    // Add or activate tab
    addTab(route: RouteLocationNormalized, t?: (key: string) => string) {
      const tabId = this.generateTabId(route)
      const existingTab = this.tabs.find(tab => tab.id === tabId)

      if (existingTab) {
        // Tab already exists, just activate it
        this.activeTabId = tabId
        return
      }

      // Create new tab
      const newTab: Tab = {
        id: tabId,
        title: this.getTabTitle(route, t),
        path: route.path,
        name: String(route.name),
        params: route.params,
        query: route.query,
        meta: route.meta,
        closable: this.isTabClosable(route),
      }

      this.tabs.push(newTab)
      this.activeTabId = tabId
    },

    // Close tab
    closeTab(tabId: string) {
      const tabIndex = this.tabs.findIndex(tab => tab.id === tabId)
      if (tabIndex === -1)
        return

      const tab = this.tabs[tabIndex]
      if (!tab.closable)
        return

      this.tabs.splice(tabIndex, 1)

      // If closing active tab, switch to another tab
      if (this.activeTabId === tabId) {
        if (this.tabs.length > 0) {
          // Switch to the tab before the closed one, or the first tab
          const newActiveIndex = Math.max(0, tabIndex - 1)
          this.activeTabId = this.tabs[newActiveIndex].id
        }
        else {
          this.activeTabId = ''
        }
      }
    },

    // Close other tabs (keep only the specified tab)
    closeOtherTabs(keepTabId: string) {
      this.tabs = this.tabs.filter(tab => tab.id === keepTabId || !tab.closable)
      this.activeTabId = keepTabId
    },

    // Close all closable tabs
    closeAllTabs() {
      const nonClosableTabs = this.tabs.filter(tab => !tab.closable)
      this.tabs = nonClosableTabs

      if (nonClosableTabs.length > 0) {
        this.activeTabId = nonClosableTabs[0].id
      }
      else {
        this.activeTabId = ''
      }
    },

    // Switch to tab
    switchToTab(tabId: string) {
      const tab = this.tabs.find(tab => tab.id === tabId)
      if (tab) {
        this.activeTabId = tabId
      }
    },

    // Get tab by ID
    getTabById(tabId: string): Tab | undefined {
      return this.tabs.find(tab => tab.id === tabId)
    },

    // Update tab title
    updateTabTitle(tabId: string, title: string) {
      const tab = this.tabs.find(tab => tab.id === tabId)
      if (tab) {
        tab.title = title
      }
    },

    // Reorder tabs
    reorderTabs(oldIndex: number, newIndex: number): void {
      if (oldIndex === newIndex || oldIndex < 0 || newIndex < 0
        || oldIndex >= this.tabs.length || newIndex >= this.tabs.length) {
        return
      }

      const tab = this.tabs.splice(oldIndex, 1)[0]
      this.tabs.splice(newIndex, 0, tab)
    },

    // Update tab meta
    updateTabMeta(tabId: string, meta: Record<string, any>): void {
      const tab = this.tabs.find(t => t.id === tabId)
      if (tab) {
        tab.meta = { ...tab.meta, ...meta }
      }
    },

    // Mark tab as modified
    markTabAsModified(tabId: string, modified = true): void {
      this.updateTabMeta(tabId, { modified })
    },

    // Set tab icon
    setTabIcon(tabId: string, icon: string): void {
      this.updateTabMeta(tabId, { icon })
    },
  },
})
