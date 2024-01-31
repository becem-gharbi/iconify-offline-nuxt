<template>
  <Icon :icon="icon" :width="24" :height="24" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline'
import { _api, loadIcon } from '@iconify/vue'
import { getQuery, parseURL } from 'ufo'
import { defu } from 'defu'

const props = defineProps<{ name: string }>()

const sName = computed(() => props.name)
const icon = ref()

// Call once on client and once on server
await callOnce(`iconify:icon-key-${process.server ? 0 : 1}`, () => {
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

const load = (name: string) => loadIcon(name).catch(() => console.error(`Failed to load icon ${name}`))

icon.value = await load(sName.value)

watch(sName, value => load(value).then(res => (icon.value = res)))
</script>
