<script setup lang="ts">
import accountLogo from '@images/cards/accounting-logo.png'
import marketingExpense from '@images/cards/marketing-expense-logo.png'
import salesOverview from '@images/cards/sales-overview-logo.png'

const websiteAnalytics = [
  {
    name: 'Marketing Expense',
    slideImg: marketingExpense,
    data: [
      {
        number: '5k',
        text: 'Operating',
      },
      {
        number: '6k',
        text: 'COGF',
      },
      {
        number: '2k',
        text: 'Financial',
      },
      {
        number: '1k',
        text: 'Expenses',
      },
    ],
  },
  {
    name: 'Accounting',
    slideImg: accountLogo,
    data: [
      {
        number: '18',
        text: 'Billing',
      },
      {
        number: '28',
        text: 'Sales',
      },
      {
        number: '30',
        text: 'Leads',
      },
      {
        number: '80',
        text: 'Impression',
      },
    ],
  },
  {
    name: 'Sales Overview',
    slideImg: salesOverview,
    data: [
      {
        number: '68',
        text: 'Open',
      },
      {
        number: '52',
        text: 'Converted',
      },
      {
        number: '04',
        text: 'Lost',
      },
      {
        number: '12',
        text: 'Quotations',
      },
    ],
  },
]
</script>

<template>
  <VCard>
    <VCarousel
      cycle
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="ri-circle-fill"
      height="auto"
      class="carousel-delimiter-top-end dots-active-primary"
    >
      <VCarouselItem
        v-for="item in websiteAnalytics"
        :key="item.name"
      >
        <VCardItem>
          <VCardTitle>Marketing & Sales</VCardTitle>
          <VCardSubtitle>
            Total 245.8k Sales

            <div class="d-inline-block text-success font-weight-medium">
              <div class="d-flex align-center">
                +24%
                <VIcon
                  icon="ri-arrow-up-s-line"
                  size="20"
                />
              </div>
            </div>
          </VCardSubtitle>
        </VCardItem>

        <VCardText class="py-0">
          <div class="d-flex flex-column flex-sm-row gap-6 mb-3">
            <div class="text-center">
              <img
                width="86"
                height="102"
                :src="item.slideImg"
                class="rounded"
              >
            </div>
            <div>
              <h6 class="text-h6 mb-2">
                {{ item.name }}
              </h6>
              <div>
                <VRow no-gutters>
                  <VCol
                    v-for="d in item.data"
                    :key="d.number"
                    cols="6"
                    class="text-no-wrap text-truncate text-xs d-flex align-center gap-x-3 pb-3"
                  >
                    <div
                      style="background-color: rgba(var(--v-theme-on-surface), var(--v-selected-opacity));block-size: 30px; inline-size: 34px;"
                      class="rounded px-2 py-1 text-body-1 font-weight-medium"
                    >
                      {{ d.number }}
                    </div>
                    <div class="text-body-1 text-truncate">
                      {{ d.text }}
                    </div>
                  </VCol>
                </VRow>
              </div>
            </div>
          </div>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
    <VCardText class="pt-0">
      <VBtn
        variant="outlined"
        size="small"
        class="me-4"
        prepend-icon="ri-sticky-note-line"
      >
        Details
      </VBtn>
      <VBtn
        size="small"
        prepend-icon="ri-download-line"
      >
        Report
      </VBtn>
    </VCardText>
  </VCard>
</template>
