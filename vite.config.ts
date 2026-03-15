import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: parseInt(process.env.VITE_PORT || '20252'),
    strictPort: true, // 如果端口被占用，直接失败而不是尝试其他端口
  },
  build: {
    outDir: 'dist',
  },
  base: './', // 确保 Electron 能正确加载资源
})
