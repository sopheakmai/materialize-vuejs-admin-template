<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const vuetifyTheme = useTheme()

const series = [64]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  return {
    chart: {
      sparkline: { enabled: true },
    },
    stroke: { lineCap: 'round' },
    colors: [`rgba(${hexToRgb(String(currentTheme.primary))}, 1)`],
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: `rgba(${hexToRgb(String(currentTheme['grey-100']))}, 1)`,
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: '1rem',
            color: `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['high-emphasis-opacity']})`,
          },
        },

      },
    },
    grid: {
      padding: {
        bottom: -12,
      },
    },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center gap-1">
        <h5 class="text-h5">
          $67.1k
        </h5>
        <div class="text-body-1 text-success">
          +49%
        </div>
      </div>
      <div class="text-subtitle-1">
        Overview
      </div>

      <VueApexCharts
        type="radialBar"
        :options="chartOptions"
        :series="series"
        :height="119"
      />
    </VCardText>
  </VCard>
</template>
