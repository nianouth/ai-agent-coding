---
layout: doc
title: 欢迎来到 NIANOUTH 技术博客
description: 这是我的第一篇技术博客，介绍了我搭建这个博客的过程和技术栈选择。
---

# 欢迎来到我的技术博客

欢迎来到 NIANOUTH 技术博客！这是我的第一篇文章，我想分享一下搭建这个博客的过程以及为什么选择了这些技术栈。

## 技术栈选择

### Vue 3
我选择 Vue 3 作为主要的前端框架，主要是因为：
- Composition API 提供了更好的逻辑复用和类型推导
- 性能相比 Vue 2 有显著提升
- 完善的 TypeScript 支持

### Vite
Vite 是由 Vue.js 作者尤雨溪开发的新一代前端构建工具：
- 极速的热模块替换（HMR）
- 基于 ES modules 的开发服务器
- 优化的生产构建

### TypeScript
TypeScript 为 JavaScript 添加了静态类型检查：
- 更好的开发体验和 IDE 支持
- 编译时发现错误
- 便于重构和维护

### Tailwind CSS
Tailwind CSS 是一个实用优先的 CSS 框架：
- 快速构建 UI 组件
- 高度可定制
- 小的生产包大小

### Pinia
Pinia 是 Vue 官方推荐的状态管理库：
- 更好的 TypeScript 支持
- 更简洁的 API
- 内置 devtools 支持

## 项目结构

```
src/
├── components/     # Vue 组件
├── views/         # 页面视图
├── stores/        # Pinia 状态管理
├── router/        # Vue Router 配置
├── assets/        # 静态资源
└── types/         # TypeScript 类型定义
```

## 开发体验

这个项目提供了优秀的开发体验：

1. **热更新**: Vite 提供的极速热更新
2. **类型检查**: 完整的 TypeScript 支持
3. **代码规范**: ESLint + Prettier 保障代码质量
4. **自动化**: GitHub Actions 自动部署到 GitHub Pages

## 部署

项目配置了 GitHub Pages 自动部署。每次推送到 `main` 分支时，都会自动构建并部署到 GitHub Pages。

## 下一步计划

- [ ] 添加更多的博客文章
- [ ] 实现文章搜索功能
- [ ] 添加评论系统
- [ ] 优化 SEO
- [ ] 添加 RSS 订阅

感谢你的阅读，希望这个博客能为你带来有价值的内容！