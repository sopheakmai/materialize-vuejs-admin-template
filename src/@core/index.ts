import type { LayoutConfig } from '@layouts/types'
import type { UserThemeConfig } from './types'

// Export tabs components and composables
export { default as AppTabs } from './components/AppTabs.vue'
export { default as LayoutWithTabs } from './components/LayoutWithTabs.vue'
export { useTabs } from './composable/useTabs'
export { useTabsStore } from './stores/tabs'
export type { TabItem } from './stores/tabs'

export const defineThemeConfig = (userConfig: UserThemeConfig): { themeConfig: UserThemeConfig, layoutConfig: LayoutConfig } => {
  return {
    themeConfig: userConfig,
    layoutConfig: {
      tabBar: {
        enable: userConfig.tabBar?.enable ?? true,
        maxTabs: userConfig.tabBar?.maxTabs ?? 15,
        closeLeftTabs: userConfig.tabBar?.closeLeftTabs ?? false,
        closeRightTabs: userConfig.tabBar?.closeRightTabs ?? false,
        closeOtherTabs: userConfig.tabBar?.closeOtherTabs ?? false,
        keepAliveEnabled: userConfig.tabBar?.keepAliveEnabled ?? true,
      },
      app: {
        title: userConfig.app.title,
        logo: userConfig.app.logo,
        contentWidth: userConfig.app.contentWidth,
        contentLayoutNav: userConfig.app.contentLayoutNav,
        overlayNavFromBreakpoint: userConfig.app.overlayNavFromBreakpoint,
        i18n: {
          enable: userConfig.app.i18n.enable,
        },
        iconRenderer: userConfig.app.iconRenderer,
      },
      navbar: {
        type: userConfig.navbar.type,
        navbarBlur: userConfig.navbar.navbarBlur,
      },
      footer: { type: userConfig.footer.type },
      verticalNav: {
        isVerticalNavCollapsed: userConfig.verticalNav.isVerticalNavCollapsed,
        defaultNavItemIconProps: userConfig.verticalNav.defaultNavItemIconProps,
      },
      horizontalNav: {
        type: userConfig.horizontalNav.type,
        transition: userConfig.horizontalNav.transition,
        popoverOffset: userConfig.horizontalNav.popoverOffset,
      },
      icons: {
        chevronDown: userConfig.icons.chevronDown,
        chevronRight: userConfig.icons.chevronRight,
        close: userConfig.icons.close,
        verticalNavPinned: userConfig.icons.verticalNavPinned,
        verticalNavUnPinned: userConfig.icons.verticalNavUnPinned,
        sectionTitlePlaceholder: userConfig.icons.sectionTitlePlaceholder,
      },
    },
  }
}
