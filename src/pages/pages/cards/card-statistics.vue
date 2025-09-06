<script setup lang="ts">
import CardStatisticsGrowthDonutCharts from '@/views/pages/cards/card-statistics/CardStatisticsGrowthDonutsCharts.vue'
import CardStatisticsLiveVisitors from '@/views/pages/cards/card-statistics/CardStatisticsLiveVisitors.vue'
import CardStatisticsLogistics from '@/views/pages/cards/card-statistics/CardStatisticsLogistics.vue'
import CardStatisticsOrdersImpressions from '@/views/pages/cards/card-statistics/CardStatisticsOrdersImpressions.vue'
import CardStatisticsOverviewRadialBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsOverviewRadialBarCharts.vue'
import CardStatisticsProfitBarWithGapCharts from '@/views/pages/cards/card-statistics/CardStatisticsProfitBarWithGapCharts.vue'
import CardStatisticsProfitCharts from '@/views/pages/cards/card-statistics/CardStatisticsProfitCharts.vue'
import CardStatisticsSalesMonthCharts from '@/views/pages/cards/card-statistics/CardStatisticsSalesMonthCharts.vue'
import CardStatisticsSalesOverview from '@/views/pages/cards/card-statistics/CardStatisticsSalesOverview.vue'
import CardStatisticsSmoothLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsSmoothLineCharts.vue'
import CardStatisticsTotalProfitLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsTotalProfitLineCharts.vue'
import CardStatisticsTotalRevenueBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsTotalRevenueBarCharts.vue'
import CardStatisticsTotalVisits from '@/views/pages/cards/card-statistics/CardStatisticsTotalVisits.vue'
import illustration1 from '@images/cards/illustration-1.png'
import illustration2 from '@images/cards/illustration-2.png'
import illustration3 from '@images/cards/illustration-3.png'
import illustration4 from '@images/cards/illustration-4.png'

const statisticsHorizontal = [
  {
    title: 'New Customers',
    color: 'primary',
    icon: 'ri-user-star-line',
    stats: 2856,
    change: -8.1,
  },
  {
    title: 'Total Profit',
    color: 'warning',
    icon: 'ri-pie-chart-2-line',
    stats: 28500,
    change: 18.2,
  },
  {
    title: 'New Transactions',
    color: 'info',
    icon: 'ri-bank-card-line',
    stats: 2450,
    change: -24.6,
  },
  {
    title: 'Total Revenue',
    color: 'success',
    icon: 'ri-money-dollar-circle-line',
    stats: 48200,
    change: 22.5,
  },
]

const statisticsWithIcon = [
  { title: 'Session', value: '21,459', change: 29, desc: 'Total Users', icon: 'ri-group-line', iconColor: 'primary' },
  { title: 'Paid Users', value: '4,567', change: 18, desc: 'Last Week Analytics', icon: 'ri-user-add-line', iconColor: 'error' },
  { title: 'Active Users', value: '19,860', change: -14, desc: 'Last Week Analytics', icon: 'ri-user-follow-line', iconColor: 'success' },
  { title: 'Pending Users', value: '237', change: 42, desc: 'Last Week Analytics', icon: 'ri-user-search-line', iconColor: 'warning' },
]

const statisticsVertical = [
  {
    title: 'Total Orders',
    color: 'primary',
    icon: 'ri-shopping-cart-line',
    stats: '155k',
    change: 22,
    subtitle: 'Last 4 months',
  },
  {
    title: 'Total Profit',
    color: 'warning',
    icon: 'ri-money-dollar-circle-line',
    stats: '$89.34k',
    change: -18,
    subtitle: 'Last One Year',
  },
  {
    title: 'Total Impressions',
    color: 'info',
    icon: 'ri-links-line',
    stats: '$142.8k',
    change: 62,
    subtitle: 'Last One Year',
  },
  {
    title: 'Total Sales',
    color: 'success',
    icon: 'ri-handbag-line',
    stats: '13.4k',
    change: 38,
    subtitle: 'Last Six months',
  },
  {
    title: 'Total Expenses',
    color: 'error',
    icon: 'ri-bank-card-line',
    stats: '8.16k',
    change: -16,
    subtitle: 'Last one month',
  },
  {
    title: 'Transactions',
    color: 'secondary',
    icon: 'ri-pie-chart-2-line',
    stats: '2.55k',
    change: 38,
    subtitle: 'Last One Year',
  },
]

const statisticsWithImages = [
  {
    title: 'Ratings',
    subtitle: 'Year of 2021',
    stats: '8.14k',
    change: 15.6,
    image: illustration1,
    color: 'primary',
  },
  {
    title: 'Sessions',
    subtitle: 'Last Month',
    stats: '12.2k',
    change: -25.5,
    image: illustration2,
    color: 'success',
  },
  {
    title: 'Customers',
    subtitle: 'Daily Customers',
    stats: '42.4k',
    change: 9.2,
    image: illustration3,
    color: 'warning',
  },
  {
    title: 'Total Orders',
    subtitle: 'Last Week',
    stats: '4.25k',
    change: 10.8,
    image: illustration4,
    color: 'secondary',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Horizontal Cards -->
    <VCol
      v-for="statistics in statisticsHorizontal"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
    >
      <CardStatisticsHorizontal v-bind="statistics" />
    </VCol>

    <!-- 👉 Horizontal Cards with icon -->
    <VCol
      v-for="statistics in statisticsWithIcon"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
    >
      <CardStatisticsWithIcon v-bind="statistics" />
    </VCol>

    <!-- 👉 Images Cards -->
    <VCol
      v-for="statistics in statisticsWithImages"
      :key="statistics.title"
      cols="12"
      lg="3"
      sm="6"
    >
      <CardStatisticsWithImages v-bind="statistics" />
    </VCol>

    <!-- 👉 Card Logistics -->
    <VCol cols="12">
      <CardStatisticsLogistics />
    </VCol>

    <!-- 👉 Vertical Cards -->
    <VCol
      v-for="statistics in statisticsVertical"
      :key="statistics.title"
      cols="12"
      sm="4"
      lg="2"
    >
      <CardStatisticsVertical v-bind="statistics" />
    </VCol>

    <!-- 👉 Profit Charts -->
    <VCol
      cols="12"
      sm="6"
      lg="3"
    >
      <CardStatisticsProfitCharts />
    </VCol>

    <!-- 👉 Total Visits -->
    <VCol
      cols="12"
      sm="6"
      lg="3"
    >
      <CardStatisticsTotalVisits />
    </VCol>

    <!-- 👉 Sales Months Charts -->
    <VCol
      cols="12"
      sm="6"
      lg="3"
    >
      <CardStatisticsSalesMonthCharts />
    </VCol>

    <!-- 👉 Order Impressions  -->
    <VCol
      cols="12"
      sm="6"
      lg="3"
    >
      <CardStatisticsOrdersImpressions />
    </VCol>

    <!-- 👉 Total Revenue Bar Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsTotalRevenueBarCharts />
    </VCol>

    <!-- 👉 Total Profit Line Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsTotalProfitLineCharts />
    </VCol>

    <!-- 👉 Total Overview Radial Bar Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsOverviewRadialBarCharts />
    </VCol>

    <!-- 👉 Profit Bar Chart with Gaps -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsProfitBarWithGapCharts />
    </VCol>

    <!-- 👉 Total Smooth line Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsSmoothLineCharts />
    </VCol>

    <!-- 👉 Growth Donut Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsGrowthDonutCharts />
    </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <CardStatisticsLiveVisitors />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <CardStatisticsSalesOverview />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
