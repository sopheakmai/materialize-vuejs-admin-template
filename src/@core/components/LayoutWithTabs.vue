<script setup lang="ts">
import AppTabs from '@core/components/AppTabs.vue'
import { useTabs } from '@core/composable/useTabs'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'

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
    default: false, // Pin functionality disabled
  },
  showMoreMenu: {
    type: Boolean,
    default: true,
  },

  // Keep alive functionality
  keepAlive: {
    type: Boolean,
    default: true,
  },

  // Maximum number of tabs
  // Set to 0 for unlimited tabs
  maxTabs: {
    type: Number,
    default: 30,
  },
})

const emit = defineEmits(['update:keepAlive', 'keepAliveInclude', 'keepAliveExclude'])

// Get route and tabs API
const route = useRoute()
const router = useRouter()
const { addCurrentRouteTab } = useTabs()

// Keep-alive state
const keepAliveEnabled = ref(props.keepAlive)

// Add current route as tab on component mount if enabled
onMounted(() => {
  if (props.addCurrentRouteAsTab) {
    addCurrentRouteTab({ closable: true }) // All tabs are closable

    // Emit keep-alive include event for current route
    if (keepAliveEnabled.value) {
      emit('keepAliveInclude', route.path)
    }
  }
})

// Watch for route changes to notify parent for keep-alive management
// Use afterEach router navigation guard to ensure the component is ready
onBeforeMount(() => {
  router.afterEach((to) => {
    if (keepAliveEnabled.value) {
      // Wait for the component to be fully rendered
      nextTick(() => {
        emit('keepAliveInclude', to.path)
      })
    }
  })
})

// Watch for keep-alive state changes
watch(keepAliveEnabled, (isEnabled) => {
  emit('update:keepAlive', isEnabled)
})

// Forward tab removal to parent component for keep-alive management
const onTabRemoved = (tab: any) => {
  if (keepAliveEnabled.value) {
    emit('keepAliveExclude', tab.route)
  }
}
</script>

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
      :keep-alive="keepAliveEnabled"
      @update:keep-alive="val => keepAliveEnabled = val"
      @keep-alive-include="(name) => $emit('keepAliveInclude', name)"
      @keep-alive-exclude="(name) => $emit('keepAliveExclude', name)"
      @tab-removed="onTabRemoved"
    />

    <!-- Slot for page content -->
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-with-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tabs-navigation {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .tab-content {
    flex: 1;
  }
}
</style>
