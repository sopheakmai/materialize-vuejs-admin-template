<script setup lang="ts">
type Props = {
  title: string
  divider?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  divider: true,
})
</script>

<template>
  <VDivider v-if="props.divider" />

  <div class="customizer-section">
    <p class="text-caption">
      {{ props.title }}
    </p>

    <slot />
  </div>
</template>
