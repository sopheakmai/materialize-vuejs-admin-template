import { layoutConfig } from '@themeConfig'

export const namespaceConfig = (str: string) => `${toSnakeCase(layoutConfig.app.title)}_${str}`
export const COOKIE_MAX_AGE_1_YEAR = 365 * 24 * 60 * 60

export const LOCALE_KEY = namespaceConfig('locale')
export const THEME_KEY = namespaceConfig('theme')
export const LOADER_COLOR_KEY = namespaceConfig('loader_color')
export const PRIMARY_COLOR_KEY = namespaceConfig('primary_color')
export const ACCESS_TOKEN_KEY = namespaceConfig('access_token')
export const USER_DATA_KEY = namespaceConfig('user_data')
export const USER_ABILITY_RULES_KEY = namespaceConfig('user_ability_rules')
