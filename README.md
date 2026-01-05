# NIANOUTH 技术博客

基于现代化技术栈构建的技术博客，支持 GitHub Pages 部署。

## 技术栈

- ⚡ **Vite** - 极速的开发构建工具
- 🟢 **Vue 3** - 组合式 API 的现代前端框架  
- 🔷 **TypeScript** - 类型安全的 JavaScript
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 📦 **Pinia** - Vue 官方推荐的状态管理
- 📚 **VitePress** - Vue 驱动的静态站点生成器

## 功能特色

- 🏗️ 基于组件的模块化架构
- 📱 响应式设计，支持移动端
- 🌙 暗色模式支持
- 🔍 SEO 友好
- ⚡ 极速加载和构建
- 🚀 一键部署到 GitHub Pages
- 📝 博客文章管理
- 🔄 热模块替换（HMR）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

#### Vue App 开发服务器
```bash
npm run dev
```

#### VitePress 文档开发服务器
```bash
npm run docs:dev
```

### 构建

#### 构建 Vue App
```bash
npm run build
```

#### 构建 VitePress 文档
```bash
npm run docs:build
```

#### 预览构建结果
```bash
npm run preview
npm run docs:serve
```

### 类型检查

```bash
npm run type-check
```

## 项目结构

```
src/                     # Vue 应用源码
├── components/         # Vue 组件
├── views/             # 页面视图
├── stores/            # Pinia 状态管理
├── router/            # Vue Router 配置
├── assets/            # 静态资源
└── types/             # TypeScript 类型定义

docs/                   # VitePress 文档
├── .vitepress/        # VitePress 配置
├── index.md           # 首页
├── about.md           # 关于页面
└── blog/              # 博客文章
    ├── welcome-to-my-blog.md
    ├── vue3-composition-api.md
    ├── typescript-best-practices.md
    └── vite-build-guide.md

.github/               # GitHub Actions
└── workflows/         # 自动化工作流
    ├── deploy.yml     # VitePress 部署
    └── vue-deploy.yml # Vue App 部署
```

## 部署

### GitHub Pages 自动部署

项目配置了 GitHub Actions 自动部署：

1. **VitePress 文档**: 推送到 `main` 分支时自动构建并部署文档站点
2. **Vue App**: 推送到 `main` 分支时自动构建并部署应用

### 手动部署

1. 构建项目：`npm run build` 或 `npm run docs:build`
2. 将 `dist/` 或 `dist-docs/` 目录上传到你的托管服务

### 环境变量

创建 `.env` 文件配置环境变量：

```bash
# .env
VITE_APP_TITLE=NIANOUTH
VITE_API_URL=https://api.example.com
```

## 开发指南

### 添加新文章

1. 在 `docs/blog/` 目录创建新的 Markdown 文件
2. 使用 Front Matter 定义文章元数据：

```markdown
---
layout: doc
title: 文章标题
description: 文章描述
---

# 文章标题

文章内容...
```

### 添加新组件

1. 在 `src/components/` 目录创建新的 `.vue` 文件
2. 在需要的页面中导入使用

### 状态管理

使用 Pinia 管理应用状态：

```typescript
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    loading: false
  }),
  
  actions: {
    async fetchPosts() {
      // 获取文章逻辑
    }
  }
})
```

## 常用命令

```bash
# 开发
npm run dev                    # Vue App 开发服务器
npm run docs:dev               # VitePress 开发服务器

# 构建
npm run build                  # 构建 Vue App
npm run docs:build             # 构建 VitePress 文档

# 预览
npm run preview                # 预览 Vue App 构建结果
npm run docs:serve             # 预览 VitePress 构建结果

# 工具
npm run type-check             # TypeScript 类型检查
```

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 许可证

MIT License

## 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 新一代前端构建工具  
- [VitePress](https://vitepress.vuejs.org/) - Vue 驱动的静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库