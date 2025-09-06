<script setup lang="ts">
import illustration3dDark from '@images/cards/3d-illustration-dark.png'
import illustration3dLight from '@images/cards/3d-illustration.png'
import square4Dark from '@images/cards/4-square-dark.png'
import square4Light from '@images/cards/4-square.png'
import deltaWebAppDark from '@images/cards/delta-web-app-dark.png'
import deltaWebAppLight from '@images/cards/delta-web-app.png'
import ecommerceWebsiteDark from '@images/cards/ecommerce-website-dark.png'
import ecommerceWebsiteLight from '@images/cards/ecommerce-website.png'
import financeAppDesignDark from '@images/cards/finance-app-design-dark.png'
import financeAppDesignLight from '@images/cards/finance-app-design.png'

const square4 = useGenerateImageVariant(square4Light, square4Dark)
const deltaWebApp = useGenerateImageVariant(deltaWebAppLight, deltaWebAppDark)
const ecommerceWebsite = useGenerateImageVariant(ecommerceWebsiteLight, ecommerceWebsiteDark)
const financeAppDesign = useGenerateImageVariant(financeAppDesignLight, financeAppDesignDark)
const illustration3d = useGenerateImageVariant(illustration3dLight, illustration3dDark)

const projects = ref([
  {
    budget: '$6,500',
    title: '3D Illustration',
    subtitle: 'Blender Illustration',
    img: illustration3d,
  },
  {
    budget: '$4,290',
    title: 'Finance App Design',
    subtitle: 'Figma UI Kit',
    img: financeAppDesign,
  },
  {
    budget: '$44,500',
    title: '4 Square',
    subtitle: 'Android Application',
    img: square4,
  },
  {
    budget: '$12,690',
    title: 'Delta Web App',
    subtitle: 'React Dashboard',
    img: deltaWebApp,
  },
  {
    budget: '$10,850',
    title: 'eCommerce Website',
    subtitle: 'Vue + Laravel',
    img: ecommerceWebsite,
  },
])

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard title="Project Statistics">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText class="py-4">
      <VList class="card-list">
        <VListItem class="pb-0">
          <VListItemTitle class="d-flex justify-space-between font-weight-medium">
            <span class="text-overline text-medium-emphasis">
              NAME
            </span>
            <span class="text-overline text-medium-emphasis">BUDGET</span>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VCardText>

    <VDivider />

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="project in projects"
          :key="project.title"
        >
          <template #prepend>
            <VImg
              :src="project.img"
              height="auto"
              width="auto"
              class="me-4"
            />
          </template>

          <VListItemTitle class="font-weight-medium text-sm">
            {{ project.title }}
          </VListItemTitle>

          <VListItemSubtitle class="text-xs">
            {{ project.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <VListItemAction>
              <VChip
                :text="project.budget"
                color="primary"
                size="small"
                class="font-weight-medium"
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
  --v-card-list-gap: 1.75rem;
}
</style>
