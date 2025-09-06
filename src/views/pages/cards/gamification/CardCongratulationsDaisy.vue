<script setup lang="ts">
import illustrationDaisyDark from '@images/cards/illustration-daisy-dark.png'
import illustrationDaisyLight from '@images/cards/illustration-daisy-light.png'

import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const daisyImage = useGenerateImageVariant(illustrationDaisyLight, illustrationDaisyDark)
</script>

<template>
  <VCard class="overflow-visible">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
      >
        <VCardItem class="pb-4">
          <VCardTitle>
            <h4 class="text-h4 text-wrap">
              Congratulations <strong>Daisy!</strong> <span class="text-high-emphasis">🎉</span>
            </h4>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <p>You already completed 68% <span class="text-high-emphasis">😍</span> tasks. Good job! <br> Check your new raising badge in your profile.</p>
          <VBtn>View Profile</VBtn>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        class="text-center"
      >
        <img
          :src="daisyImage"
          class="john-illustration"
          :height="$vuetify.display.xs ? '165' : '170'"
          :class="$vuetify.display.xs ? 'position-relative' : 'position-absolute'"
          alt="john-illustration"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 0;
}

@media (max-width: 600px) {
  .john-illustration {
    inset-block-end: -0.425rem;
  }
}
</style>
