<script setup lang="ts">
import { useTabs } from '@/composables/useTabs'
import { useI18n } from 'vue-i18n'

const { tabsStore, navigateToTab, closeTabAndNavigate, closeOtherTabsAndNavigate, closeAllTabsAndNavigate, refreshTab } = useTabs()
const { t } = useI18n()

// Tooltip configuration
const tooltipConfig = {
  enabled: true,
  delay: 500,
  location: 'bottom' as const, // Typed as literal
  showDescription: true,
}

// Handle tab click
const handleTabClick = (event: Event, tabId: string) => {
  event.preventDefault()
  navigateToTab(tabId)
}

// Handle tab close
const handleTabClose = (event: Event, tabId: string) => {
  event.stopPropagation()
  closeTabAndNavigate(tabId)
}

// Drag and drop functionality
const isDragging = ref(false)
const draggedTab = ref<string | null>(null)
const draggedIndex = ref<number>(-1)
const dragOverIndex = ref<number>(-1)

const onDragStart = (event: DragEvent, tabId: string, index: number) => {
  isDragging.value = true
  draggedTab.value = tabId
  draggedIndex.value = index

  // Set data for drag operation
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', tabId)

    // Hide the drag image
    const dragImage = document.createElement('div')
    dragImage.style.position = 'absolute'
    dragImage.style.top = '-9999px'
    document.body.appendChild(dragImage)
    event.dataTransfer.setDragImage(dragImage, 0, 0)
    setTimeout(() => document.body.removeChild(dragImage), 0)
  }
}

const onDragEnd = () => {
  isDragging.value = false
  draggedTab.value = null
  draggedIndex.value = -1
  dragOverIndex.value = -1
}

const onDragOver = (event: DragEvent, index: number) => {
  event.preventDefault()
  dragOverIndex.value = index

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDragEnter = (event: DragEvent) => {
  event.preventDefault()
}

const onDragLeave = () => {
  // We don't reset dragOverIndex here to keep the visual indicator
}

const onDrop = (event: DragEvent, targetIndex: number) => {
  event.preventDefault()

  if (draggedIndex.value !== -1 && draggedIndex.value !== targetIndex) {
    tabsStore.reorderTabs(draggedIndex.value, targetIndex)
  }

  onDragEnd()
}

// Context menu state
const contextMenu = ref({
  show: false,
  x: 0,
  y: 0,
  tabId: '',
})

// Handle right click on tab
const handleTabRightClick = (event: MouseEvent, tabId: string) => {
  event.preventDefault()
  contextMenu.value = {
    show: true,
    x: event.clientX,
    y: event.clientY,
    tabId,
  }
}

// Close context menu
const closeContextMenu = () => {
  contextMenu.value.show = false
}

// Context menu actions
const closeOtherTabs = () => {
  closeOtherTabsAndNavigate(contextMenu.value.tabId)
  closeContextMenu()
}

const closeAllTabs = () => {
  closeAllTabsAndNavigate()
  closeContextMenu()
}

const closeCurrentTab = () => {
  closeTabAndNavigate(contextMenu.value.tabId)
  closeContextMenu()
}

const refreshCurrentTab = () => {
  refreshTab(contextMenu.value.tabId)
  closeContextMenu()
}

// Close context menu when clicking outside
onMounted(() => {
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
})
</script>

<template>
  <div
    v-if="tabsStore.tabsCount > 0"
    class="tab-bar"
    role="tablist"
    aria-label="Open tabs"
  >
    <VTabs
      v-model="tabsStore.activeTabId"
      class="tab-bar-tabs"
      density="compact"
      show-arrows
      slider-color="primary"
    >
      <VTab
        v-for="(tab, index) in tabsStore.tabs"
        :key="tab.id"
        :value="tab.id"
        class="tab-item"
        :class="{
          'tab-active': tab.id === tabsStore.activeTabId,
          'tab-dragging': isDragging && draggedTab === tab.id,
          'tab-modified': tab.meta?.modified,
          'tab-drag-over': isDragging && dragOverIndex === index && draggedTab !== tab.id,
        }"
        :aria-label="`Tab ${index + 1}: ${tab.title}`"
        :aria-selected="tab.id === tabsStore.activeTabId"
        role="tab"
        tabindex="0"
        draggable="true"
        @click="handleTabClick($event, tab.id)"
        @contextmenu="handleTabRightClick($event, tab.id)"
        @dragstart="onDragStart($event, tab.id, index)"
        @dragend="onDragEnd"
        @dragover="onDragOver($event, index)"
        @dragenter="onDragEnter($event)"
        @dragleave="onDragLeave"
        @drop="onDrop($event, index)"
        @keydown.enter="handleTabClick($event, tab.id)"
        @keydown.space.prevent="handleTabClick($event, tab.id)"
      >
        <div class="tab-content">
          <VTooltip
            v-if="tab.meta?.icon && tooltipConfig.enabled"
            :location="tooltipConfig.location"
            :open-delay="tooltipConfig.delay"
          >
            <template #activator="{ props }">
              <VIcon
                :icon="tab.meta.icon"
                size="16"
                class="tab-icon mr-2"
                v-bind="props"
              />
            </template>
            <span>{{ tab.meta?.iconTooltip || tab.title }}</span>
          </VTooltip>
          <VIcon
            v-if="tab.meta?.icon && !tooltipConfig.enabled"
            :icon="tab.meta.icon"
            size="16"
            class="tab-icon mr-2"
          />
          <VTooltip
            v-if="tooltipConfig.enabled"
            :location="tooltipConfig.location"
            :open-delay="tooltipConfig.delay"
          >
            <template #activator="{ props }">
              <span
                class="tab-title"
                v-bind="props"
              >
                {{ t(tab.title) }}
              </span>
            </template>
            <span>{{ t(tab.title) }}</span>
            <small
              v-if="tooltipConfig.showDescription && tab.meta?.description"
              class="d-block mt-1"
            >
              {{ tab.meta.description }}
            </small>
          </VTooltip>
          <span
            v-else
            class="tab-title"
            :title="t(tab.title)"
          >
            {{ t(tab.title) }}
          </span>
          <VChip
            v-if="tab.meta?.modified"
            size="x-small"
            color="warning"
            variant="tonal"
            class="tab-modified-indicator ml-1"
          />
          <VTooltip
            v-if="tooltipConfig.enabled"
            :location="tooltipConfig.location"
            :open-delay="tooltipConfig.delay"
          >
            <template #activator="{ props }">
              <VBtn
                v-if="tab.closable"
                icon
                size="x-small"
                variant="text"
                class="tab-close-btn ml-2"
                :aria-label="`Close ${tab.title} tab`"
                v-bind="props"
                @click="handleTabClose($event, tab.id)"
                @keydown.enter.stop="handleTabClose($event, tab.id)"
                @keydown.space.stop.prevent="handleTabClose($event, tab.id)"
              >
                <VIcon
                  size="14"
                  icon="mdi-close"
                />
              </VBtn>
            </template>
            <span>{{ t('tabs.close_tab') }}</span>
          </VTooltip>
          <VBtn
            v-if="tab.closable && !tooltipConfig.enabled"
            icon
            size="x-small"
            variant="text"
            class="tab-close-btn ml-2"
            :aria-label="`Close ${tab.title} tab`"
            :title="t('tabs.close_tab')"
            @click="handleTabClose($event, tab.id)"
            @keydown.enter.stop="handleTabClose($event, tab.id)"
            @keydown.space.stop.prevent="handleTabClose($event, tab.id)"
          >
            <VIcon
              size="14"
              icon="mdi-close"
            />
          </VBtn>
        </div>
      </VTab>
    </VTabs>

    <!-- Context Menu -->
    <VMenu
      v-model="contextMenu.show"
      :style="{ position: 'fixed', left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }"
      location="bottom start"
      offset="0"
    >
      <VList density="compact">
        <VListItem
          @click="refreshCurrentTab"
        >
          <template #prepend>
            <VIcon icon="mdi-refresh" size="16" />
          </template>
          <VListItemTitle>{{ t('tabs.refresh_tab') }}</VListItemTitle>
        </VListItem>

        <VDivider />

        <VListItem
          :disabled="!tabsStore.getTabById(contextMenu.tabId)?.closable"
          @click="closeCurrentTab"
        >
          <template #prepend>
            <VIcon icon="mdi-close" size="16" />
          </template>
          <VListItemTitle>{{ t('tabs.close_tab') }}</VListItemTitle>
        </VListItem>

        <VDivider />

        <VListItem
          :disabled="tabsStore.tabs.filter(t => t.closable).length <= 1"
          @click="closeOtherTabs"
        >
          <template #prepend>
            <VIcon icon="mdi-close-box-multiple" size="16" />
          </template>
          <VListItemTitle>{{ t('tabs.close_other_tabs') }}</VListItemTitle>
        </VListItem>

        <VListItem
          :disabled="tabsStore.tabs.filter(t => t.closable).length === 0"
          @click="closeAllTabs"
        >
          <template #prepend>
            <VIcon icon="mdi-close-box-multiple-outline" size="16" />
          </template>
          <VListItemTitle>{{ t('tabs.close_all_tabs') }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(var(--v-theme-outline), 0.12);
  background-color: rgb(var(--v-theme-surface));
  position: relative;
  z-index: 10;
  margin-bottom: 24px;
}

