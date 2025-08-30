<script setup lang="ts">
// Lazy load analytics components for better performance
const AnalyticsActivityTimeline = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsActivityTimeline.vue'))
const AnalyticsCongratulationsJohn = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsCongratulationsJohn.vue'))
const AnalyticsOverviewRadialBarCharts = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsOverviewRadialBarCharts.vue'))
const AnalyticsPerformance = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsPerformance.vue'))
const AnalyticsProjectStatistics = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsProjectStatistics.vue'))
const AnalyticsSalesCountry = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsSalesCountry.vue'))
const AnalyticsTopReferralSources = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsTopReferralSources.vue'))
const AnalyticsTotalProfitLineCharts = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsTotalProfitLineCharts.vue'))
const AnalyticsTotalRevenueBarCharts = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsTotalRevenueBarCharts.vue'))
const AnalyticsTotalTransactions = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsTotalTransactions.vue'))
const AnalyticsVisitsByDay = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsVisitsByDay.vue'))
const AnalyticsWeeklySales = defineAsyncComponent(() => import('@/views/dashboard/analytics/AnalyticsWeeklySales.vue'))
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
      <CardStatisticsVertical
        v-bind="{
          title: 'Total Orders',
          color: 'primary',
          icon: 'mdi-cart-plus',
          stats: '155k',
          change: 22,
          subtitle: 'Last 4 Month',
        }"
      />
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
          <CardStatisticsVertical
            v-bind="{
              title: 'Total Sales',
              color: 'success',
              icon: 'mdi-currency-usd',
              stats: '$13.4k',
              change: 38,
              subtitle: 'Last Six Months',
            }"
          />
        </VCol>

        <!-- 👉 Total Impression -->
        <VCol cols="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total Impression',
              color: 'info',
              icon: 'mdi-link',
              stats: '142.8k',
              change: 62,
              subtitle: 'Last One Year',
            }"
          />
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
