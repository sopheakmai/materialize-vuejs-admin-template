<script setup lang="ts">
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'

import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const johnImage = useGenerateImageVariant(illustrationJohnLight, illustrationJohnDark)
</script>

<template>
  <VCard class="overflow-visible">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem class="pb-4 mt-4">
          <VCardTitle>
            <h4 class="text-h4 text-wrap">
              Congratulations <strong>John!</strong> <span class="text-high-emphasis">🎉</span>
            </h4>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <p>
            You have done 68% <span class="text-high-emphasis">😎</span> more sales today.
            <br>
            Check your new raising badge in your profile.
          </p>
          <VBtn>View Profile</VBtn>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center mt-4"
      >
        <img
          :src="johnImage"
          class="john-illustration"
          :height="$vuetify.display.xs ? '165' : '186'"
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
</style>
