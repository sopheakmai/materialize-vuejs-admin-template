import { readdir, stat } from 'node:fs'
import type { Plugin, ResolvedConfig } from 'vite'
import pkg from 'picocolors'

const { green, blue, bold } = pkg

const fileListTotal: number[] = []

function recursiveDirectory(folder: string, callback: () => void): void {
  readdir(folder, (err, files: string[]) => {
    if (err)
      throw err
    let count = 0
    const checkEnd = () => {
      ++count === files.length && callback()
    }
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err)
          throw err
        if (stats.isFile()) {
          fileListTotal.push(stats.size)
          checkEnd()
        }
        else if (stats.isDirectory()) {
          recursiveDirectory(`${folder}/${item}/`, checkEnd)
        }
      })
    })
    files.length === 0 && callback()
  })
}

function sum(arr: number[]) {
  return arr.reduce((t: number, c: number) => {
    return t + c
  }, 0)
}

function formatBytes(a: number, b?: number): string {
  if (a === 0)
    return '0 Bytes'
  const c = 1024
  const d = b || 2
  const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))
  return `${Number.parseFloat((a / c ** f).toFixed(d))} ${e[f]}`
}

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`
}

export function viteBuildInfo({ name, version }: {
  name: string
  version: string
  currentBuildTime: string
}): Plugin {
  let config: ResolvedConfig
  let startTime: Date
  let endTime: Date

  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      console.log(
        bold(
          green(
            `🚀 ${blue(`${name} v${version}`)}`,
          ),
        ),
      )
      if (config.command === 'build')
        startTime = new Date()
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = new Date()
        recursiveDirectory(config.build.outDir, () => {
          const duration = endTime.getTime() - startTime.getTime()
          console.log(
            bold(
              green(
                `✅ Build completed successfully! (${formatDuration(duration)} • ${formatBytes(
                  sum(fileListTotal),
                )})`,
              ),
            ),
          )
        })
      }
    },
  }
}
