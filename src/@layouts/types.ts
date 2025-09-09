import type { OffsetOptions } from '@floating-ui/dom'
import type { RouteLocationRaw } from 'vue-router'
import type { AppContentLayoutNav, ContentWidth, FooterType, HorizontalNavType, NavbarType } from '@layouts/enums'

export type LayoutConfig = {
  tabBar?: {
    enable?: boolean
    maxTabs?: number
    keepAliveEnabled?: boolean
    closeLeftTabs?: boolean
    closeRightTabs?: boolean
    closeOtherTabs?: boolean
  }
  app: {
    title: Lowercase<string>
    logo: VNode
    contentWidth: typeof ContentWidth[keyof typeof ContentWidth]
    contentLayoutNav: typeof AppContentLayoutNav[keyof typeof AppContentLayoutNav]
    overlayNavFromBreakpoint: number

    // isRTL: boolean
    i18n: {
      enable: boolean
    }
    iconRenderer: Component
  }
  navbar: {
    type: typeof NavbarType[keyof typeof NavbarType]
    navbarBlur: boolean
  }
  footer: {
    type: typeof FooterType[keyof typeof FooterType]
  }
  verticalNav: {
    isVerticalNavCollapsed: boolean
    defaultNavItemIconProps: unknown
  }
  horizontalNav: {
    type: typeof HorizontalNavType[keyof typeof HorizontalNavType]
    transition: string | Component
    popoverOffset?: OffsetOptions
  }
  icons: {
    chevronDown: any
    chevronRight: any
    close: any
    verticalNavPinned: any
    verticalNavUnPinned: any
    sectionTitlePlaceholder: any
  }
}

export type AclProperties = {
  action: string
  subject: string
}

// 👉 Vertical nav section title
export type NavSectionTitle = {
  heading: string
} & Partial<AclProperties>

// 👉 Vertical nav link
declare type ATagTargetAttrValues = '_blank' | '_self' | '_parent' | '_top' | 'framename'
declare type ATagRelAttrValues
  = | 'alternate'
    | 'author'
    | 'bookmark'
    | 'external'
    | 'help'
    | 'license'
    | 'next'
    | 'nofollow'
    | 'noopener'
    | 'noreferrer'
    | 'prev'
    | 'search'
    | 'tag'

export type NavLinkProps = {
  to?: RouteLocationRaw | string | null
  href?: string
  target?: ATagTargetAttrValues
  rel?: ATagRelAttrValues
}

export type NavLink = {
  title: string
  icon?: unknown
  badgeContent?: string
  badgeClass?: string
  disable?: boolean
} & NavLinkProps & Partial<AclProperties>

// 👉 Vertical nav group
export type NavGroup = {
  title: string
  icon?: unknown
  badgeContent?: string
  badgeClass?: string
  children: (NavLink | NavGroup)[]
  disable?: boolean
} & Partial<AclProperties>

export declare type VerticalNavItems = (NavLink | NavGroup | NavSectionTitle)[]
export declare type HorizontalNavItems = (NavLink | NavGroup)[]

// 👉 Components ========================

export type I18nLanguage = {
  label: string
  i18nLang: string
  isRTL: boolean
}

// avatar | text | icon
// Thanks: https://stackoverflow.com/a/60617060/10796681
export type Notification = {
  id: number
  title: string
  subtitle: string
  time: string
  color?: string
  isSeen: boolean
} & (
  | { img: string, text?: never, icon?: never }
  | { img?: never, text: string, icon?: never }
  | { img?: never, text?: never, icon: string }
)

export type ThemeSwitcherTheme = {
  name: string
  icon: string
}
