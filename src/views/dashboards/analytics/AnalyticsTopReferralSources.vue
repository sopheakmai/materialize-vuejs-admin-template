<script setup lang="ts">
import facebookLogo from '@images/logos/facebook.png'
import googleLogo from '@images/logos/google.png'
import instagramLogo from '@images/logos/instagram.png'
import redditLogo from '@images/logos/reddit.png'

interface Product {
  title: string
  status: { text: string; color: string }
  conversion: number
  totalRevenue: string
}

interface ProductData {
  google: Product[]
  facebook: Product[]
  instagram: Product[]
  reddit: Product[]
}

const currentTab = ref<keyof ProductData>('google')

const categories = [
  {
    title: 'Google',
    img: { src: googleLogo },
  },
  {
    title: 'Facebook',
    img: { src: facebookLogo },

  },
  {

    title: 'Instagram',
    img: { src: instagramLogo },
  },
  {

    title: 'Reddit',
    img: { src: redditLogo },
  },
]

const productData: ProductData = {
  google: [
    {
      title: 'Email Marketing Campaign',
      status: { text: 'Active', color: 'primary' },
      conversion: 24,
      totalRevenue: '42,857',
    },
    {
      title: 'Google Workspace',
      status: { text: 'Completed', color: 'warning' },
      conversion: -12,
      totalRevenue: '850',
    },
    {
      title: 'Affiliation Program',
      status: { text: 'Active', color: 'primary' },
      conversion: 24,
      totalRevenue: '5,576',
    },
    {
      title: 'Google AdSense',
      status: { text: 'In Draft', color: 'info' },
      conversion: 0,
      totalRevenue: '0',
    },
  ],
  facebook: [
    {
      title: 'Create Audiences in Ads Manager',
      status: { text: 'Active', color: 'primary' },
      conversion: -8,
      totalRevenue: '322',
    },
    {
      title: 'Facebook page advertising',
      status: { text: 'Active', color: 'primary' },
      conversion: 19,
      totalRevenue: '5,634',
    },
    {
      title: 'Messenger advertising',
      status: { text: 'Expired', color: 'error' },
      conversion: -23,
      totalRevenue: '751',
    },
    {
      title: 'Video campaign',
      status: { text: 'Completed', color: 'warning' },
      conversion: 21,
      totalRevenue: '3,585',
    },
  ],
  instagram: [
    {
      title: 'Create shopping advertising',
      status: { text: 'In Draft', color: 'info' },
      conversion: -15,
      totalRevenue: '599',
    },
    {
      title: 'IGTV advertising',
      status: { text: 'Completed', color: 'warning' },
      conversion: 37,
      totalRevenue: '1,467',
    },
    {
      title: 'Collection advertising',
      status: { text: 'In Draft', color: 'info' },
      conversion: 0,
      totalRevenue: '0',
    },
    {
      title: 'Stories advertising',
      status: { text: 'Active', color: 'primary' },
      conversion: 29,
      totalRevenue: '4,546',
    },
  ],
  reddit: [
    {
      title: 'Interests advertising',
      status: { text: 'Expired', color: 'error' },
      conversion: 2,
      totalRevenue: '404',
    },
    {
      title: 'Community advertising',
      status: { text: 'Active', color: 'primary' },
      conversion: 25,
      totalRevenue: '399',
    },
    {
      title: 'Device advertising',
      status: { text: 'Completed', color: 'warning' },
      conversion: 21,
      totalRevenue: '177',
    },
    {
      title: 'Campaigning',
      status: { text: 'Active', color: 'primary' },
      conversion: -5,
      totalRevenue: '1,139',
    },
  ],
}

const selectedProduct = computed(() => {
  return productData[currentTab.value]
})

const moreList = [
  { title: 'Last 28 Days', value: 'Last 28 Days' },
  { title: 'Last Month', value: 'Last Month' },
  { title: 'Last Year', value: 'Last Year' },
]
</script>

<template>
  <VCard
    title="Top Referral Sources"
    subtitle="Number of Sales"
  >
    <template #append>
      <div class="me-n2 mt-n8">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText class="pb-6">
      <VSlideGroup
        v-model="currentTab"
        show-arrows
        mandatory
      >
        <VSlideGroupItem
          v-for="category in categories"
          :key="category.title"
          v-slot="{ isSelected, toggle }"
          :value="category.title.toLowerCase()"
        >
          <div
            :class="isSelected ? 'selected-category' : 'not-selected-category'"
            class="d-flex flex-column justify-center align-center cursor-pointer rounded-xl px-5 py-2 me-4"
            style="block-size: 5.375rem; inline-size: 5.75rem;"
            @click="toggle"
          >
            <VImg
              v-bind="category.img"
              alt="slide-img"
              width="34"
              height="34"
            />
          </div>
        </VSlideGroupItem>

        <VSlideGroupItem>
          <div
            class="d-flex flex-column justify-center align-center rounded me-4 not-selected-category"
            style="block-size: 5.375rem; inline-size: 5.75rem;"
          >
            <VAvatar
              rounded
              size="30"
              color="default"
              variant="tonal"
            >
              <VIcon icon="ri-add-line" />
            </VAvatar>
          </div>
        </VSlideGroupItem>
      </VSlideGroup>
    </VCardText>

    <VTable class="text-no-wrap referral-table">
      <thead>
        <tr>
          <th
            scope="col"
            class="w-50"
          >
            PARAMETER
          </th>
          <th scope="col">
            STATUS
          </th>
          <th
            scope="col"
            class="text-end"
          >
            PROFIT
          </th>
          <th scope="col">
            TOTAL REVENUE
          </th>
        </tr>
      </thead>

      <tbody class="text-high-emphasis">
        <tr
          v-for="currentProduct in selectedProduct"
          :key="currentProduct.title"
        >
          <td>
            <span class="text-body-1">{{ currentProduct.title }}</span>
          </td>

          <td class="font-weight-medium">
            <VChip
              size="small"
              :color="currentProduct.status.color"
            >
              {{ currentProduct.status.text }}
            </VChip>
          </td>

          <td class="text-end">
            <span
              class="font-weight-medium text-sm"
              :class="Math.sign(currentProduct.conversion) > 0 ? 'text-success' : 'text-error'"
            >
              {{ Math.sign(currentProduct.conversion) > 0 ? `+${currentProduct.conversion}` : currentProduct.conversion }}%
            </span>
          </td>

          <td
            style="inline-size: 1rem;"
            class="font-weight-medium text-end text-body-1"
          >
            ${{ currentProduct.totalRevenue }}
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style lang="scss" scoped>
.selected-category {
  border: 2px solid rgb(var(--v-theme-primary));
}

.not-selected-category {
  border: 2px dashed rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>

<style lang="scss">
.referral-table {
  &.v-table .v-table__wrapper table thead tr th {
    background: none !important;
    block-size: 56px;
    border-block: thin solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
  }
}
</style>
