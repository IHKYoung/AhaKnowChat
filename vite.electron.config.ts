// vite.electron.config.ts

import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'node14',
    outDir: 'dist-electron',
    lib: {
      entry: path.resolve(__dirname, 'electron/main.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron']
    }
  }
})
