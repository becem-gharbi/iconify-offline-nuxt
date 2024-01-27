import { iconifyOfflineRollupPlugin } from './iconfiy-offline'

export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ["@iconify/vue"], // DeprecationWarning: Use of deprecated double slash
  },
  vite: {
    build: {
      rollupOptions: {
        plugins: [iconifyOfflineRollupPlugin()],
      },
    },
  },
});
