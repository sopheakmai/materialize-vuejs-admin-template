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
      @update:model-value="(val: any) => onTabChange(val as string)"
    >
      <VTab
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
        class="tab-item d-flex align-center"
        :ripple="false"
        @click="openTabMenu($event, tab.id)"
      >
        <div class="d-flex align-center">
          <VIcon
            v-if="tab.icon"
            :icon="tab.icon"
            size="16"
            class="me-2"
          />
          
           <VMenu
      v-model="menuState.isOpen"
      close-on-content-click
    >
      <template v-slot:activator="{ props }">
        <span class="tab-title" :class="{ 'tab-title-active': tab.id === activeTabModel }">
            {{ t(tab.title) }}
          </span>
      </template>
      <VList density="compact">
        <VListItem
          prepend-icon="mdi-refresh"
          :title="t('Refresh Current Tab')"
          @click="refreshCurrentTab"
        />
        <VListItem
          prepend-icon="mdi-close-box-multiple"
          :title="t('Close All Tabs')"
          @click="closeAllTabs"
        />
        <VListItem
          prepend-icon="mdi-arrow-left-box"
          :title="t('Close Tabs to the Left')"
          @click="closeTabsToLeft(menuState.tabId)"
        />
      </VList>
    </VMenu>
          
          <!-- Pin/Close actions -->
          <div class="tab-actions ms-2">
            <VIcon
              v-if="tab.closable && showPinAction"
              icon="mdi-pin-outline"
              size="16"
              class="pin-icon mr-1"
              @click.stop="togglePinTab(tab.id)"
            />
            <VIcon
              v-if="!tab.closable && showPinAction"
              icon="mdi-pin"
              size="16"
              class="pin-icon mr-1"
              @click.stop="togglePinTab(tab.id)"
            >
              <template #default></template>
            </VIcon>
            <VIcon
              v-if="tab.closable && tabs.length > 1"
              icon="mdi-close"
              size="16"
              class="close-icon"
              @click.stop="closeTab(tab.id)"
            />
          </div>
        </div>
      </VTab>
    </VTabs>
    
    <!-- Context Menu for tabs -->
   
  </VCard>
</template>

<script setup lang="ts">
import { useTabs } from '@core/composable/useTabs'
import type { PropType } from 'vue'

const { t } = useI18n()
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
  showPinAction: { type: Boolean, default: true },
  showMoreMenu: { type: Boolean, default: true },
  
  // Maximum number of tabs to show
  maxTabs: { type: Number, default: 10 },
})

const {
  tabs,
  activeTabId,
  closeTab,
  activateTab,
  togglePinTab,
  closeAllTabs,
  closeOtherTabs,
  closeTabsToLeft,
  refreshCurrentTab,
  setMaxTabs,
} = useTabs()

// Set maximum tabs from props
setMaxTabs(props.maxTabs)

// Menu state
const menuState = ref({
  isOpen: false,
  x: 0,
  y: 0,
  tabId: '',
})

// Open context menu for a tab
const openTabMenu = (event: MouseEvent, tabId: string) => {
  // Don't open menu if clicking on an icon
  if ((event.target as HTMLElement).closest('.tab-actions')) {
    return
  }
  
  // Show the context menu
  menuState.value = {
    isOpen: true,
    x: event.clientX,
    y: event.clientY,
    tabId,
  }
  
  // Let the default tab activation happen
  // No need to prevent default or stop propagation
  // The tab will be activated by the v-tabs component
}

// Two-way binding for active tab
const activeTabModel = computed({
  get: () => activeTabId.value,
  set: val => {
    if (val) activateTab(val)
  },
})

// Handle tab change
const onTabChange = (tabId: string) => {
  activateTab(tabId)
}
</script>

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

    .close-icon,
    .pin-icon {
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
