import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  // GitHub Pages 部署时使用仓库名作为基础路径
  const isProd = process.env.NODE_ENV === 'production'
  const base = isProd ? '/ai-agent-coding/' : '/'
    
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  }
})