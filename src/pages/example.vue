<script setup lang="ts">
import { VPie } from 'vuetify/labs/VPie'

const items = [
  { key: 1, title: 'Yes', value: 45 },
  { key: 2, title: 'No', value: 40 },
  { key: 3, title: 'Maybe', value: 15 },
]
</script>

<template>
  <div>
    <VPie
      title="Basic pie"
      animation
      legend
      :palette="['#048BA8', '#99C24D', '#F18F01']"
      tooltip
      reveal
      :items="items"
    />
    1
  </div>
</template>

<style scoped>

</style>
