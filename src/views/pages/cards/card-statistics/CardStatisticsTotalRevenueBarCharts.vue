<script setup lang="ts">
const series = [
  {
    name: 'Earning',
    data: [120, 200, 150, 120],
  },
  {
    name: 'Expense',
    data: [72, 120, 50, 65],
  },
]

const chartOptions = computed(() => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    grid: {
      padding: {
        top: -15,
        left: -14,
        right: -4,
        bottom: -15,
      },
      yaxis: {
        lines: { show: false },
      },
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: ['rgba(var(--v-theme-primary),1)', 'rgba(var(--v-theme-warning),1)'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '48%',
        borderRadiusApplication: 'start',
        borderRadiusWhenStacked: 'last',
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
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    },
    yaxis: {
      labels: { show: false },
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center gap-1">
        <h5 class="text-h5">
          $42.5k
        </h5>
        <div class="text-error text-body-1">
          -22%
        </div>
      </div>
      <div class="text-subtitle-1">
        Total Revenue
      </div>
    </VCardText>

    <VCardText>
      <VueApexCharts
        type="bar"
        :options="chartOptions"
        :series="series"
        :height="108"
      />
    </VCardText>
  </VCard>
</template>
