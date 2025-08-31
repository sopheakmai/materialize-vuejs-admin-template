import { createLayouts } from '@layouts'
import { layoutConfig } from '@themeConfig'
import '@layouts/styles/index.scss'

// ℹ️ We generate layout config from our themeConfig so you don't have to write config twice
export default createLayouts(layoutConfig)