.tab-bar-tabs {
  flex: 1;
  /* min-height: 42px; */
  min-height: fit-content;
}

.tab-item {
  min-width: 120px;
  max-width: 180px;
  text-transform: none;
  position: relative;
}

.tab-item.tab-active {
  max-width: none;
}

.tab-item:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.tab-item.tab-active {
  background-color: rgba(var(--v-theme-primary), 0.08);
  border-bottom: 2px solid rgb(var(--v-theme-primary));
}

.tab-item.tab-dragging {
  opacity: 0.6;
  transform: rotate(2deg);
  z-index: 1000;
}

.tab-item.tab-drag-over {
  border-left: 2px solid rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.06);
}

.tab-item.tab-modified::before {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-warning));
  z-index: 1;
}

.tab-content {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 0 4px;
  gap: 4px;
}

.tab-icon {
  flex-shrink: 0;
  opacity: 0.8;
}

.tab-title {
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  max-width: 140px;
  padding-left: 6px;
}

.tab-item.tab-active .tab-title {
  max-width: none;
  overflow: visible;
  text-overflow: unset;
}

.tab-modified-indicator {
  flex-shrink: 0;
}

.tab-close-btn {
  opacity: 0;
  flex-shrink: 0;
  border-radius: 4px;
}

.tab-close-btn:hover {
  opacity: 1 !important;
  background-color: rgba(var(--v-theme-error), 0.1) !important;
}

.tab-item:hover .tab-close-btn {
  opacity: 0.7;
}

.tab-item.tab-active .tab-close-btn {
  opacity: 0.8;
}

/* Keyboard focus styles */
.tab-item:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: -2px;
}

.tab-close-btn:focus-visible {
  outline: 2px solid rgb(var(--v-theme-error));
  outline-offset: 1px;
}

/* Responsive design */
@media (max-width: 768px) {
  .tab-item {
    min-width: 100px;
    max-width: 150px;
  }

  .tab-title {
    font-size: 0.8rem;
  }

  .tab-actions {
    display: none;
  }
}

/* Dark theme adjustments */
.v-theme--dark .tab-bar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}
</style>
