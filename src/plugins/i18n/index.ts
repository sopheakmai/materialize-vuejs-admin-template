import { cookieRef } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: any }>('~/locales/*.json', { eager: true }))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.json$/)?.[1], loadLocale.default]),
)

let _i18n: any = null

export const getI18n = () => {
  if (_i18n === null) {
    _i18n = createI18n({
      legacy: false,
      locale: cookieRef('language', themeConfig.app.i18n.defaultLocale).value,
      fallbackLocale: 'en',
      messages: JSON.parse(JSON.stringify(localesMap)),
    })
  }

  return _i18n
}

const localeLabels: Record<string, string> = {
  en: 'English',
  fr: 'French',
  ar: 'Arabic',
  km: 'Khmer',
}

export const i18nOptions = Object.keys(localesMap).map(locale => ({
  label: localeLabels[locale] || locale.toUpperCase(),
  i18nLang: locale,
}))

export default function (app: App) {
  app.use(getI18n())
}
