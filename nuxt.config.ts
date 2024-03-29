import iconifyVitePlugin from './iconify-vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['@iconify/vue'] // DeprecationWarning: Use of deprecated double slash
  },
  vite: {
    plugins: [iconifyVitePlugin()]
  },
  routeRules: {
    '/static': { prerender: true }
  },
  experimental: {
    componentIslands: true
  }
})
