import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NIANOUTH',
  description: '探索现代 Web 开发技术，分享 Vue.js、TypeScript、Vite 和前端工程化的实践经验。',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  outDir: '../dist-docs',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'description', content: '技术博客 - Vue.js、TypeScript、Vite 等现代前端技术分享' }],
    ['meta', { name: 'keywords', content: 'Vue.js, TypeScript, Vite, 前端开发, 技术博客' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: '博客 Logo' },
    
    siteTitle: 'NIANOUTH',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '技术文档', link: '/tech-doc-outline' },
      { text: '关于', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com', target: '_blank' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '博客文章',
          items: [
            { text: '欢迎来到 NIANOUTH 技术博客', link: '/blog/welcome-to-my-blog' },
            { text: 'Vue 3 组合式 API 详解', link: '/blog/vue3-composition-api' },
            { text: 'TypeScript 最佳实践', link: '/blog/typescript-best-practices' },
            { text: 'Vite 构建工具使用指南', link: '/blog/vite-build-guide' },
          ]
        }
      ],
      '/': [
        {
          text: '技术文档',
          items: [
            { text: '企业级前端项目技术文档编写大纲', link: '/tech-doc-outline' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
      { icon: 'twitter', link: 'https://twitter.com' }
    ],

    editLink: {
      pattern: 'https://github.com/yourusername/vite-vue3-blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep'
    },

    returnToTopLabel: '回到顶部',
    externalLinkIcon: true,

    search: {
      provider: 'local'
    },

    darkModeSwitchLabel: '暗色模式',
    lightModeSwitchLabel: '亮色模式'
  },

  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})