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
  maxTabs: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['update:keepAlive', 'keepAliveInclude', 'keepAliveExclude'])

// Get route and tabs API
const route = useRoute()
const router = useRouter()
const { addCurrentRouteTab, tabs } = useTabs()

// Keep-alive state
const keepAliveEnabled = ref(props.keepAlive)

// Check if we're in development mode
const isDevelopment = computed(() => import.meta.env.DEV)

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

// Toggle keep-alive functionality
const toggleKeepAlive = () => {
  keepAliveEnabled.value = !keepAliveEnabled.value
  emit('update:keepAlive', keepAliveEnabled.value)
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

    <!-- Keep-alive toggle button (for development) -->
    <div v-if="isDevelopment" class="keep-alive-toggle">
      <VBtn
        icon
        size="small"
        :color="keepAliveEnabled ? 'success' : 'error'"
        variant="tonal"
        :title="keepAliveEnabled ? 'Disable keep-alive' : 'Enable keep-alive'"
        @click="toggleKeepAlive"
      >
        <VIcon>{{ keepAliveEnabled ? 'mdi-cached' : 'mdi-cached-off' }}</VIcon>
      </VBtn>
      <span class="keep-alive-status ms-2">Keep-alive: {{ keepAliveEnabled ? 'ON' : 'OFF' }}</span>
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

  .keep-alive-toggle {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
    font-size: 0.75rem;

    .v-theme--dark & {
      background: rgba(30, 30, 30, 0.8);
    }
  }
}
</style>
