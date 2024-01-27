import type { Plugin } from "rollup";
import { $fetch } from 'ofetch'
import { loadIcon } from '@iconify/vue'
import fs from 'fs'
import path from 'path'

export async function iconifyOfflineRollupPlugin(): Promise<Plugin> {
    const collectionsUrl = "https://icones.js.org/collections-meta.json"

    const collections = await $fetch(collectionsUrl, { retry: 3 })

    const prefixes = collections.map((el: any) => el.id)

    // A regex to extract icon names from code. The match should:
    // Start and ends with " or ' or `
    // In format prefix:name
    // Should follow Iconify conventions 
    // https://iconify.design/docs/icons/icon-basics.html#icon-names

    const regex = new RegExp(`("|'|\`)(${prefixes.join('|')}):[a-z0-9]+(?:-[a-z0-9]+)*("|'|\`)`, 'g');

    const icons = new Set<string>();

    return {
        name: "rollup-plugin-iconify-offline",
        
        transform(code) {
            const matches = code.match(regex)
            matches?.forEach(m => icons.add(m.replace(/'|"|`/g, '')))
            return { code, map: null }
        },

        async buildEnd() {

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
                const data = await loadIcon(icon)
                const [prefix, name] = icon.split(':')
                const dirPath = path.resolve(rootPath, prefix)
                const filePath = path.resolve(dirPath, name)
                makeDir(dirPath)
                fs.writeFileSync(filePath, JSON.stringify(data))
            }

            const rootPath = 'public/iconify'
            makeDir(rootPath, true)
            await Promise.all([...icons.values()].map(save))
        },
    };
}