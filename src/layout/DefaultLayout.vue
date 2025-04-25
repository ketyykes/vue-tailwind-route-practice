<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="fixed top-0 w-full bg-gray-800 p-4 text-white shadow-md">
    <div class="container mx-auto flex items-center">
      <div class="mr-6 text-xl font-bold">Vue 路由練習</div>
      <nav class="flex space-x-4">
        <RouterLink to="/" class="transition-colors hover:text-blue-300"
          >首頁</RouterLink
        >
        <RouterLink to="/users" class="transition-colors hover:text-blue-300"
          >使用者列表</RouterLink
        >
      </nav>
    </div>
  </header>
  <main class="min-h-screen pt-16 pb-16">
    <slot />
  </main>
  <footer class="fixed bottom-0 w-full bg-gray-800 p-4 text-center text-white">
    全域頁尾
  </footer>
</template>
<style scoped></style>
