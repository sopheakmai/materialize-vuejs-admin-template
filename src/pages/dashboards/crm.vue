<script setup lang="ts">
import CrmCongratulationsNorris from '@/views/dashboards/crm/CrmCongratulationsNorris.vue'
import CrmExternalLinks from '@/views/dashboards/crm/CrmExternalLinks.vue'
import CrmGrowthDonutCharts from '@/views/dashboards/crm/CrmGrowthDonutCharts.vue'
import CrmMeetingSchedule from '@/views/dashboards/crm/CrmMeetingSchedule.vue'
import CrmMonthlyBudget from '@/views/dashboards/crm/CrmMonthlyBudget.vue'
import CrmMostSalesInCountries from '@/views/dashboards/crm/CrmMostSalesInCountries.vue'
import CrmOrganicSessions from '@/views/dashboards/crm/CrmOrganicSessions.vue'
import CrmPaymentHistory from '@/views/dashboards/crm/CrmPaymentHistory.vue'
import CrmProfitBarWithGapCharts from '@/views/dashboards/crm/CrmProfitBarWithGapCharts.vue'
import CrmProjectTimeline from '@/views/dashboards/crm/CrmProjectTimeline.vue'
import CrmSocialNetworkVisits from '@/views/dashboards/crm/CrmSocialNetworkVisits.vue'
import CrmUserList from '@/views/dashboards/crm/CrmUserList.vue'
import CrmWeeklyOverview from '@/views/dashboards/crm/CrmWeeklyOverview.vue'

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
    title: 'Total Sales',
    color: 'success',
    icon: 'ri-handbag-line',
    stats: '13.4k',
    change: 38,
    subtitle: 'Last Six months',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Award -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmCongratulationsNorris />
    </VCol>

    <!-- 👉 Total Orders -->
    <VCol
      v-for="statistics in statisticsVertical"
      :key="statistics.title"
      cols="12"
      sm="3"
      md="2"
    >
      <CardStatisticsVertical v-bind="statistics" />
    </VCol>

    <!-- 👉 Profile Line Charts -->
    <VCol
      cols="12"
      sm="3"
      md="2"
    >
      <CrmProfitBarWithGapCharts />
    </VCol>

    <!-- 👉 Total Growth -->
    <VCol
      cols="12"
      md="2"
      sm="3"
    >
      <CrmGrowthDonutCharts />
    </VCol>

    <!-- 👉 Organic Sessions -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmOrganicSessions />
    </VCol>

    <!-- 👉 Project Timeline -->
    <VCol
      cols="12"
      md="8"
    >
      <CrmProjectTimeline />
    </VCol>

    <!-- 👉 Weekly Overview -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CrmWeeklyOverview />
    </VCol>

    <!-- 👉 Social Network Visits -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CrmSocialNetworkVisits />
    </VCol>

    <!-- 👉 Monthly Budget -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CrmMonthlyBudget />
    </VCol>

    <!-- 👉 Meeting Schedule -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CrmMeetingSchedule />
    </VCol>

    <!-- 👉 External Links -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CrmExternalLinks />
    </VCol>

    <!-- 👉 Payment History -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CrmPaymentHistory />
    </VCol>

    <!-- 👉 Most Sales in Countries -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmMostSalesInCountries />
    </VCol>

    <!-- 👉 User List -->
    <VCol
      cols="12"
      md="8"
    >
      <CrmUserList />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
