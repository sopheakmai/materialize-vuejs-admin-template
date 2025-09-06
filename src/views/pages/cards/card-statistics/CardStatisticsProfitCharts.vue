<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const seriesSales = [{
  data: [
    0,
    15,
    0,
    17,
    5,
    30,
  ],
}]

const seriesProfit = [{
  data: [
    5,
    25,
    0,
    30,
    15,
    30,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    sales: {
      chart: {
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      grid: {
        show: false,
        padding: { left: -7 },
      },
      tooltip: { enabled: false },
      colors: [currentTheme.warning],
      markers: {
        size: 5,
        offsetY: 1,
        offsetX: -2,
        strokeWidth: 2,
        strokeOpacity: 1,
        colors: ['transparent'],
        strokeColors: 'transparent',
        discrete: [{
          size: 5,
          seriesIndex: 0,
          strokeColor: currentTheme.warning,
          fillColor: currentTheme.surface,
          dataPointIndex: seriesSales[0].data.length - 1,
        }],
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'round',
      },
      xaxis: {
        labels: { show: false },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: { labels: { show: false } },
    },
    profit: {
      chart: {
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      grid: {
        show: false,
        padding: { left: -5 },
      },
      tooltip: { enabled: false },
      colors: [currentTheme.error],
      markers: {
        size: 5,
        offsetY: 0,
        offsetX: -2,
        strokeWidth: 2,
        strokeOpacity: 1,
        colors: ['transparent'],
        strokeColors: 'transparent',
        discrete: [{
          size: 5,
          seriesIndex: 0,
          strokeColor: currentTheme.error,
          fillColor: currentTheme.surface,
          dataPointIndex: seriesSales[0].data.length - 1,
        }],
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'round',
      },
      xaxis: {
        labels: { show: false },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: { labels: { show: false } },
    },
  }
})
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol cols="12">
        <VCardText>
          <VRow>
            <VCol
              cols="6"
              align-self="center"
            >
              <div>
                <h5 class="text-h5">
                  152k
                </h5>

                <div class="d-flex align-center my-1">
                  <div class="text-success text-sm">
                    18.2%
                  </div>
                  <VIcon
                    icon="ri-arrow-up-s-line"
                    size="20"
                    color="success"
                  />
                </div>
              </div>
              <div class="text-body-1">
                Total Sales
              </div>
            </VCol>

            <VCol cols="6">
              <VueApexCharts
                type="line"
                :options="chartOptions.sales"
                :series="seriesSales"
                :height="82"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCol>

      <VDivider />

      <VCol cols="12">
        <VCardText>
          <VRow>
            <VCol
              cols="6"
              align-self="center"
            >
              <div>
                <h5 class="text-h5">
                  89.5k
                </h5>

                <div class="d-flex align-center my-1">
                  <div class="text-error text-sm">
                    -8%
                  </div>
                  <VIcon
                    icon="ri-arrow-down-s-line"
                    size="20"
                    color="error"
                  />
                </div>
              </div>
              <div class="text-body-1">
                Total Profit
              </div>
            </VCol>
            <VCol cols="6">
              <VueApexCharts
                type="line"
                :options="chartOptions.profit"
                :series="seriesProfit"
                :height="82"
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
