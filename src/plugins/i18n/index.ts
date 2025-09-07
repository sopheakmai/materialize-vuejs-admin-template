import { cookieRef } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

// Scan folders in locales directory and use folder names as locale keys
const folders = import.meta.glob<{ default: any }>('~/locales/*/index.ts', { eager: true })
const messages = Object.fromEntries(
  Object.entries(folders).map(([key, value]) => {
    // './locales/en/index.ts' -> 'en'
    const localeName = key.split('/')[2]
    return [localeName, value.default]
  }),
)

let _i18n: any = null

export const getI18n = () => {
  if (_i18n === null) {
    _i18n = createI18n({
      legacy: false,
      locale: cookieRef('language', themeConfig.app.i18n.defaultLocale).value,
      fallbackLocale: 'en',
      messages,
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

export const i18nOptions = Object.keys(messages).map(locale => ({
  label: localeLabels[locale] || locale.toUpperCase(),
  i18nLang: locale,
}))

export default function (app: App) {
  app.use(getI18n())
}
