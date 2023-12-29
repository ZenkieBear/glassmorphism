import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (relativePath) => {
  return path.resolve(__dirname, relativePath);
}
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    host: '0.0.0.0',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve( './src'),
    }
  }
})
