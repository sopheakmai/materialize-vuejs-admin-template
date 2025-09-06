<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = vuetifyTheme.current.value.colors

const series = [
  {
    data: [0, 30, 10, 70, 40, 110, 95],
  },
]

const chartOptions = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  grid: {
    show: false,
    padding: {
      left: -5,
      top: -15,
      right: 5,
      bottom: -10,
    },
  },
  colors: [currentTheme.warning],
  tooltip: { enabled: false },
  stroke: {
    width: 4,
    curve: 'smooth',
    lineCap: 'round',
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    labels: { show: false },
  },
}
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center gap-1">
        <h5 class="text-h5">
          $22.6k
        </h5>
        <div class="text-error">
          +38%
        </div>
      </div>
      <div class="text-subtitle-1">
        Total Sales
      </div>
    </VCardText>

    <VCardText>
      <VueApexCharts
        type="line"
        :height="108"
        :options="chartOptions"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>
