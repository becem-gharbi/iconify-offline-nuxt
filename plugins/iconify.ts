import { _api } from '@iconify/vue'
import { getQuery, parseURL } from 'ufo'

export default defineNuxtPlugin(() => {

    if (process.dev) return

    _api.setFetch(async (req) => {
        const url = req.toString()
        const prefix = parseURL(url).pathname.split('/').pop()!.replace('.json', '')
        const name = getQuery(url).icons as string
        
        let body = {}

        if (process.server) {
            body = await import(`~/public/iconify/${prefix}/${name}.json`)
        }
        else {
            body = await $fetch(`/iconify/${prefix}/${name}.json`)
        }

        return new Response(JSON.stringify(body), {
            status: 200,
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
    })
})