const { VITE_APP_NAME } = import.meta.env

export const COOKIE_MAX_AGE_1_YEAR = 365 * 24 * 60 * 60
export const LOCALE_KEY = `${toSnakeCase(VITE_APP_NAME)}_locale`
export const THEME_KEY = `${toSnakeCase(VITE_APP_NAME)}_theme`
export const LOADER_COLOR_KEY = `${toSnakeCase(VITE_APP_NAME)}_loader_color`
export const PRIMARY_COLOR_KEY = `${toSnakeCase(VITE_APP_NAME)}_primary_color`
export const ACCESS_TOKEN_KEY = `${toSnakeCase(VITE_APP_NAME)}_access_token`
export const USER_DATA_KEY = `${toSnakeCase(VITE_APP_NAME)}_user_data`
export const USER_ABILITY_RULES_KEY = `${toSnakeCase(VITE_APP_NAME)}_user_ability_rules`
