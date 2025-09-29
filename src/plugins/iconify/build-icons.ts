import { promises as fs } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import type { IconifyJSON } from '@iconify/types'
import { getIcons, getIconsCSS, stringToIcon } from '@iconify/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const nodeModules = resolve(__dirname, '../../../node_modules')
const riIconsPath = join(nodeModules, '@iconify-json/ri/icons.json')

type BundleScriptCustomSVGConfig = {
  dir: string
  monotone: boolean
  prefix: string
}

type BundleScriptCustomJSONConfig = {
  filename: string
  icons?: string[]
}

type BundleScriptConfig = {
  svg?: BundleScriptCustomSVGConfig[]
  icons?: string[]
  json?: (string | BundleScriptCustomJSONConfig)[]
}

const sources: BundleScriptConfig = {
  // monitone: true - replaces all colors with currentColor
  // monotone: false - keeps original colors
  svg: [
    {
      dir: 'src/assets/svg/local',
      monotone: true,
      prefix: 'local',
    },
    {
      dir: 'src/assets/svg/uiw',
      monotone: true,
      prefix: 'uiw',
    },
    {
      dir: 'src/assets/svg/solar',
      monotone: true,
      prefix: 'solar',
    },
    {
      dir: 'src/assets/svg/bxl',
      monotone: true,
      prefix: 'bxl',
    },
    {
      dir: 'src/assets/svg/mdi',
      monotone: true,
      prefix: 'mdi',
    },
  ],
  icons: [],
  json: [
    riIconsPath,
  ],
}

const target = join(dirname(__filename), 'icons.css')
;(async function () {
  const dir = dirname(target)
  try {
    await fs.mkdir(dir, {
      recursive: true,
    })
  }
  catch (err) {
    //
  }

  const allIcons: IconifyJSON[] = []
  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = [])

    // Sort icons by prefix
    const organizedList = organizeIconsList(sources.icons)

    for (const prefix in organizedList) {
      const filename = join(nodeModules, `@iconify/json/json/${prefix}.json`)

      sourcesJSON.push({
        filename,
        icons: organizedList[prefix],
      })
    }
  }

  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i]
      const filename = typeof item === 'string' ? item : item.filename
      const content = JSON.parse(await fs.readFile(filename, 'utf8')) as IconifyJSON
      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons)
        if (!filteredContent)
          throw new Error(`Cannot find required icons in ${filename}`)
        allIcons.push(filteredContent)
      }
      else {
        allIcons.push(content)
      }
    }
  }

  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i]
      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix,
      })

      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon')
          return

        const svg = iconSet.toSVG(name)

        if (!svg) {
          iconSet.remove(name)
          return
        }

        try {
          await cleanupSVG(svg)

          if (source.monotone) {
            await parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (attr, colorStr, color) => {
                return !color || isEmptyColor(color) ? colorStr : 'currentColor'
              },
            })
          }

          await runSVGO(svg)
        }
        catch (err) {
          console.error(`Error parsing ${name} from ${source.dir}:`, err)
          iconSet.remove(name)

          return
        }

        iconSet.fromSVG(name, svg)
      })

      allIcons.push(iconSet.export())
    }
  }

  const cssContent = allIcons
    .map(iconSet => getIconsCSS(
      iconSet,
      Object.keys(iconSet.icons),
      { iconSelector: '.{prefix}-{name}' },
    ))
    .join('\n')

  await fs.writeFile(target, cssContent, 'utf8')

  console.log(`Saved CSS to ${target}!`)
})().catch((err) => {
  console.error(err)
})

/**
 * Sort icon names by prefix
 */
function organizeIconsList(icons: string[]): Record<string, string[]> {
  const sorted: Record<string, string[]> = Object.create(null)

  icons.forEach((icon) => {
    const item = stringToIcon(icon)

    if (!item)
      return

    const prefix = item.prefix
    const prefixList = sorted[prefix] ? sorted[prefix] : (sorted[prefix] = [])

    const name = item.name

    if (!prefixList.includes(name))
      prefixList.push(name)
  })

  return sorted
}
