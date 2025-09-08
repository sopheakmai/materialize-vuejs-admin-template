<script setup lang="ts">
// Props
const props = defineProps({
  pageName: {
    type: String,
    required: true,
  },
})
</script>

<script lang="ts">
// Need to set name property for the component
export default {
  name: 'RoutePageKeepAliveWrapper',
}
</script>

<template>
  <div :data-page-name="pageName">
    <slot />
  </div>
</template>
