import { createI18n } from 'vue-i18n'

// Scan folders in locales directory and use folder names as locale keys
const folders = import.meta.glob<{ default: any }>('./locales/*/index.ts', { eager: true })
console.log('Folders found:', folders)

const messages = Object.fromEntries(
  Object.entries(folders).map(([key, value]) => {
    // './locales/en/index.ts' -> 'en'
    const localeName = key.split('/')[2]
    return [localeName, value.default]
  }),
)

console.log('Messages:', messages)

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

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
