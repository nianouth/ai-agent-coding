<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navigation />
    <main class="pt-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>