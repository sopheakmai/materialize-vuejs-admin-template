<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = vuetifyTheme.current.value.colors

const series = [{ data: [12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25] }]

const chartOptions = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
    dropShadow: {
      top: 14,
      blur: 4,
      left: 0,
      enabled: true,
      opacity: 0.12,
      color: currentTheme.primary,
    },
  },
  tooltip: { enabled: false },
  grid: {
    xaxis: {
      lines: { show: false },
    },
    yaxis: {
      lines: { show: false },
    },
    padding: {
      top: -12,
      left: -2,
      right: 8,
      bottom: -10,
    },
  },
  stroke: {
    width: 5,
    lineCap: 'round',
  },
  markers: { size: 0 },
  colors: [currentTheme.primary],
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    min: 0,
    labels: { show: false },
  },
}
</script>

<template>
  <VCard title="Sales this month">
    <VCardText>
      <p class="mb-0">
        Total Sales This Month
      </p>
      <h5 class="text-h5">
        $28,450
      </h5>

      <VueApexCharts
        type="line"
        :height="100"
        :options="chartOptions"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>
