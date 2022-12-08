import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    host: 'localhost'
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@', replacement: path.resolve(__dirname, 'src') 
      },
      {
        find: '@assets', replacement: path.resolve(__dirname, 'src/assets')
      },
      {
        find: '@views', replacement: path.resolve(__dirname, 'src/views')
      },
      {
        find: '@routes', replacement: path.resolve(__dirname, 'src/routes')
      }
    ]
  }
})
