<script lang="ts" setup>
import NavBarI18n from '@core/components/I18n.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { i18nOptions } from '@/plugins/i18n'

const { isAppRtl } = useThemeConfig()
const handleLangChange = (lang: string) => {
  isAppRtl.value = lang === 'ar'
}
</script>

<template>
  <NavBarI18n
    :languages="i18nOptions"
    @change="handleLangChange"
  />
</template>
