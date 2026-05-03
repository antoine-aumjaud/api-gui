import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          vuetify: ['vuetify'],
          charts: ['chart.js', 'chartjs-adapter-date-fns', 'vue-chartjs'],
        },
      },
    },
  },
})
