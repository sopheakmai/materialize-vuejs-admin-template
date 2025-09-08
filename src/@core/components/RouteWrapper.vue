<script lang="ts" setup>
// This component is a wrapper that adds a name to route components
// which allows KeepAlive to work properly

// Props
const props = defineProps({
  routePath: {
    type: String,
    required: true,
  },
  componentName: {
    type: String,
    required: true,
  },
})

// We can't use defineOptions with dynamic values, so we'll use a workaround
// by attaching the name to the component instance
onMounted(() => {
  // @ts-expect-error - We're attaching the name for KeepAlive to use
  getCurrentInstance().vnode.component.type.name = props.componentName
})
</script>

<template>
  <div :data-route-path="routePath" :data-component-name="componentName">
    <slot />
  </div>
</template>
