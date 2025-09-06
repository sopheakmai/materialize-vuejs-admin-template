<script setup lang="ts">
import logoCreditCard2 from '@images/cards/logo-credit-card-2.png'
import logoMastercardSmall from '@images/cards/logo-mastercard-small.png'

const savedCards = [
  {
    logo: logoMastercardSmall,
    type: 'Credit card',
    number: '2566 xxxx xxxx 8908',
  },
  {
    logo: logoCreditCard2,
    type: 'Credit card',
    number: '8990 xxxx xxxx 6852',
  },
]
</script>

<template>
  <VCard>
    <!-- SECTION Card Header and Menu -->
    <VCardItem>
      <!-- 👉 Title -->
      <VCardTitle>Upgrade Your Plan</VCardTitle>

      <!-- 👉 menu -->
      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>
    <!-- !SECTION -->

    <VCardText>
      <p class="text-body-2">
        Please make the payment to start enjoying all the features of our premium plan as soon as possible.
      </p>

      <!-- SECTION Upgrade plan banner -->
      <div class="plan-upgrade-banner pa-4 d-flex rounded-xl align-center">
        <VAvatar
          rounded="lg"
          size="40"
          class="plan-details me-4 border-opacity-100 border-primary"
        >
          <VIcon
            icon="ri-trophy-line"
            color="primary"
            alt="briefcase"
          />
        </VAvatar>

        <div class="d-flex flex-column">
          <h6 class="text-h6">
            Platinum
          </h6>
          <span class="text-primary text-body-2">Upgrade Plan</span>
        </div>
        <VSpacer />
        <div class="d-flex align-center">
          <sup>
            <div class="text-body-2 text-high-emphasis">$</div>
          </sup>
          <h4 class="text-h4">
            5250
          </h4>
          <sub>
            <div class="text-body-2 text-high-emphasis">/Year</div>
          </sub>
        </div>
      </div>
      <!-- !SECTION -->

      <!-- SECTION Payment Details -->
      <VList class="card-list mt-1">
        <h6 class="text-h6 my-2">
          Payment details
        </h6>

        <VListItem
          v-for="card in savedCards"
          :key="card.logo"
          class="mb-2"
        >
          <!-- 👉 Avatar -->
          <template #prepend>
            <img
              :src="card.logo"
              height="30"
              width="42"
              class="me-3"
            >
          </template>

          <!-- 👉 Title and Subtitle -->

          <VListItemTitle class="font-weight-medium">
            {{ card.type }}
          </VListItemTitle>
          <VListItemSubtitle class="me-2">
            {{ card.number }}
          </VListItemSubtitle>

          <!-- 👉 Action -->
          <template #append>
            <VListItemAction>
              <VTextField
                density="compact"
                placeholder="CVV"
                style="inline-size: 5rem;"
              />
            </VListItemAction>
          </template>
        </VListItem>
      </VList>

      <!-- 👉 Add Payment  -->
      <a
        href="javascript:void(0)"
        class="d-inline-block text-sm mb-3"
      >Add Payment Method</a>
      <!-- !SECTION -->

      <!-- 👉 Email -->
      <VForm>
        <VRow>
          <VCol cols="12">
            <VTextField
              placeholder="Email Address"
              density="compact"
              class="mb-3"
            />
            <VBtn block>
              Contact Now
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.plan-upgrade-banner {
  .plan-details {
    border: 1px solid rgb(var(--v-theme-primary));
  }

  background-color: rgba(var(--v-theme-primary), 0.16);
}

.card-list {
  --v-card-list-gap: 0;
}
</style>
