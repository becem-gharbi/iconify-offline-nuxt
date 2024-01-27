import type { Plugin } from "rollup";
import { $fetch } from 'ofetch'

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
        buildStart() {
        },
        transform(code) {
            const matches = code.match(regex)
            matches?.forEach(m => icons.add(m.replace(/'|"|`/g, '')))
            return { code, map: null }
        },
        buildEnd() {
            console.table(icons)
        },
    };
}