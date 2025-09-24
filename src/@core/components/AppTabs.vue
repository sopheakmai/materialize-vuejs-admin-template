<script setup lang="ts">
import { useTabs } from '@core/composable/useTabs'

type TabsProps = {
  alignTabs?: 'start' | 'center' | 'end'
  border?: boolean
  color?: string
  density?: 'default' | 'comfortable' | 'compact'
  grow?: boolean
  direction?: 'horizontal' | 'vertical'
  tabsBgColor?: string
  tabsColor?: string
  sliderColor?: string
  elevation?: number
  rounded?: string
  showMoreMenu?: boolean
  showPinAction?: boolean
  closeLeftTabs?: boolean
  closeRightTabs?: boolean
  closeOtherTabs?: boolean
  keepAlive?: boolean
  maxTabs?: number
}

type TabEmits = {
  (event: 'tab-removed', tab: Tab): void
  (event: 'update:keepAlive', value: boolean): void
  (event: 'keep-alive-include', value: string[]): void
  (event: 'keep-alive-exclude', value: string[]): void
}

type Tab = {
  id: string
  title: string
  icon?: string
  closable?: boolean
}

type MenuState = {
  isOpen: boolean
  x: number
  y: number
  tabId: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  alignTabs: 'start',
  border: false,
  color: undefined,
  density: 'default',
  grow: false,
  direction: 'horizontal',
  tabsBgColor: undefined,
  tabsColor: undefined,
  sliderColor: undefined,
  elevation: 0,
  rounded: 'sm',
  showMoreMenu: true,
  showPinAction: false,
  closeLeftTabs: false,
  closeRightTabs: true,
  closeOtherTabs: true,
  keepAlive: true,
  maxTabs: 30,
})

const emit = defineEmits<TabEmits>()
const { t } = useI18n()
const {
  tabs,
  activeTabId,
  closeTab,
  activateTab,
  closeAllTabs,
  closeOtherTabs,
  closeTabsToLeft,
  closeTabsToRight,
  refreshCurrentTab,
  setMaxTabs,
} = useTabs()

setMaxTabs(props.maxTabs)

watch(() => props.maxTabs, (newValue: number) => {
  setMaxTabs(newValue)
})

const handleTabClose = (tabId: string): void => {
  const tabToClose = tabs.value.find((tab: Tab) => tab.id === tabId)
  closeTab(tabId)

  if (tabToClose) {
    emit('tab-removed', tabToClose)
  }
}

const handleCloseAllTabs = (): void => {
  tabs.value.forEach((tab: Tab) => {
    if (tab.closable && tab.id !== activeTabId.value) {
      emit('tab-removed', tab)
    }
  })
  closeOtherTabs()
}

const handleCloseOtherTabs = (): void => {
  tabs.value.forEach((tab: Tab) => {
    if (tab.id !== activeTabId.value && tab.closable) {
      emit('tab-removed', tab)
    }
  })
  closeOtherTabs()
}

const handleCloseTabsToLeft = (tabId: string): void => {
  const tabIndex = tabs.value.findIndex((tab: Tab) => tab.id === tabId)
  if (tabIndex > 0) {
    tabs.value.slice(0, tabIndex).forEach((tab: Tab) => {
      if (tab.closable) {
        emit('tab-removed', tab)
      }
    })
  }
  closeTabsToLeft(tabId)
}

const handleCloseTabsToRight = (tabId: string): void => {
  const tabIndex = tabs.value.findIndex((tab: Tab) => tab.id === tabId)
  if (tabIndex >= 0 && tabIndex < tabs.value.length - 1) {
    tabs.value.slice(tabIndex + 1).forEach((tab: Tab) => {
      if (tab.closable) {
        emit('tab-removed', tab)
      }
    })
  }
  closeTabsToRight(tabId)
}

const menuState = ref<MenuState>({
  isOpen: false,
  x: 0,
  y: 0,
  tabId: '',
})

const keepAliveEnabled = computed<boolean>({
  get: () => props.keepAlive,
  set: (value: boolean) => {
    emit('update:keepAlive', value)
  },
})

const openTabMenu = (event: MouseEvent, tabId: string): void => {
  event.preventDefault()
  menuState.value = {
    isOpen: true,
    x: event.clientX,
    y: event.clientY,
    tabId,
  }
}

const activeTabModel = computed<string | undefined>({
  get: () => activeTabId.value,
  set: (val: string | undefined) => {
    if (val) {
      activateTab(val)
    }
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
    :elevation="props.elevation"
    :rounded="props.rounded"
  >
    <VTabs
      v-model="activeTabModel"
      :align-tabs="props.alignTabs"
      :bg-color="props.tabsBgColor"
      :color="props.tabsColor"
      :grow="props.grow"
      :density="props.density"
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
            {{ tab.title }}
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
          v-if="props.showMoreMenu && props.closeOtherTabs"
          prepend-icon="mdi-close-box-multiple-outline"
          :title="t('Close Other Tabs')"
          @click="handleCloseAllTabs"
        />
        <VListItem
          v-if="props.showMoreMenu && props.closeLeftTabs"
          prepend-icon="mdi-arrow-left-box"
          :title="t('Close Tabs to the Left')"
          @click="handleCloseTabsToLeft(menuState.tabId)"
        />
        <VListItem
          v-if="props.showMoreMenu && props.closeRightTabs"
          prepend-icon="mdi-arrow-right-box"
          :title="t('Close Tabs to the Right')"
          @click="handleCloseTabsToRight(menuState.tabId)"
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
      max-inline-size: 120px;
      text-overflow: ellipsis;
      transition: max-inline-size 0.2s ease;
      vertical-align: middle;
      white-space: nowrap;
    }

    .tab-title-active {
      max-inline-size: 100%;
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
