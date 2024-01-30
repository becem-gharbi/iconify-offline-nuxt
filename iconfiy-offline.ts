import fs from 'fs'
import path from 'path'
import collections from '@iconify/json/collections.json'
import { loadIcons, getIcon } from '@iconify/vue'
import type { IconifyJSON, IconifyIcon, IconifyIconName } from '@iconify/vue'
import type { Plugin } from 'vite'

export default function (rootDir = './'): Plugin | undefined {
  if (process.env.NODE_ENV === 'development') { return }

  const prefixes = Object.keys(collections)

  // A regex to extract icon names from code. The match should:
  // Start and ends with " or ' or `
  // In format prefix:name
  // Should follow Iconify conventions
  // https://iconify.design/docs/icons/icon-basics.html#icon-names

  const regex = new RegExp(`("|'|\`)(${prefixes.join('|')}):[a-z0-9]+(?:-[a-z0-9]+)*("|'|\`)`, 'g')

  const icons = new Set<string>()

  return {
    name: 'iconify-download-icons',

    transform (code) {
      const matches = code.match(regex)
      matches?.forEach(m => icons.add(m.replace(/'|"|`/g, '')))
      return { code, map: null }
    },

    async buildEnd () {
      const iconsDir = path.resolve(rootDir, 'public', 'iconify')

      const makeDir = (path: string, replace = false) => {
        const exists = fs.existsSync(path)
        if (exists && replace) {
          fs.rmSync(path, { recursive: true, force: true })
        }
        if (!exists || replace) {
          fs.mkdirSync(path)
        }
      }

      const save = (iconsJSON: IconifyJSON[]) => {
        iconsJSON.forEach((i) => {
          const prefix = i.prefix
          const name = Object.keys(i.icons)[0]
          const dirPath = path.resolve(iconsDir, prefix)
          const filePath = path.resolve(dirPath, `${name}.json`)
          makeDir(dirPath)
          fs.writeFileSync(filePath, JSON.stringify(i))
        })
      }

      const download = (icons: string[]) => new Promise<IconifyJSON[]>((resolve, reject) => {
        loadIcons(icons, (loaded, missing, pending) => {
          if (pending.length) { return }

          const fullname = (e: IconifyIconName) => `${e.prefix}:${e.name}`

          if (missing.length) {
            const error = new Error(`❌ 󠀠 [iconify-download-icons] download failed of ${missing.map(fullname).join(' ')}`)
            reject(error)
          }

          const output = loaded.map(i => ({
            prefix: i.prefix,
            icons: {
              [i.name]: getIcon(fullname(i)) as IconifyIcon
            }
          }))

          resolve(output)
        })
      })

      makeDir(iconsDir, true)
      await download([...icons.values()]).then(save)

      /* eslint-disable no-console */
      console.log(`✔️ 󠀠 [iconify-download-icons] saved ${icons.size} icons to ${iconsDir}`)
    }
  }
}
