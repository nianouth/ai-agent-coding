<template>
  <div class="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">技术博客</h1>
      <p class="text-xl text-gray-600">分享前端开发经验和技术见解</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="publishedPosts.length === 0" class="text-center py-12">
      <p class="text-gray-500">暂无博客文章</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in publishedPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-6">
          <div class="flex items-center mb-3">
            <span class="text-sm text-gray-500">{{ formatDate(post.publishedAt) }}</span>
            <span class="mx-2 text-gray-300">•</span>
            <span class="text-sm text-gray-500">{{ post.author }}</span>
          </div>
          
          <h2 class="text-xl font-semibold text-gray-900 mb-3">
            <router-link
              :to="`/blog/${post.slug}`"
              class="hover:text-blue-600 transition-colors"
            >
              {{ post.title }}
            </router-link>
          </h2>
          
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBlogStore } from '@/stores/blog'

const blogStore = useBlogStore()
const loading = computed(() => blogStore.loading)
const publishedPosts = computed(() => blogStore.publishedPosts)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  blogStore.fetchPosts()
})
</script>