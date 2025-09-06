<script setup lang="ts">
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'
import type { HelpCenterArticle } from '@db/pages/help-center/types'

const breadCrumbItems = [
  {
    title: 'Help Center',
    to: { name: 'front-pages-help-center' },
  },
  {
    title: 'Buying and item support',
  },
  {
    title: 'Template kits',
  },
]

const store = useConfigStore()

store.skin = 'default'
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const articleData = ref<HelpCenterArticle>()

setTimeout(async () => {
  const { data, error } = await useApi<any>('/pages/help-center/article')

  if (error.value)
    console.log(error.value)
  else
    articleData.value = data.value
}, 1000)
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="bg-surface help-center-article">
    <!-- 👉 Navbar  -->
    <Navbar />

    <!-- 👉 Content -->
    <VContainer v-if="articleData">
      <div
        class="d-flex gap-6 flex-lg-row flex-column"
        style=" margin-block: 9.25rem 5.25rem;"
      >
        <div>
          <div>
            <VBreadcrumbs
              class="px-0 pb-2 pt-0 flex-wrap"
              :items="breadCrumbItems"
            >
              <template #item="{ item, index }">
                <div
                  class="text-body-1"
                  :class="index === breadCrumbItems.length - 1 ? 'text-high-emphasis' : 'text-medium-emphasis'"
                >
                  {{ item.title }}
                </div>
              </template>
            </VBreadcrumbs>
            <h4 class="text-h4 mb-2">
              {{ articleData?.title }}
            </h4>
            <div class="text-body-1">
              {{ articleData?.lastUpdated }}
            </div>
          </div>

          <VDivider class="my-6" />

          <div
            class="mb-6"
            v-html="articleData?.productContent"
          />

          <VImg :src="articleData?.productImg" />

          <p class="my-6 text-body-1">
            {{ articleData?.checkoutContent }}
          </p>

          <VImg :src="articleData?.checkoutImg" />
        </div>

        <div style="min-inline-size: 300px;">
          <VTextField
            prepend-inner-icon="ri-search-line"
            placeholder="Search..."
            class="mb-6"
          />

          <div>
            <!-- 👉 Article List  -->
            <h5
              class="text-h5 px-5 py-2 mb-4 rounded-lg"
              style="background: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));"
            >
              Articles in this section
            </h5>

            <VList class="card-list">
              <VListItem
                v-for="(item, index) in articleData?.articleList"
                :key="index"
                link
              >
                <template #append>
                  <VIcon
                    size="20"
                    icon="ri-arrow-right-s-line"
                    color="disabled"
                  />
                </template>

                <VListItemTitle>
                  {{ item }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </div>
        </div>
      </div>
    </VContainer>

    <!-- 👉 Footer  -->
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}

.help-center-article {
  @media (min-width: 600px) and (max-width: 960px) {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
