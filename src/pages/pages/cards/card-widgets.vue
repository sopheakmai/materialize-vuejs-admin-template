<script setup lang="ts">
import CardWidgetsActivityTimeline from '@/views/pages/cards/card-widgets/CardWidgetsActivityTimeline.vue'
import CardWidgetsDeliveryExceptions from '@/views/pages/cards/card-widgets/CardWidgetsDeliveryExceptions.vue'
import CardWidgetsExternalLinks from '@/views/pages/cards/card-widgets/CardWidgetsExternalLinks.vue'
import CardWidgetsMonthlyBudget from '@/views/pages/cards/card-widgets/CardWidgetsMonthlyBudget.vue'
import CardWidgetsOrganicSessions from '@/views/pages/cards/card-widgets/CardWidgetsOrganicSessions.vue'
import CardWidgetsPerformance from '@/views/pages/cards/card-widgets/CardWidgetsPerformance.vue'
import CardWidgetsPerformanceOverview from '@/views/pages/cards/card-widgets/CardWidgetsPerformanceOverview.vue'
import CardWidgetsProjectTimeline from '@/views/pages/cards/card-widgets/CardWidgetsProjectTimeline.vue'
import CardWidgetsSalesCountry from '@/views/pages/cards/card-widgets/CardWidgetsSalesCountry.vue'
import CardWidgetsTotalTransactions from '@/views/pages/cards/card-widgets/CardWidgetsTotalTransactions.vue'
import CardWidgetsVisitsByDay from '@/views/pages/cards/card-widgets/CardWidgetsVisitsByDay.vue'
import CardWidgetsWeeklyOverview from '@/views/pages/cards/card-widgets/CardWidgetsWeeklyOverview.vue'
import CardWidgetsWeeklySales from '@/views/pages/cards/card-widgets/CardWidgetsWeeklySales.vue'
import CardWidgetsInterestedTopics from '@/views/pages/cards/card-widgets/cardWidgetsInterestedTopics.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <CardWidgetsTotalTransactions />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsPerformanceOverview />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsVisitsByDay />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsOrganicSessions />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsWeeklySales />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <CardWidgetsProjectTimeline />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CardWidgetsMonthlyBudget />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CardWidgetsPerformance />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsExternalLinks />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsSalesCountry />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <CardWidgetsActivityTimeline />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <CardWidgetsWeeklyOverview />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <CardWidgetsInterestedTopics />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <CardWidgetsDeliveryExceptions />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
