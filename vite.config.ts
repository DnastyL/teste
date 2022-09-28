import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/vi/': 'https://i.ytimg.com/'
    }
  },
  plugins: [react()]
})
