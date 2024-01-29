import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import { loadIcon } from '@iconify/vue'
import collections from '@iconify/json/collections.json'

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
      const makeDir = (path: string, replace = false) => {
        const exists = fs.existsSync(path)
        if (exists && replace) {
          fs.rmSync(path, { recursive: true, force: true })
        }
        if (!exists || replace) {
          fs.mkdirSync(path)
        }
      }

      const save = async (icon: string) => {
        const data = await loadIcon(icon).catch(() => {
          throw new Error(`[rollup-plugin-iconify-offline] failed to load icon ${icon}`)
        })

        const [prefix, name] = icon.split(':')
        const dirPath = path.resolve(iconsDir, prefix)
        const filePath = path.resolve(dirPath, `${name}.json`)
        makeDir(dirPath)

        // https://iconify.design/docs/types/iconify-json.html#structure
        const iconJSON = {
          prefix,
          icons: {
            [name]: data
          }
        }
        fs.writeFileSync(filePath, JSON.stringify(iconJSON))
      }

      const iconsDir = path.resolve(rootDir, 'public', 'iconify')
      makeDir(iconsDir, true)
      await Promise.all([...icons.values()].map(save))

      /* eslint-disable no-console */
      console.log(`[rollup-plugin-iconify-offline] downloaded ${icons.size} icons to ${iconsDir}`)
    }
  }
}
