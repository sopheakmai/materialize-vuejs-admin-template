<script setup lang="ts">
import AppCoreFieldText from '@/components/app/core/field/text.vue'
</script>

<template>
  <AppCoreFieldText
    label="Name"
    placeholder="Your Name"
    :rules="[requiredValidator]"
  />
</template>

<style scoped>

</style>
