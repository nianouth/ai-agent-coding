<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-gray-900">
            我的技术博客
          </router-link>
        </div>
        
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              to="/"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              首页
            </router-link>
            <router-link
              to="/blog"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              博客
            </router-link>
            <router-link
              to="/about"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              关于
            </router-link>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-blue-600 p-2"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
        >
          首页
        </router-link>
        <router-link
          to="/blog"
          @click="mobileMenuOpen = false"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
        >
          博客
        </router-link>
        <router-link
          to="/about"
          @click="mobileMenuOpen = false"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
        >
          关于
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>