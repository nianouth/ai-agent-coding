import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('@/views/Blog.vue')
    },
    {
      path: '/blog/:slug',
      name: 'BlogPost',
      component: () => import('@/views/BlogPost.vue')
    }
  ]
})

export default router