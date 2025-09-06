<script setup>
import { kFormatter } from '@core/utils/formatters'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  icon: {
    type: String,
    required: true,
  },
  stats: {
    type: Number,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
})

const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change) === 1)
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center">
      <VAvatar
        size="40"
        rounded="lg"
        :color="props.color"
        variant="tonal"
        class="me-4"
      >
        <VIcon
          :icon="props.icon"
          size="24"
        />
      </VAvatar>

      <div class="d-flex flex-column">
        <div class="d-flex align-center flex-wrap gap-x-2">
          <h5 class="text-h5">
            ${{ kFormatter(props.stats) }}
          </h5>
          <div
            v-if="props.change"
            class="d-flex align-center"
            :class="`${isPositive ? 'text-success' : 'text-error'}`"
          >
            <VIcon
              size="24"
              :icon="isPositive ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
            />
            <div class="text-base">
              {{ Math.abs(props.change) }}%
            </div>
          </div>
        </div>
        <div class="text-body-1">
          {{ props.title }}
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
