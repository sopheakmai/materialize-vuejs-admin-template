<script setup lang="ts">
import appleIphone from '@images/cards/apple-iphone-x-lg.png'
import appleWatch from '@images/cards/apple-watch-green-lg.png'
import ps4Joystick from '@images/cards/ps4-joystick-lg.png'

const websiteAnalytics = [
  {
    name: 'Mobiles & Computers',
    slideImg: appleIphone,
    data: [
      {
        number: '24',
        text: 'Mobiles',
      },
      {
        number: '12',
        text: 'Tablets',
      },
      {
        number: '50',
        text: 'Accessories',
      },
      {
        number: '38',
        text: 'Computers',
      },
    ],
  },
  {
    name: 'Appliances & Electronics',
    slideImg: ps4Joystick,
    data: [
      {
        number: '16',
        text: 'Tv\'s',
      },
      {
        number: '40',
        text: 'Speakers',
      },
      {
        number: '19',
        text: 'Cameras',
      },
      {
        number: '18',
        text: 'Consoles',
      },
    ],
  },
  {
    name: 'Fashion',
    slideImg: appleWatch,
    data: [
      {
        number: '16',
        text: 'T-shirts',
      },
      {
        number: '29',
        text: 'Watches',
      },
      {
        number: '43',
        text: 'Shoes',
      },
      {
        number: '17',
        text: 'SubGlasses',
      },
    ],
  },
]
</script>

<template>
  <VCard color="primary">
    <VCarousel
      cycle
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="ri-circle-fill"
      height="auto"
      class="carousel-delimiter-top-end weekly-sale-carousel"
    >
      <VCarouselItem
        v-for="item in websiteAnalytics"
        :key="item.name"
      >
        <VCardItem>
          <VCardTitle class="text-white">
            Weekly Sales
          </VCardTitle>
          <VCardSubtitle class="text-white">
            Total 245.8k Sales

            <div class="d-inline-block text-success font-weight-medium">
              <div class="d-flex align-center">
                +62%
                <VIcon icon="ri-arrow-up-s-line" />
              </div>
            </div>
          </VCardSubtitle>
        </VCardItem>

        <VCardText>
          <VRow>
            <VCol
              cols="12"
              sm="8"
              lg="7"
              order="2"
              order-sm="1"
            >
              <VRow no-gutters>
                <VCol
                  cols="12"
                  class="pb-0"
                >
                  <h6 class="text-h6 text-white mb-3">
                    {{ item.name }}
                  </h6>
                </VCol>

                <VCol
                  v-for="d in item.data"
                  :key="d.number"
                  cols="6"
                  class="text-no-wrap text-truncate text-xs d-flex align-center gap-x-3 pb-5"
                >
                  <div
                    style="background-color: rgba(var(--v-theme-primary-darken-1));block-size: 30px; inline-size: 34px;"
                    class="rounded px-2 py-1 text-body-1 font-weight-medium text-white"
                  >
                    {{ d.number }}
                  </div>
                  <div class="text-body-1 text-white text-truncate">
                    {{ d.text }}
                  </div>
                </VCol>
              </VRow>
            </VCol>

            <VCol
              cols="12"
              sm="4"
              lg="5"
              order="1"
              order-sm="2"
              class="position-relative text-center"
            >
              <img
                :src="item.slideImg"
                class="card-weekly-sales-img"
                style="filter: drop-shadow(0 4px 40px rgba(0, 0, 0, 40%));"
              >
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style lang="scss">
.card-weekly-sales-img {
  block-size: 200px;
}

@media screen and (min-width: 600px) {
  .card-weekly-sales-img {
    position: absolute;
    margin: auto;
    inset-block: 0 40px;
    inset-inline-end: 1rem;
  }
}

.weekly-sale-carousel {
  .v-btn--icon.v-btn--density-default {
    color: rgba(var(--v-theme-primary-darken-1));
  }
}
</style>
