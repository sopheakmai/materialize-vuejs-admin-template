<script setup lang="ts">
import { useTabs } from '@core/composable/useTabs'
import type { PropType } from 'vue'

const props = defineProps({
  // Tabs positioning
  alignTabs: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
    validator: (value: string) => ['start', 'center', 'end'].includes(value),
  },

  // Tab styles
  border: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  density: { type: String as PropType<'default' | 'comfortable' | 'compact'>, default: 'default' },
  grow: { type: Boolean, default: false },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  tabsBgColor: { type: String, default: undefined },
  tabsColor: { type: String, default: undefined },
  sliderColor: { type: String, default: undefined },

  // Feature toggles
  showMoreMenu: { type: Boolean, default: true },
  showPinAction: { type: Boolean, default: false }, // Pin functionality disabled

  // Keep-alive functionality
  keepAlive: { type: Boolean, default: true },

  // Maximum number of tabs to show
  // Set to 0 for unlimited tabs
  maxTabs: { type: Number, default: 30 },
})

const emit = defineEmits(['tab-removed', 'update:keepAlive', 'keep-alive-include', 'keep-alive-exclude'])
const { t } = useI18n()
const {
  tabs,
  activeTabId,
  closeTab,
  activateTab,
  closeAllTabs,
  closeOtherTabs,
  closeTabsToLeft,
  refreshCurrentTab,
  setMaxTabs,
} = useTabs()

// Set maximum tabs from props
setMaxTabs(props.maxTabs)

// Watch for changes to maxTabs prop
watch(() => props.maxTabs, (newValue) => {
  setMaxTabs(newValue)
})

// Handle tab closure with notification to parent
const handleTabClose = (tabId: string) => {
  // Get the tab before closing it
  const tabToClose = tabs.value.find(tab => tab.id === tabId)

  // Close the tab
  closeTab(tabId)

  // Notify parent component about tab removal
  if (tabToClose) {
    emit('tab-removed', tabToClose)
  }
}

// Close all tabs with parent notification
const handleCloseAllTabs = () => {
  // Notify parent about all tabs being closed
  tabs.value.forEach((tab) => {
    if (tab.closable) {
      emit('tab-removed', tab)
    }
  })
  closeAllTabs()
}

// Close other tabs with parent notification
const handleCloseOtherTabs = () => {
  // Notify parent about which tabs are being closed
  tabs.value.forEach((tab) => {
    if (tab.id !== activeTabId.value && tab.closable) {
      emit('tab-removed', tab)
    }
  })
  closeOtherTabs()
}

// Close tabs to the left with parent notification
const handleCloseTabsToLeft = (tabId: string) => {
  const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
  if (tabIndex > 0) {
    // Notify parent about which tabs are being closed
    tabs.value.slice(0, tabIndex).forEach((tab) => {
      if (tab.closable) {
        emit('tab-removed', tab)
      }
    })
  }
  closeTabsToLeft(tabId)
}

// Menu state
const menuState = ref({
  isOpen: false,
  x: 0,
  y: 0,
  tabId: '',
})

// Keep-alive state
const keepAliveEnabled = computed({
  get: () => props.keepAlive,
  set: (value) => {
    emit('update:keepAlive', value)
  },
})

// Toggle keep-alive functionality
const toggleKeepAlive = () => {
  keepAliveEnabled.value = !keepAliveEnabled.value
}

// Open context menu for a tab
const openTabMenu = (event: MouseEvent, tabId: string) => {
  event.preventDefault()
  menuState.value = {
    isOpen: true,
    x: event.clientX,
    y: event.clientY,
    tabId,
  }
}

// Two-way binding for active tab
const activeTabModel = computed({
  get: () => activeTabId.value,
  set: (val) => {
    if (val)
      activateTab(val)
  },
})
</script>

<template>
  <VCard
    v-if="tabs.length > 0"
    class="app-tabs-nav"
    flat
    :border="props.border"
    :color="props.color"
    :density="props.density"
  >
    <VTabs
      v-model="activeTabModel"
      :align-tabs="props.alignTabs"
      :bg-color="props.tabsBgColor"
      :color="props.tabsColor"
      :grow="props.grow"
      :slider-color="props.sliderColor"
      :direction="props.direction"
      show-arrows
    >
      <VTab
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
        class="tab-item d-flex align-center"
        :ripple="false"
        @contextmenu="openTabMenu($event, tab.id)"
      >
        <div class="d-flex align-center">
          <VIcon
            v-if="tab.icon"
            :icon="tab.icon"
            size="16"
            class="me-2"
          />
          <span class="tab-title" :class="{ 'tab-title-active': tab.id === activeTabModel }">
            {{ t(tab.title) }}
          </span>

          <!-- Tab actions -->
          <div class="tab-actions ms-2">
            <VIcon
              v-if="tab.closable && tabs.length > 1"
              icon="mdi-close"
              size="16"
              class="close-icon"
              @click.stop="handleTabClose(tab.id)"
            />
          </div>
        </div>
      </VTab>
    </VTabs>

    <!-- Context Menu for tabs -->
    <VMenu
      v-model="menuState.isOpen"
      :style="{ position: 'fixed', left: `${menuState.x}px`, top: `${menuState.y}px` }"
      location="bottom start"
      offset="0"
    >
      <VList density="compact">
        <VListItem
          prepend-icon="mdi-refresh"
          :title="t('Refresh Current Tab')"
          @click="refreshCurrentTab"
        />
        <VListItem
          :prepend-icon="keepAliveEnabled ? 'mdi-cached' : 'mdi-cached-off'"
          :title="t(keepAliveEnabled ? 'Disable Keep-Alive' : 'Enable Keep-Alive')"
          @click="toggleKeepAlive"
        />
        <VListItem
          prepend-icon="mdi-close-box-multiple"
          :title="t('Close All Tabs')"
          @click="handleCloseAllTabs"
        />
        <VListItem
          prepend-icon="mdi-arrow-left-box"
          :title="t('Close Tabs to the Left')"
          @click="handleCloseTabsToLeft(menuState.tabId)"
        />
      </VList>
    </VMenu>
  </VCard>
</template>

<style lang="scss">
.app-tabs-nav {
  position: relative;

  .v-tabs {
    flex-grow: 1;
  }

  .tab-item {
    position: relative;
    min-inline-size: 0;
    padding-inline: 1rem;

    .tab-title {
      display: inline-block;
      overflow: hidden;
      max-inline-size: 120px; /* Adjust this value based on your design */
      text-overflow: ellipsis;
      transition: max-inline-size 0.2s ease;
      vertical-align: middle;
      white-space: nowrap;
    }

    .tab-title-active {
      max-inline-size: 100%; /* Show full text when active */
    }

    .tab-actions {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover .tab-actions,
    &.v-tab--selected .tab-actions {
      opacity: 1;
    }

    .close-icon {
      cursor: pointer;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }

  .tab-more-btn {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: 0.5rem;
    transform: translateY(-50%);
  }
}
</style>
