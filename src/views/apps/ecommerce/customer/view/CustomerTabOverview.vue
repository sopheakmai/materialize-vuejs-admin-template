<script setup lang="ts">
import CustomerOrderTable from './CustomerOrderTable.vue'
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardText class="d-flex gap-y-2 flex-column">
          <VAvatar
            variant="tonal"
            color="primary"
            icon="ri-money-dollar-circle-line"
            rounded
          />
          <h5 class="text-h5">
            Account Balance
          </h5>
          <div class="text-base">
            <p class="mb-0">
              <span class="text-primary text-h5 me-1 d-inline-block">$7480</span>
              Credit Left
            </p>
            <p class="mb-0 text-base">
              Account balance for next purchase
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardText class="d-flex gap-y-2 flex-column">
          <VAvatar
            variant="tonal"
            color="success"
            icon="ri-gift-line"
            rounded
          />
          <h5 class="text-h5">
            Loyalty Program
          </h5>
          <div>
            <VChip
              color="success"
              size="small"
              class="mb-2"
            >
              Platinum Member
            </VChip>

            <p class="mb-0 text-base">
              3000 points to next tier
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardText class="d-flex gap-y-2 flex-column">
          <VAvatar
            variant="tonal"
            color="warning"
            icon="ri-star-smile-line"
            rounded
          />
          <h5 class="text-h5">
            Wishlist
          </h5>
          <div>
            <p class="mb-0">
              <span class="text-warning text-h5 d-inline-block me-1">15</span>
              items in wishlist
            </p>
            <p class="mb-0 text-base">
              Receive notification when items go on sale
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardText class="d-flex gap-y-2 flex-column">
          <VAvatar
            variant="tonal"
            color="info"
            icon="ri-vip-crown-line"
            rounded
          />
          <h5 class="text-h5">
            Coupons
          </h5>
          <div>
            <p class="mb-0">
              <span class="text-info text-h5 d-inline-block me-2">21</span>
              Coupons you win
            </p>
            <p class="mb-0 text-base">
              Use coupon on next purchase
            </p>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol>
      <CustomerOrderTable />
    </VCol>
  </VRow>
</template>
