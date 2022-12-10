import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const resolve = (relativePath) => {
  return path.resolve(__dirname, relativePath);
}
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
        find: '@', replacement: resolve('src') 
      },
      {
        find: '@assets', replacement: resolve('src/assets')
      },
      {
        find: '@views', replacement: resolve('src/views')
      },
      {
        find: '@routes', replacement: resolve('src/routes')
      },
      {
        find: '@components', replacement: resolve('src/components')
      }
    ]
  }
})
