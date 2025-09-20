<script setup lang="ts">
const fontFamilies = [
  {
    label: 'English',
    i18nLang: 'en',
    isRTL: false,
    fontFamily: 'Rethink Sans',
  },
  {
    label: 'ភាសាខ្មែរ',
    i18nLang: 'km',
    isRTL: false,
    fontFamily: 'Kantumruy Pro',
  },
]
</script>

<template>
  <VCard title="Font Families">
    <VCardText class="d-flex flex-column">
      <div
        v-for="(font, index) in fontFamilies"
        :key="index"
      >
        <h2 class="text-h2 mb-4">
          {{ font.label }} - {{ font.fontFamily }}
        </h2>
        <div
          :style="`font-family: ${font.fontFamily}`"
        >
          <p class="text-body-1 mb-2">
            The quick brown fox jumps over the lazy dog.
          </p>
          <p class="text-body-2 mb-2">
            The quick brown fox jumps over the lazy dog.
          </p>
          <p class="text-subtitle-1 mb-2">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        <VDivider v-if="index !== fontFamilies.length - 1" class="my-4" />
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>

</style>
