---
layout: doc
title: 关于
description: 了解这个博客项目和我。
---

# 关于

欢迎来到 NIANOUTH 技术博客！这里分享前端开发、Vue.js、TypeScript 和现代 Web 开发技术的经验。

## 关于我

我是一名热衷于前端开发的技术爱好者，专注于现代 Web 技术和用户体验优化。

### 技能栈

- **前端框架**: Vue.js 3, React.js
- **语言**: TypeScript, JavaScript (ES6+)
- **构建工具**: Vite, Webpack
- **状态管理**: Pinia, Vuex, Redux
- **样式**: Tailwind CSS, SCSS, CSS-in-JS
- **测试**: Jest, Vitest, Cypress
- **其他**: Node.js, GraphQL, REST APIs

## 关于这个项目

这个博客项目使用现代化的技术栈构建：

### 技术栈
- **Vue 3** + **Composition API** - 现代化的前端框架
- **Vite** - 极速的开发构建工具
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Pinia** - Vue 官方推荐的状态管理
- **VitePress** - Vue 驱动的静态站点生成器

### 项目特色
- 🏗️ 基于组件的模块化架构
- 📱 响应式设计，支持移动端
- 🌙 暗色模式支持
- 🔍 SEO 友好
- ⚡ 极速加载和构建
- 🚀 一键部署到 GitHub Pages

## 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Navigation.vue   # 导航组件
│   └── Footer.vue       # 页脚组件
├── views/              # 页面视图
│   ├── Home.vue        # 首页
│   ├── Blog.vue        # 博客列表
│   ├── BlogPost.vue    # 博客详情
│   └── About.vue       # 关于页面
├── stores/             # Pinia 状态管理
│   └── blog.ts         # 博客数据管理
├── router/             # Vue Router 配置
│   └── index.ts        # 路由配置
├── assets/             # 静态资源
│   └── main.css        # 全局样式
└── types/              # TypeScript 类型定义

docs/                   # VitePress 文档
├── .vitepress/         # VitePress 配置
│   ├── config.ts       # 主题配置
│   ├── theme.ts        # 主题扩展
│   └── style.css       # 自定义样式
├── index.md            # 首页
└── blog/               # 博客文章
    ├── welcome-to-my-blog.md
    ├── vue3-composition-api.md
    ├── typescript-best-practices.md
    └── vite-build-guide.md
```

## 部署

项目配置了自动部署到 GitHub Pages：

1. 推送代码到 GitHub 仓库
2. GitHub Actions 自动构建项目
3. 部署到 GitHub Pages

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 开发文档
npm run docs:dev

# 构建文档
npm run docs:build
```

## 联系我

如果你对我的文章有任何问题或建议，欢迎通过以下方式联系我：

- 📧 邮箱: [your-email@example.com](mailto:your-email@example.com)
- 💻 GitHub: [@yourusername](https://github.com/yourusername)
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)

## 致谢

感谢以下开源项目：
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 新一代前端构建工具
- [VitePress](https://vitepress.vuejs.org/) - Vue 驱动的静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库

---

希望这个博客能为你带来有价值的内容！