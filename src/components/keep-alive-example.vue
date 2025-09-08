<script setup lang="ts">
import { ref } from 'vue'
import AppTabs from '@core/components/AppTabs.vue'

// Keep-alive state
const keepTabsAlive = ref(true)
const keepAliveComponents = ref<string[]>([])

// Methods to manage keep-alive components
const includeInKeepAlive = (componentName: string) => {
  if (!keepAliveComponents.value.includes(componentName)) {
    keepAliveComponents.value.push(componentName)
  }
}

const excludeFromKeepAlive = (componentName: string) => {
  const index = keepAliveComponents.value.indexOf(componentName)
  if (index !== -1) {
    keepAliveComponents.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <!-- AppTabs with keep-alive -->
    <AppTabs
      v-model:keep-alive="keepTabsAlive"
      @keep-alive-include="includeInKeepAlive"
      @keep-alive-exclude="excludeFromKeepAlive"
    />

    <!-- Router View with keep-alive -->
    <KeepAlive :include="keepAliveComponents">
      <RouterView />
    </KeepAlive>
  </div>
</template>
