import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/DisP-Track/UI/eth/",
  plugins: [react()],
  build: {
    outDir: 'dist', // The output directory for the production build
    assetsDir: '', // Assets directory relative to outDir
    minify: 'terser', // Use 'terser' for minification
  },
})
