<script setup lang="ts">
const transactions = [
  {
    amount: -850,
    paymentMethod: 'Credit Card',
    description: 'Digital  Ocean',
    icon: 'ri-bank-card-line',
  },
  {
    paymentMethod: 'PayPal',
    amount: +34456,
    description: 'Received Money',
    icon: 'ri-paypal-line',
  },
  {
    amount: -199,
    paymentMethod: 'Mastercard',
    description: 'Netflix',
    icon: 'ri-mastercard-line',
  },
  {
    paymentMethod: 'Wallet',
    amount: -156,
    description: 'Mac\'D',
    icon: 'ri-wallet-3-line',
  },
  {
    paymentMethod: 'PayPal',
    amount: +12872,
    description: 'Refund',
    icon: 'ri-paypal-line',
  },
  {
    paymentMethod: 'Stripe',
    amount: -299,
    description: 'Buy Apple Watch',
    icon: 'ri-bank-card-2-line',
  },
]

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days', class: 'text-error' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]

const resolveAvatarColor = (paymentMethod: string) => {
  if (paymentMethod === 'Stripe')
    return 'warning'

  if (paymentMethod === 'PayPal')
    return 'primary'

  if (paymentMethod === 'Wallet')
    return 'error'

  if (paymentMethod === 'Mastercard')
    return 'info'

  if (paymentMethod === 'Credit Card')
    return 'success'
}
</script>

<template>
  <VCard title="Transactions">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="item in transactions"
          :key="item.paymentMethod"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="resolveAvatarColor(item.paymentMethod)"
              class="me-1"
            >
              <VIcon
                :icon="item.icon"
                size="24"
              />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ item.paymentMethod }}
          </VListItemTitle>

          <VListItemSubtitle class="text-body-1">
            {{ item.description }}
          </VListItemSubtitle>

          <template #append>
            <VListItemAction class="font-weight-medium">
              <span class="me-2">{{ item.amount > 0 ? `+$${Math.abs(item.amount)}` : `-$${Math.abs(item.amount)}` }}</span>
              <VIcon
                :size="24"
                :color="item.amount > 0 ? 'success' : 'error'"
                :icon="item.amount > 0 ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
              />
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.5rem;
  }
</style>
