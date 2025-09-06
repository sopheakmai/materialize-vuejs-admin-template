<script setup lang="ts">
const logisticData = ref([
  { icon: 'ri-car-line', color: 'primary', title: 'On route vehicles', value: 42, change: 18.2, isHover: false },
  { icon: 'ri-alert-line', color: 'warning', title: 'Vehicles with errors', value: 8, change: -8.7, isHover: false },
  { icon: 'ri-route-line', color: 'error', title: 'Deviated from route', value: 27, change: 4.3, isHover: false },
  { icon: 'ri-time-line', color: 'info', title: 'Late vehicles', value: 13, change: -2.5, isHover: false },
])
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in logisticData"
      :key="index"
      cols="12"
      md="3"
      sm="6"
    >
      <div>
        <VCard
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? `border-block-end-color: rgb(var(--v-theme-${data.color}))` : `border-block-end-color: rgba(var(--v-theme-${data.color}),0.7)`"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded="lg"
              >
                <VIcon
                  :icon="data.icon"
                  size="24"
                />
              </VAvatar>
              <h4 class="text-h4">
                {{ data.value }}
              </h4>
            </div>
            <div class="text-body-1 text-high-emphasis">
              {{ data.title }}
            </div>
            <div class="d-flex align-center gap-x-2">
              <h6 class="text-h6 text-medium-emphasis">
                {{ data.change }}%
              </h6>
              <div class="text-sm text-disabled">
                than last week
              </div>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics {
  border-block-end-style: solid;
  border-block-end-width: 2px;

  &:hover {
    border-block-end-width: 3px;
    margin-block-end: -1px;

    @include mixins.elevation(10);

    transition: all 0.1s ease-out;
  }
}

.skin--bordered {
  .logistics-card-statistics {
    &:hover {
      margin-block-end: -2px;
    }
  }
}
</style>
