<script setup lang="ts">
// Lazy load ecommerce components for better performance
const EcommerceActivityTimeline = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceActivityTimeline.vue'))
const EcommerceLiveVisitors = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceLiveVisitors.vue'))
const EcommerceMarketingSales = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceMarketingSales.vue'))
const EcommerceOrdersImpressions = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceOrdersImpressions.vue'))
const EcommerceSalesMonthCharts = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceSalesMonthCharts.vue'))
const EcommerceSalesOverview = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceSalesOverview.vue'))
const EcommerceTopReferralSources = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceTopReferralSources.vue'))
const EcommerceTotalVisits = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceTotalVisits.vue'))
const EcommerceUserList = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceUserList.vue'))
const EcommerceVisitsByDay = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceVisitsByDay.vue'))
const EcommerceWeeklySalesBg = defineAsyncComponent(() => import('@/views/dashboard/ecommerce/EcommerceWeeklySalesBg.vue'))
import illustration1 from '@images/cards/illustration-1.png'
import illustration2 from '@images/cards/illustration-2.png'

const statisticsWithImages = [
  {
    title: 'Ratings',
    subtitle: 'Year of 2021',
    stats: '8.14k',
    change: 15.6,
    image: illustration1,
    imgWidth: 99,
    color: 'primary',
  },
  {
    title: 'Sessions',
    subtitle: 'Last Month',
    stats: '12.2k',
    change: -25.5,
    image: illustration2,
    imgWidth: 85,
    color: 'success',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Sales Overview -->
    <VCol
      cols="12"
      md="6"
    >
      <EcommerceSalesOverview />
    </VCol>

    <!-- 👉 Images Cards -->
    <VCol
      v-for="statistics in statisticsWithImages"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
    >
      <CardStatisticsWithImages v-bind="statistics" />
    </VCol>

    <!-- 👉 Weekly Sales -->
    <VCol
      cols="12"
      md="6"
    >
      <EcommerceWeeklySalesBg />
    </VCol>

    <!-- 👉 Total Visits -->
    <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <EcommerceTotalVisits />
    </VCol>

    <!-- 👉 Sales this months -->
    <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <EcommerceSalesMonthCharts />
    </VCol>

    <!-- 👉 Activity Timeline -->
    <VCol
      cols="12"
      md="6"
    >
      <EcommerceActivityTimeline />
    </VCol>

    <!-- 👉 Top Referral Sources -->
    <VCol
      cols="12"
      md="6"
    >
      <EcommerceTopReferralSources />
    </VCol>

    <!-- 👉 Total Impressions -->
    <VCol
      cols="12"
      md="3"
    >
      <EcommerceOrdersImpressions />
    </VCol>

    <!-- 👉 Marketing and Sales -->
    <VCol
      cols="12"
      md="5"
    >
      <EcommerceMarketingSales />
    </VCol>

    <!-- 👉 Live Visitors -->
    <VCol
      cols="12"
      md="4"
    >
      <EcommerceLiveVisitors />
    </VCol>

    <!-- 👉 User list -->
    <VCol
      cols="12"
      md="8"
    >
      <EcommerceUserList />
    </VCol>

    <!-- 👉 Visits by day -->
    <VCol
      cols="12"
      md="4"
    >
      <EcommerceVisitsByDay />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
