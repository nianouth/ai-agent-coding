<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-lg font-semibold mb-4">NIANOUTH</h3>
          <p class="text-gray-300">
            分享前端开发、Vue.js、TypeScript 和现代 Web 开发技术的博客。
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-300 hover:text-white">首页</router-link></li>
            <li><router-link to="/blog" class="text-gray-300 hover:text-white">博客</router-link></li>
            <li><router-link to="/about" class="text-gray-300 hover:text-white">关于</router-link></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">技术栈</h3>
          <ul class="space-y-2 text-gray-300">
            <li>Vue 3</li>
            <li>Vite</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Pinia</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-700">
        <p class="text-center text-gray-300">
          © 2024 NIANOUTH. 由 Vite + Vue3 + VitePress 构建.
        </p>
      </div>
    </div>
  </footer>
</template>