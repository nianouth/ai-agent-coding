<template>
  <div class="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <article v-else-if="post" class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-8">
        <div class="mb-6">
          <router-link
            to="/blog"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回博客
          </router-link>
        </div>

        <header class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
          <div class="flex items-center text-gray-500 text-sm">
            <span>{{ formatDate(post.publishedAt) }}</span>
            <span class="mx-2">•</span>
            <span>{{ post.author }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
        </div>
      </div>
    </article>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">文章未找到</p>
      <router-link
        to="/blog"
        class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 transition-colors"
      >
        返回博客列表
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const post = computed(() => blogStore.currentPost)
const loading = computed(() => blogStore.loading)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  const slug = route.params.slug as string
  blogStore.fetchPost(slug)
})
</script>