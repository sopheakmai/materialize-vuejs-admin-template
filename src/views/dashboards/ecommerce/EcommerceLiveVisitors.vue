<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors

const series = [{
  data: [
    70,
    118,
    92,
    49,
    19,
    49,
    23,
    82,
    65,
    23,
    49,
    65,
    65,
  ],
}]

const chartOptions = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  grid: {
    padding: {
      top: -4,
      left: -20,
      right: -2,
      bottom: -7,
    },
    yaxis: { lines: { show: false } },
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  colors: [currentTheme.success],
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '43%',
      endingShape: 'rounded',
      startingShape: 'rounded',
    },
  },
  states: {
    hover: { filter: { type: 'none' } },
    active: { filter: { type: 'none' } },
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: { labels: { show: false } },
}
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Live Visitors</VCardTitle>
      <VCardSubtitle>Total 890 Visitors Are Live</VCardSubtitle>

      <template #append>
        <div class="text-success text-body-1 font-weight-medium d-flex align-center mt-n7">
          <div>+78.2%</div>
          <VIcon
            size="20"
            icon="ri-arrow-up-s-line"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText class="pb-0">
      <VueApexCharts
        type="bar"
        :height="170"
        :options="chartOptions"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>
