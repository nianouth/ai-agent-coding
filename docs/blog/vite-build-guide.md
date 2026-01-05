---
layout: doc
title: Vite 构建工具使用指南
description: 深入了解 Vite 构建工具的使用方法和优化技巧。
---

# Vite 构建工具使用指南

Vite 是由 Vue.js 作者尤雨溪开发的新一代前端构建工具，它采用原生 ES 模块的方式提供极速的开发体验。本文将详细介绍 Vite 的使用方法和优化技巧。

## Vite 的优势

### 1. 极速的开发服务器
- 基于 ES modules 的开发服务器
- 真正的按需编译
- HMR（热模块替换）性能极佳

### 2. 优化的构建
- 基于 Rollup 的生产构建
- 自动代码分割
- Tree shaking 优化

### 3. 零配置
开箱即用的开发体验，支持：
- TypeScript
- JSX
- CSS 预处理器
- Web 组件

## 基本配置

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },

  // 开发服务器配置
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash', 'axios']
        }
      }
    }
  },

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // 环境变量
  define: {
    __VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
```

## 环境变量

### .env 文件
```bash
# .env - 所有环境
VITE_APP_TITLE=我的应用
VITE_API_URL=https://api.example.com

# .env.development - 开发环境
VITE_API_URL=http://localhost:3001
VITE_DEBUG=true

# .env.production - 生产环境
VITE_API_URL=https://api.production.com
VITE_DEBUG=false
```

### 使用环境变量
```typescript
// 在代码中使用
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_DEBUG)

// 类型定义
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 插件系统

### 常用插件
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 插件函数
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      // 转换代码
      return code
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    myPlugin(),
    // 其他插件
  ]
})
```

### 社区插件
```bash
npm install -D @vitejs/plugin-vue-jsx
npm install -D vite-plugin-pwa
npm install -D vite-plugin-mkcert
npm install -D unplugin-auto-import
npm install -D unplugin-vue-components
```

### 自动导入插件配置
```typescript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    })
  ]
})
```

## 性能优化

### 1. 代码分割
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['element-plus'],
          'utils': ['lodash', 'axios', 'dayjs']
        }
      }
    }
  }
})
```

### 2. 依赖预构建
```typescript
// 优化依赖预构建
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['@vueuse/core']
  }
})
```

### 3. 构建优化
```typescript
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'esbuild', // 更快的压缩
    cssCodeSplit: true, // CSS 代码分割
    sourcemap: false, // 生产环境关闭 sourcemap
    reportCompressedSize: false, // 关闭压缩大小报告
    chunkSizeWarningLimit: 1600
  }
})
```

## 高级用法

### 1. 自定义中间件
```typescript
import { defineConfig } from 'vite'
import express from 'express'

export default defineConfig({
  plugins: [
    {
      name: 'custom-middleware',
      configureServer(server) {
        server.middlewares.use(express.json())
        server.middlewares.use('/api/custom', (req, res) => {
          res.json({ message: 'Custom API response' })
        })
      }
    }
  ]
})
```

### 2. 虚拟模块
```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'virtual-module',
      resolveId(id) {
        if (id === 'virtual:config') {
          return '\0virtual:config'
        }
      },
      load(id) {
        if (id === '\0virtual:config') {
          return `export default { message: 'Hello from virtual module!' }`
        }
      }
    }
  ]
})

// 在代码中使用
// import config from 'virtual:config'
// console.log(config.message)
```

### 3. Worker 支持
```typescript
// 方式一：使用 Worker 构造函数
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module'
})

// 方式二：在 Vite 中使用 worker 插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

## 测试配置

### Vitest 配置
```typescript
// vite.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

### Jest 替代方案
```bash
npm install -D vitest @vue/test-utils happy-dom
```

## 部署优化

### 静态资源处理
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    }
  }
})
```

### PWA 配置
```bash
npm install -D vite-plugin-pwa
```

```typescript
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: '我的应用',
        short_name: 'MyApp',
        description: 'PWA 应用',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 调试技巧

### 1. 浏览器调试
```typescript
// 在代码中添加调试信息
if (import.meta.env.DEV) {
  console.log('Development mode')
}
```

### 2. 性能分析
```bash
# 构建时生成分析报告
npm run build -- --mode analyze
```

### 3. 依赖分析
```bash
npm install -D rollup-plugin-analyzer
```

```typescript
import analyze from 'rollup-plugin-analyzer'

export default defineConfig({
  plugins: [
    analyze({
      summaryOnly: true,
      filter: (moduleId) => !moduleId.includes('node_modules')
    })
  ]
})
```

## 常见问题解决

### 1. 路径别名不工作
```typescript
// 确保 tsconfig.json 包含
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. 动态导入问题
```typescript
// 使用 ?raw 后缀导入文本文件
import rawText from './file.txt?raw'

// 使用 ?url 后缀导入 URL
import workerUrl from './worker.js?url'
```

### 3. 环境变量问题
- 确保变量名以 `VITE_` 开头
- 在生产环境中访问 `import.meta.env`
- 不要在客户端代码中使用 `process.env`

## 总结

Vite 是一个功能强大且易于使用的构建工具，它通过创新的开发服务器和优化的构建流程，为现代前端开发提供了极佳的体验。

主要优势：
- 🚀 极速的开发体验
- ⚙️ 零配置起步
- 🔧 高度可定制
- 📦 优化的生产构建
- 🌍 多框架支持

通过合理配置 Vite，我们可以构建出高性能、易维护的现代前端应用。