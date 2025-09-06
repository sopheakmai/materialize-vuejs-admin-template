<script setup lang="ts">
import AnalyticsActivityTimeline from '@/views/dashboards/analytics/AnalyticsActivityTimeline.vue'
import AnalyticsCongratulationsJohn from '@/views/dashboards/analytics/AnalyticsCongratulationsJohn.vue'
import AnalyticsOverviewRadialBarCharts from '@/views/dashboards/analytics/AnalyticsOverviewRadialBarCharts.vue'
import AnalyticsPerformance from '@/views/dashboards/analytics/AnalyticsPerformance.vue'
import AnalyticsProjectStatistics from '@/views/dashboards/analytics/AnalyticsProjectStatistics.vue'
import AnalyticsSalesCountry from '@/views/dashboards/analytics/AnalyticsSalesCountry.vue'
import AnalyticsTopReferralSources from '@/views/dashboards/analytics/AnalyticsTopReferralSources.vue'
import AnalyticsTotalProfitLineCharts from '@/views/dashboards/analytics/AnalyticsTotalProfitLineCharts.vue'
import AnalyticsTotalRevenueBarCharts from '@/views/dashboards/analytics/AnalyticsTotalRevenueBarCharts.vue'
import AnalyticsTotalTransactions from '@/views/dashboards/analytics/AnalyticsTotalTransactions.vue'
import AnalyticsVisitsByDay from '@/views/dashboards/analytics/AnalyticsVisitsByDay.vue'
import AnalyticsWeeklySales from '@/views/dashboards/analytics/AnalyticsWeeklySales.vue'

const statisticsVertical = [
  {
    title: 'Total Orders',
    color: 'primary',
    icon: 'ri-shopping-cart-line',
    stats: '155k',
    change: 22,
    subtitle: 'Last 4 Month',
  },
  {
    title: 'Total Sales',
    color: 'success',
    icon: 'ri-handbag-line',
    stats: '$13.4k',
    change: 38,
    subtitle: 'Last Six Months',
  },
  {
    title: 'Total Impression',
    color: 'info',
    icon: 'ri-link',
    stats: '142.8k',
    change: 62,
    subtitle: 'Last One Year',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Congratulations John -->
    <VCol
      cols="12"
      md="8"
      lg="8"
    >
      <AnalyticsCongratulationsJohn />
    </VCol>

    <!-- 👉 Vertical Cards -->
    <VCol
      cols="12"
      sm="6"
      md="2"
      lg="2"
    >
      <CardStatisticsVertical v-bind="statisticsVertical[0]" />
    </VCol>

    <!--  👉 Sessions line chart -->
    <VCol
      cols="12"
      sm="6"
      md="2"
      lg="2"
    >
      <AnalyticsTotalProfitLineCharts />
    </VCol>

    <!-- 👉 Total Transactions -->
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsTotalTransactions />
    </VCol>

    <!-- 👉 Performance Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <AnalyticsPerformance />
    </VCol>

    <!-- 👉 Project statistics -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <AnalyticsProjectStatistics />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <!-- 👉 Revenue Bar Charts -->
        <VCol cols="6">
          <AnalyticsTotalRevenueBarCharts />
        </VCol>

        <!-- 👉 Total Sales -->
        <VCol cols="6">
          <CardStatisticsVertical v-bind="statisticsVertical[1]" />
        </VCol>

        <!-- 👉 Total Impression -->
        <VCol cols="6">
          <CardStatisticsVertical v-bind="statisticsVertical[2]" />
        </VCol>

        <!-- 👉 Overview Radial Bar Charts -->
        <VCol cols="6">
          <AnalyticsOverviewRadialBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Sales Country -->
    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsSalesCountry />
    </VCol>

    <!-- 👉 Top Referral Sources -->
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsTopReferralSources />
    </VCol>

    <!-- 👉 Weekly Sales -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <AnalyticsWeeklySales />
    </VCol>

    <!-- 👉 Visits by Day -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <AnalyticsVisitsByDay />
    </VCol>

    <!-- 👉 Activity Timeline -->
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsActivityTimeline />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
