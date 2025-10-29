import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Birthday-Website/',
  build: {
    outDir: 'docs',
  },
  server: {
    // Enable SPA fallback for local development
    // This ensures all routes return index.html
    historyApiFallback: true,
  },
})