<script setup lang="ts">
import dribbleLogo from '@images/icons/brands/dribbble.png'
import instagramLogo from '@images/icons/brands/instagram.png'
import facebookRound from '@images/logos/facebook.png'
import twitterRound from '@images/logos/twitter.png'

const visits = [
  {
    visits: '12,348',
    progress: 12,
    siteName: 'Facebook',
    category: 'Social Media',
    logo: facebookRound,
  },
  {
    visits: '8,450',
    progress: 32,
    siteName: 'Dribbble',
    category: 'Community',
    logo: dribbleLogo,
  },
  {
    visits: '350',
    progress: -18,
    siteName: 'Twitter',
    category: 'Social Media',
    logo: twitterRound,
  },
  {
    visits: '25,566',
    progress: 45,
    siteName: 'Instagram',
    category: 'Social Media',
    logo: instagramLogo,
  },
]

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard title="Social Network Visits">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <div class="d-flex align-center">
        <h4 class="text-h4">
          $24,895
        </h4>

        <VIcon
          icon="ri-arrow-up-s-line"
          color="success"
          size="24"
        />

        <span class="text-success">62%</span>
      </div>
      <p class="mb-7">
        last 1 year visits
      </p>

      <VList class="card-list">
        <VListItem
          v-for="item in visits"
          :key="item.siteName"
        >
          <template #prepend>
            <VAvatar
              :image="item.logo"
              :size="34"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ item.siteName }}
          </VListItemTitle>

          <VListItemSubtitle>
            <div class="text-base">
              {{ item.category }}
            </div>
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center gap-x-2 font-weight-medium">
              <span>{{ item.visits }}</span>
              <VChip
                :color="item.progress > 0 ? 'success' : 'error'"
                size="small"
              >
                {{ item.progress > 0 ? `+${item.progress}%` : `${item.progress}%` }}
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}
</style>
