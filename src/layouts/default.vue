<script lang="ts" setup>
import LayoutWithTabs from '@core/components/LayoutWithTabs.vue'
import PageKeepAliveWrapper from '@core/components/PageKeepAliveWrapper.vue'
import { useConfigStore } from '@core/stores/config'
import { AppContentLayoutNav } from '@layouts/enums'
import { switchToVerticalNavOnLtOverlayNavBreakpoint } from '@layouts/utils'

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(() => import('./components/DefaultLayoutWithHorizontalNav.vue'))
const DefaultLayoutWithVerticalNav = defineAsyncComponent(() => import('./components/DefaultLayoutWithVerticalNav.vue'))

const configStore = useConfigStore()

// ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout
// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint()

const { layoutAttrs, injectSkinClasses } = useSkins()

injectSkinClasses()

// Keep-alive state
const keepAliveEnabled = ref(true)
const cachedViews = ref<string[]>(['RoutePageKeepAliveWrapper'])

// Get component name from route
const getComponentNameFromRoute = (routePath: string) => {
  // Extract the last part of the route path to use as the component name
  // Strip leading slash and any query parameters
  const path = routePath.replace(/^\//, '').split('?')[0]
  return path || 'default'
}

// Method to add a route to cached views
const addCachedView = (routePath: string) => {
  // Use RoutePageKeepAliveWrapper as the component name to include
  if (!cachedViews.value.includes('RoutePageKeepAliveWrapper')) {
    console.log(`[KeepAlive] Adding RoutePageKeepAliveWrapper to cache`)
    cachedViews.value.push('RoutePageKeepAliveWrapper')
  }

  // Log for debugging
  console.log(`[KeepAlive] Current cached views:`, cachedViews.value)
}

// Method to remove a route from cached views
const removeCachedView = (routePath: string) => {
  // With our approach, we don't need to remove individual routes
  // Just keep the wrapper component cached
  console.log(`[KeepAlive] Keeping wrapper component cached (ignoring request to remove ${routePath})`)
}

// Check if we're in development mode
const isDevelopment = computed(() => import.meta.env.DEV)

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref<any>(null)

// watching if the fallback state is active and the refLoadingIndicator component is available
watch([isFallbackStateActive, refLoadingIndicator], () => {
  if (isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.fallbackHandle()

  if (!isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.resolveHandle()
}, { immediate: true })
// !SECTION
</script>

<template>
  <Component
    v-bind="layoutAttrs"
    :is="configStore.appContentLayoutNav === AppContentLayoutNav.Vertical ? DefaultLayoutWithVerticalNav : DefaultLayoutWithHorizontalNav"
  >
    <AppLoadingIndicator ref="refLoadingIndicator" />

    <RouterView v-slot="{ Component }">
      <Suspense
        :timeout="0"
        @fallback="isFallbackStateActive = true"
        @resolve="isFallbackStateActive = false"
      >
        <template v-if="!$route.meta.disableTabs">
          <LayoutWithTabs
            :show-tabs="!$route.meta.hideTabs"
            :add-current-route-as-tab="$route.meta.addToTabs !== false"
            :keep-alive="keepAliveEnabled"
            @keep-alive-include="addCachedView"
            @keep-alive-exclude="removeCachedView"
            @update:keep-alive="val => keepAliveEnabled = val"
          >
            <!-- Use the wrapper component to ensure proper component naming when keep-alive is enabled -->
            <KeepAlive v-if="keepAliveEnabled" :include="cachedViews">
              <PageKeepAliveWrapper :key="$route.path" :page-name="getComponentNameFromRoute($route.path)">
                <Component :is="Component" />
              </PageKeepAliveWrapper>
            </KeepAlive>
            <Component :is="Component" v-else :key="$route.path" />
          </LayoutWithTabs>
        </template>
        <Component :is="Component" v-else />
      </Suspense>
    </RouterView>
  </Component>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
