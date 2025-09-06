<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const moreList = [
  { title: 'Refresh', value: 'refresh' },
  { title: 'Update', value: 'update' },
  { title: 'Share', value: 'share' },
]

const vuetifyTheme = useTheme()
const display = useDisplay()

const chartConfig = computed(() => {
  const themeColors = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color']))},${variableTheme['border-opacity']})`

  return {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: { show: false },
    colors: [
      `rgba(${hexToRgb(String(themeColors.primary))}, 1)`,
      `rgba(${hexToRgb(String(themeColors.secondary))}, 1)`,
    ],
    grid: {
      strokeDashArray: 10,
      borderColor,
      padding: {
        top: -12,
        left: -4,
        right: -5,
        bottom: -14,
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: ['rgba(var(--v-theme-surface), 1)'],
    },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    responsive: [
      {
        breakpoint: display.thresholds.value.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: 1550,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: display.thresholds.value.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
            },
          },
        },
      },

      {
        breakpoint: 690,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '60%',
              borderRadius: 8,
            },
          },
        },
      },
      {
        breakpoint: display.thresholds.value.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%',
            },
          },
        },
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 8,
            },
          },
        },
      },
    ],
  }
})

const series = [
  {
    name: 'Google Analytics',
    data: [155, 135, 320, 100, 150, 335, 160],
  },
  {
    name: 'Facebook Ads',
    data: [110, 235, 125, 230, 215, 115, 200],
  },
]

const externalLinks = [
  {
    amount: '$845k',
    trendAmount: 82,
    color: 'primary',
    title: 'Google Analytics',
    icon: 'ri-arrow-up-s-line',
  },
  {
    trendAmount: 52,
    amount: '$12.5k',
    color: 'secondary',
    title: 'Facebook Ads',
    icon: 'ri-arrow-down-s-line',
  },
]
</script>

<template>
  <VCard title="External Links">
    <template #append>
      <div class="mt-n2 me-n3">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VueApexCharts
        type="bar"
        height="213"
        :options="chartConfig"
        :series="series"
      />

      <VTable class="text-no-wrap mt-4">
        <tbody>
          <tr
            v-for="link in externalLinks"
            :key="link.title"
          >
            <td
              class="d-flex align-center border-0 gap-2 ps-0"
              style="block-size: 33px;"
            >
              <VIcon
                icon="ri-circle-fill"
                :color="link.color"
                size="14"
              />
              <h6 class="text-sm font-weight-medium">
                {{ link.title }}
              </h6>
            </td>

            <td
              class="border-0"
              style="block-size: 33px;"
            >
              <div class="text-body-2">
                {{ link.amount }}
              </div>
            </td>

            <td
              class="text-no-wrap border-0 pe-0"
              style=" block-size: 33px;inline-size: 1rem;"
            >
              <div class="text-sm font-weight-medium text-high-emphasis d-flex align-center gap-x-2">
                <div>
                  {{ link.trendAmount }}%
                </div>
                <VIcon
                  size="24"
                  :color="link.trendAmount > 59 ? 'success' : 'error'"
                  :icon="link.trendAmount > 59 ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
