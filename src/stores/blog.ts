import { defineStore } from 'pinia'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  tags: string[]
  author: string
}

interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  loading: boolean
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    posts: [],
    currentPost: null,
    loading: false
  }),

  getters: {
    publishedPosts: (state) => state.posts.filter(post => post.publishedAt),
    postsByTag: (state) => (tag: string) => state.posts.filter(post => post.tags.includes(tag))
  },

  actions: {
    async fetchPosts() {
      this.loading = true
      // 模拟从 API 获取数据
      setTimeout(() => {
        this.posts = [
          {
            id: 1,
            title: '欢迎来到 NIANOUTH 技术博客',
            slug: 'welcome-to-my-blog',
            excerpt: '这是我的第一篇技术博客，介绍了我搭建这个博客的过程和技术栈选择。',
            content: '详细内容...',
            publishedAt: new Date().toISOString(),
            tags: ['Vue', 'Vite', 'TypeScript'],
            author: '作者'
          }
        ]
        this.loading = false
      }, 1000)
    },

    async fetchPost(slug: string) {
      this.loading = true
      const post = this.posts.find(p => p.slug === slug)
      this.currentPost = post || null
      this.loading = false
    }
  }
})