<script setup lang="ts">
const chartColors = {
  donut: {
    series1: '#72E128',
    series2: '#8EE753',
    series3: '#AAED7E',
    series4: '#C7F3A9',
  },
}

const headingColor = 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))'
const labelColor = 'rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity))'

const deliveryExceptionsChartSeries = [13, 25, 22, 40]

const deliveryExceptionsChartConfig = {
  labels: ['Incorrect address', 'Weather conditions', 'Federal Holidays', 'Damage during transit'],
  colors: [
    chartColors.donut.series1,
    chartColors.donut.series2,
    chartColors.donut.series3,
    chartColors.donut.series4,
  ],
  stroke: {
    width: 0,
  },
  dataLabels: {
    enabled: false,
    formatter(val: string) {
      return `${Number.parseInt(val)}%`
    },
  },
  legend: {
    show: true,
    position: 'bottom',
    offsetY: 10,
    markers: {
      width: 8,
      height: 8,
      offsetX: -3,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 5,
    },
    fontSize: '13px',
    fontWeight: 400,
    labels: {
      colors: headingColor,
      useSeriesColors: false,
    },
  },
  tooltip: {
    theme: false,
  },
  grid: {
    padding: {
      top: 15,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          value: {
            fontSize: '24px',
            color: headingColor,
            fontWeight: 500,
            offsetY: -23,
            formatter(val: string) {
              return `${Number.parseInt(val)}%`
            },
          },
          name: { offsetY: 22 },
          total: {
            show: true,
            fontSize: '1rem',
            label: 'AVG. Exceptions',
            color: labelColor,
            formatter() {
              return '30%'
            },
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 420,
      options: {
        chart: {
          height: 400,
        },
      },
    },
  ],
}

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard>
    <VCardItem title="Delivery exceptions">
      <template #append>
        <MoreBtn :menu-list="moreList" />
      </template>
    </VCardItem>
    <VCardText>
      <VueApexCharts
        type="donut"
        height="428"
        :options="deliveryExceptionsChartConfig"
        :series="deliveryExceptionsChartSeries"
      />
    </VCardText>
  </VCard>
</template>
