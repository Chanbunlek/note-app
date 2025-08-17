import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: "/note-app/",
  plugins: [vue()],
  server: {
    port: 8081
  }
})
