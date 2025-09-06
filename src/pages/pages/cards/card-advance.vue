<script setup lang="ts">
import CardAdvanceActivityTimeline from '@/views/pages/cards/card-advance/CardActivityTimeline.vue'
import CardAdvancedGeneralStatistics from '@/views/pages/cards/card-advance/CardAdvanceGeneralStatistics.vue'
import CardAdvancedIosFinanceApp from '@/views/pages/cards/card-advance/CardAdvanceIosFinanceApp.vue'
import CardAdvancedMarketingSales from '@/views/pages/cards/card-advance/CardAdvanceMarketingSales.vue'
import CardAdvanceMeetingSchedule from '@/views/pages/cards/card-advance/CardAdvanceMeetingSchedule.vue'
import CardAdvancedMostSalesInCountries from '@/views/pages/cards/card-advance/CardAdvanceMostSalesInCountries.vue'
import CardAdvancedOrderByCountries from '@/views/pages/cards/card-advance/CardAdvanceOrderByCountries.vue'
import CardAdvancedPaymentHistory from '@/views/pages/cards/card-advance/CardAdvancePaymentHistory.vue'
import CardAdvancedPopularInstructors from '@/views/pages/cards/card-advance/CardAdvancePopularInstructors.vue'
import CardAdvancedProjectStatistics from '@/views/pages/cards/card-advance/CardAdvanceProjectStatistics.vue'
import CardAdvancedSocialNetworkVisits from '@/views/pages/cards/card-advance/CardAdvanceSocialNetworkVisits.vue'
import CardAdvanceSubscribersByCountry from '@/views/pages/cards/card-advance/CardAdvanceSubscribersByCountry.vue'
import CardAdvancedTopCourses from '@/views/pages/cards/card-advance/CardAdvanceTopCourses.vue'
import CardAdvancedTopReferralSources from '@/views/pages/cards/card-advance/CardAdvanceTopReferralSources.vue'
import CardAdvanceTotalEarning from '@/views/pages/cards/card-advance/CardAdvanceTotalEarning.vue'
import CardAdvanceTransactions from '@/views/pages/cards/card-advance/CardAdvanceTransactions.vue'
import CardAdvancedUpcomingWebinar from '@/views/pages/cards/card-advance/CardAdvanceUpcomingWebinar.vue'
import CardAdvanceUpgradeYourPlan from '@/views/pages/cards/card-advance/CardAdvanceUpgradeYourPlan.vue'
import CardAdvancedWeeklySalesBg from '@/views/pages/cards/card-advance/CardAdvanceWeeklySalesBg.vue'
import CardAdvancedAssignmentProgress from '@/views/pages/cards/card-advance/CardAdvancedAssignmentProgress.vue'
import CardAdvancedDeliveryPerformance from '@/views/pages/cards/card-advance/CardAdvancedDeliveryPerformance.vue'
</script>

<template>
  <VRow>
    <!-- 👉 Transactions -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceTransactions />
    </VCol>

    <!-- 👉 Upgrade Your Plan -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceUpgradeYourPlan />
    </VCol>

    <!-- 👉 Meeting Schedule -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceMeetingSchedule />
    </VCol>

    <!-- 👉 Project Statistics -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedProjectStatistics />
    </VCol>

    <!-- 👉 Top Referral Sources -->
    <VCol
      cols="12"
      md="6"
      lg="8"
    >
      <CardAdvancedTopReferralSources />
    </VCol>

    <!-- 👉 Total Earning -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceTotalEarning />
    </VCol>

    <!-- 👉 General Statistics -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedGeneralStatistics />
    </VCol>

    <!-- 👉 Popular Instructors -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedPopularInstructors />
    </VCol>

    <!-- 👉 Top Courses -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedTopCourses />
    </VCol>

    <!-- 👉 Upcoming Webinar -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedUpcomingWebinar />
    </VCol>

    <!-- 👉 Assignment Progress -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedAssignmentProgress />
    </VCol>

    <!-- 👉 Most Sales In Countries -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedMostSalesInCountries />
    </VCol>

    <!-- 👉 Payment History -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedPaymentHistory />
    </VCol>

    <!-- 👉 Subscribers By Country -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceSubscribersByCountry />
    </VCol>

    <!-- 👉 Order By Countries -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedOrderByCountries />
    </VCol>

    <!-- 👉 Delivery Performance -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedDeliveryPerformance />
    </VCol>

    <!-- 👉 Social Network Visits -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedSocialNetworkVisits />
    </VCol>

    <!-- 👉 Activity Timeline -->
    <VCol
      cols="12"
      md="6"
      lg="8"
    >
      <CardAdvanceActivityTimeline />
    </VCol>

    <!-- 👉 IOS Finance App -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvancedIosFinanceApp />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <CardAdvancedMarketingSales />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <CardAdvancedWeeklySalesBg />
    </VCol>
  </VRow>
</template>
