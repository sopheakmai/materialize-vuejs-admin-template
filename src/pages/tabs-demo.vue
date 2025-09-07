<script setup lang="ts">
import { i18nOptions } from '@/plugins/i18n'
import { useTabs } from '@core/composable/useTabs'
import { useTabsStore } from '@core/stores/tabs'
import { useI18n } from 'vue-i18n'

// Define route meta for this page
defineOptions({
  meta: {
    titleKey: 'tab_navigation_demo', // Use i18n key instead of static title
    icon: 'ri-tab-line', // Use ri- prefix for icons
    pinTab: true, // Pin this tab by default
    layout: 'default',
  },
})

const {
  tabs,
  activeTabId,
  activeTab,
  addRouteTab,
  closeTab,
  activateTab,
  togglePinTab,
  closeAllTabs,
  refreshCurrentTab,
  refreshTabTranslations,
} = useTabs()

const { t, locale } = useI18n()

// Available languages from the app
const availableLanguages = i18nOptions.map(lang => lang.i18nLang)

// Change app language
const changeLanguage = (lang: string) => {
  locale.value = lang
  // This will update tab titles based on the new locale
  refreshTabTranslations()
}

// Generate a random route for demo purposes
const getRandomRoute = () => {
  const routes = [
    '/dashboards/analytics',
    '/dashboards/crm',
    '/dashboards/ecommerce',
    '/apps/email',
    '/apps/chat',
    '/apps/calendar',
    '/apps/invoice/list',
    '/components/alert',
    '/components/avatar',
    '/components/badge',
  ]

  return routes[Math.floor(Math.random() * routes.length)]
}

// Add a demo tab with random route
const addDemoTab = () => {
  const route = getRandomRoute()

  // Create a tab with icon
  const tabsStore = useTabsStore()

  // First add the tab using the route
  addRouteTab(route)

  // Then update it with an icon if it's the active tab
  if (activeTab.value) {
    tabsStore.updateTab(activeTab.value.id, {
      icon: 'ri-dashboard-line', // Add icon using the ri- prefix
    })
  }
}

// Add a tab with i18n support using existing translations
const addI18nTab = async () => {
  // Use router to navigate to a route with i18n key in its name
  // This could be dashboard, analytics, etc. - any existing route with translations
  await addRouteTab('/dashboards/analytics')

  // Then update it with an icon if it's the active tab
  if (activeTab.value) {
    const tabsStore = useTabsStore()
    tabsStore.updateTab(activeTab.value.id, {
      icon: 'ri-translate-2', // Add icon using the ri- prefix
    })
  }
}

// Add a tab with a custom i18n title key
const addCustomTitleKeyTab = async () => {
  // Here we create a tab with a custom title key
  // We'll use the router to navigate, but we'll customize the tab after it's created
  const path = getRandomRoute()
  await addRouteTab(path)

  // Now, find the tab we just created (it should be the active one)
  if (activeTab.value) {
    // Update its title key to use our custom i18n key
    const tabsStore = useTabsStore()
    tabsStore.updateTab(activeTab.value.id, {
      titleKey: 'custom_tab_title',
      title: t('custom_tab_title'),
      icon: 'ri-key-line', // Add icon using the ri- prefix that's available
    })

    // Update all tab titles with translations
    refreshTabTranslations()
  }
}

// Pin/unpin the current tab
const pinCurrentTab = () => {
  if (activeTab.value) {
    togglePinTab(activeTab.value.id)
  }
}
</script>

<template>
  <VCard title="Tab Navigation System Demo">
    <VCardText>
      <p class="mb-4">
        This demo shows how to use the tab navigation system. You can use the buttons below to interact with tabs.
      </p>

      <div class="d-flex flex-wrap gap-4 mb-6">
        <VBtn
          color="primary"
          prepend-icon="ri-tab-plus"
          @click="addDemoTab"
        >
          Add Demo Tab
        </VBtn>

        <VBtn
          color="secondary"
          prepend-icon="ri-tab"
          :disabled="!activeTab"
          @click="pinCurrentTab"
        >
          Pin/Unpin Current Tab
        </VBtn>

        <VBtn
          color="info"
          prepend-icon="mdi-refresh"
          :disabled="!activeTab"
          @click="refreshCurrentTab"
        >
          Refresh Current Tab
        </VBtn>

        <VBtn
          color="error"
          prepend-icon="mdi-close-circle-multiple"
          @click="closeAllTabs"
        >
          Close All Tabs
        </VBtn>
      </div>

      <VDivider class="my-6" />

      <VAlert
        v-if="!activeTab"
        type="info"
        title="No Active Tab"
        text="Use the buttons above to add tabs and interact with them."
      />

      <div v-else>
        <h3 class="text-h5 mb-3">
          Current Tab Information
        </h3>

        <VList lines="two">
          <VListItem>
            <template #prepend>
              <VIcon
                :icon="activeTab.icon || 'ri-tab-line'"
                size="24"
                class="me-3"
              />
            </template>

            <VListItemTitle>{{ activeTab.title }}</VListItemTitle>
            <VListItemSubtitle>ID: {{ activeTab.id }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>Route</VListItemTitle>
            <VListItemSubtitle>{{ activeTab.route }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>Status</VListItemTitle>
            <VListItemSubtitle>
              <VChip
                :color="activeTab.closable ? 'error' : 'success'"
                size="small"
                class="me-2"
              >
                {{ activeTab.closable ? 'Closable' : 'Pinned' }}
              </VChip>
            </VListItemSubtitle>
          </VListItem>
        </VList>
      </div>

      <VDivider class="my-6" />

      <h3 class="text-h5 mb-3">
        {{ $t('i18n_tabs_demo') }}
      </h3>

      <div class="d-flex flex-wrap gap-4 mb-6">
        <VBtn
          color="info"
          prepend-icon="mdi-translate"
          @click="addI18nTab"
        >
          {{ $t('add_i18n_tab') }}
        </VBtn>

        <VBtn
          color="secondary"
          prepend-icon="mdi-key"
          @click="addCustomTitleKeyTab"
        >
          {{ $t('add_custom_key_tab') }}
        </VBtn>

        <VBtn
          v-for="lang in availableLanguages"
          :key="lang"
          :color="locale === lang ? 'primary' : ''"
          variant="outlined"
          @click="changeLanguage(lang)"
        >
          {{ lang.toUpperCase() }}
        </VBtn>
      </div>

      <VDivider class="my-6" />

      <h3 class="text-h5 mb-3">
        {{ $t('all_tabs', { count: tabs.length }) }}
      </h3>

      <div class="tabs-list">
        <VList>
          <VListItem
            v-for="tab in tabs"
            :key="tab.id"
            :active="tab.id === activeTabId"
            @click="activateTab(tab.id)"
          >
            <template #prepend>
              <VIcon
                :icon="tab.icon || 'ri-tab-line'"
                size="24"
                class="me-3"
              />
            </template>

            <VListItemTitle>{{ tab.title }}</VListItemTitle>
            <VListItemSubtitle>{{ tab.route }}</VListItemSubtitle>

            <template #append>
              <VChip
                v-if="!tab.closable"
                color="success"
                size="small"
                class="me-2"
              >
                Pinned
              </VChip>

              <VBtn
                v-if="tab.closable"
                icon
                variant="text"
                size="small"
                color="error"
                @click.stop="closeTab(tab.id)"
              >
                <VIcon icon="mdi-close" />
              </VBtn>
            </template>
          </VListItem>
        </VList>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.tabs-list {
  max-block-size: 300px;
  overflow-y: auto;
}
</style>
