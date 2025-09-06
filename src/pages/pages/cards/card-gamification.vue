<script setup lang="ts">
import CardAward from '@/views/pages/cards/gamification/CardAward.vue'
import CardCongratulationsDaisy from '@/views/pages/cards/gamification/CardCongratulationsDaisy.vue'
import CardCongratulationsJohn from '@/views/pages/cards/gamification/CardCongratulationsJohn.vue'
import CardUpgrade from '@/views/pages/cards/gamification/CardUpgrade.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <CardAward />
    </VCol>

    <VCol
      cols="12"
      md="8"
      class="align-self-end"
    >
      <CardCongratulationsJohn />
    </VCol>

    <VCol
      cols="12"
      md="8"
      class="align-self-end"
    >
      <CardCongratulationsDaisy />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <CardUpgrade />
    </VCol>
  </VRow>
</template>
