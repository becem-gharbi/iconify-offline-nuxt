import { _api } from '@iconify/vue'
import { getQuery, parseURL } from 'ufo'
import { defu } from 'defu'

export default defineNuxtPlugin(() => {
  if (process.dev) { return }

  const imports = process.server
    ? import.meta.glob('~/public/iconify/*/*.json', { import: 'default' })
    : {}

  _api.setFetch(async (req) => {
    const url = req.toString()
    const prefix = parseURL(url).pathname.split('/').pop()!.replace('.json', '')
    const icons = getQuery<{ icons: string }>(url).icons.split(',')

    const iconsData = process.server
      ? await Promise.all<any>(icons.map(i => imports[`/public/iconify/${prefix}/${i}.json`]()))
      : await Promise.all(icons.map(i => $fetch(`/iconify/${prefix}/${i}.json`)))

    const iconsDataMerged = defu({}, ...iconsData)

    return new Response(JSON.stringify(iconsDataMerged), {
      status: 200,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  })
})
