const modules = import.meta.glob('./*.ts', { eager: true })

const locales: Record<string, any> = {}

for (const path in modules) {
  if (path === './index.ts')
    continue
  const moduleExport = (modules[path] as any).default
  Object.assign(locales, moduleExport)
}

export default locales