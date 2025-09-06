<script setup lang="ts">
const trends = [
  {
    title: 'Profit',
    amount: '$54,234',
    trendNumber: 85,
  },
  {
    title: 'Sales',
    amount: '8,657',
    trendNumber: 42,
  },
  {
    title: 'User',
    amount: '16,456',
    trendNumber: -12,
  },
]

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]

const resolveDotColor = (title: string) => {
  if (title === 'User')
    return 'info'
  else if (title === 'Sales')
    return 'warning'
  else
    return 'primary'
}
</script>

<template>
  <VCard title="General Statistics">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <div class="d-flex align-center mb-6">
        <VAvatar
          rounded
          variant="tonal"
          color="primary"
          size="50"
          class="me-4"
        >
          <VIcon
            icon="ri-bank-card-line"
            size="24"
          />
        </VAvatar>

        <div>
          <h3 class="text-h3">
            $89,522
          </h3>

          <p class="mb-0">
            Last 6 Month profit
          </p>
        </div>
      </div>

      <div class="py-3">
        <h6 class="text-h6 mb-1">
          Current Activity
        </h6>
        <VProgressLinear
          rounded
          :model-value="85"
          color="primary"
          height="6"
        />
      </div>

      <VTable class="text-no-wrap">
        <tbody class="text-high-emphasis">
          <tr
            v-for="trend in trends"
            :key="trend.trendNumber"
          >
            <td class="ps-0">
              <div class="d-flex align-center gap-x-3">
                <VIcon
                  icon="ri-circle-fill"
                  :color="resolveDotColor(trend.title)"
                  :size="14"
                />
                {{ trend.title }}
              </div>
            </td>

            <td class="font-weight-medium text-end">
              {{ trend.amount }}
            </td>

            <td class="d-flex align-center justify-end font-weight-medium text-end pe-0 gap-x-2">
              {{ trend.trendNumber > 0 ? `+${trend.trendNumber}%` : `${trend.trendNumber}%` }}
              <VIcon
                :icon="trend.trendNumber > 0 ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
                :color="trend.trendNumber > 0 ? 'success' : 'error'"
                size="24"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
