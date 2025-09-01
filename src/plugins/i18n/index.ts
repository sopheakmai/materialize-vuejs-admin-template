import fs from 'node:fs'
import { createI18n } from 'vue-i18n'

// const folders = import.meta.glob<{ default: any }>('./locales/**/index.ts', { eager: true })
// console.log('Folders found:', folders)

// const messages = Object.fromEntries(
//   Object.entries(folders).map(([key, value]) => {
//     // './locales/en/index.ts' -> 'en'
//     const localeName = key.split('/')[2]
//     return [localeName, value.default]
//   }),
// )

// console.log('Messages:', messages)

// const localeLabels: Record<string, string> = {
//   en: 'English',
//   fr: 'French',
//   ar: 'Arabic',
//   km: 'Khmer',
// }

// export const i18nOptions = Object.keys(messages).map(locale => ({
//   label: localeLabels[locale] || locale.toUpperCase(),
//   i18nLang: locale,
// }))

// export default createI18n({
//   legacy: false,
//   locale: 'en',
//   fallbackLocale: 'en',
//   messages,
// })

const messages = Object.fromEntries(
  Object.entries(

    import.meta.glob<{ default: any }>('./locales/*.ts', { eager: true }),
  )
    .map(([key, value]) => [String(key).split('/').pop()?.replace(/\.ts$/, ''), value.default]),
)
console.log(messages)

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

const modules = import.meta.glob<{ default: any }>('./locales/*/index.ts', { eager: true })

const locales: Record<string, any> = {}

for (const path in modules) {
  // Extract folder name instead of file name
  const folderName = path.split('/')[2] // ['.', 'locales', 'en', 'index.ts'] -> 'en'
  locales[folderName] = modules[path].default
}

console.log(locales)
