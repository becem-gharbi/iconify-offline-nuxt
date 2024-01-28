import { _api } from '@iconify/vue'
import { getQuery, parseURL } from 'ufo'

export default defineNuxtPlugin(() => {
    const isPrerendered = typeof useNuxtApp().payload.prerenderedAt === "number";

    _api.setFetch(async (req) => {
        const url = req.toString()

        if (process.dev || (process.server && isPrerendered)) {
            return fetch(url)
        }

        const prefix = parseURL(url).pathname.split('/').pop()!.replace('.json', '')
        const name = getQuery(url).icons as string

        const body = await $fetch(`/iconify/${prefix}/${name}.json`)

        return new Response(JSON.stringify(body), {
            status: 200,
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
    })
})