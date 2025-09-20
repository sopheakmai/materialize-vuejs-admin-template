<script setup lang="ts">
import TypographyHeadlines from '@/views/core/typography/TypographyHeadlines.vue'
import TypographyTexts from '@/views/core/typography/TypographyTexts.vue'
import TypographyFamilies from '@/views/core/typography/TypographyFamilies.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <TypographyFamilies />
    </VCol>

    <VCol cols="12">
      <TypographyHeadlines />
    </VCol>

    <VCol cols="12">
      <TypographyTexts />
    </VCol>
  </VRow>
</template>
