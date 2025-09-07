<template>
  <div class="layout-with-tabs">
    <!-- Tabs navigation -->
    <AppTabs
      v-if="showTabs"
      class="tabs-navigation mb-4"
      :align-tabs="tabsPosition"
      :border="tabsBorder"
      :color="tabsColor"
      :tabs-bg-color="tabsBgColor"
      :tabs-color="tabsTextColor"
      :slider-color="tabsSliderColor"
      :max-tabs="maxTabs"
      :show-pin-action="showPinAction"
      :show-more-menu="showMoreMenu"
    />
    
    <!-- Slot for page content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppTabs from '@core/components/AppTabs.vue'
import { useTabs } from '@core/composable/useTabs'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router/auto'

const props = defineProps({
  // Enable/disable tabs
  showTabs: {
    type: Boolean,
    default: true,
  },
  
  // Add current route as tab on component mount
  addCurrentRouteAsTab: {
    type: Boolean,
    default: true,
  },
  
  // Tab options
  tabsPosition: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
  },
  tabsBorder: {
    type: Boolean,
    default: false,
  },
  tabsColor: {
    type: String,
    default: 'surface',
  },
  tabsBgColor: {
    type: String,
    default: undefined,
  },
  tabsTextColor: {
    type: String,
    default: 'primary',
  },
  tabsSliderColor: {
    type: String,
    default: 'primary',
  },
  showPinAction: {
    type: Boolean,
    default: true,
  },
  showMoreMenu: {
    type: Boolean,
    default: true,
  },
  
  // Make the current route a permanent tab
  pinCurrentTab: {
    type: Boolean,
    default: false,
  },
  
  // Maximum number of tabs
  maxTabs: {
    type: Number,
    default: 10,
  },
})

// Get route and tabs API
const route = useRoute()
const { addCurrentRouteTab } = useTabs()

// Add current route as tab on component mount if enabled
onMounted(() => {
  if (props.addCurrentRouteAsTab) {
    addCurrentRouteTab({ closable: !props.pinCurrentTab })
  }
})
</script>

<style lang="scss">
.layout-with-tabs {
  display: flex;
  flex-direction: column;

  .tabs-navigation {
    flex-shrink: 0;
  }
}
</style>
