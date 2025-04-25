<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
    <h2 class="mb-4 border-b pb-2 text-2xl font-bold text-gray-800">
      使用者清單
    </h2>
    <div class="mb-6 flex space-x-4">
      <!-- 使用 <router-link> 設定巢狀參數 -->
      <RouterLink
        :to="{ name: 'UserDetail', params: { id: 1 } }"
        class="rounded-md bg-blue-600 px-4 py-2 text-black transition duration-300 hover:bg-indigo-700"
      >
        查看 #1
      </RouterLink>
      <RouterLink
        :to="{ name: 'UserDetail', params: { id: 2 } }"
        class="rounded-md bg-blue-600 px-4 py-2 text-black transition duration-300 hover:bg-indigo-700"
      >
        查看 #2
      </RouterLink>
    </div>
    <!-- 第二層 router-view，渲染 /users/:id 畫面 -->
    <div class="rounded-lg bg-gray-50 p-4">
      <RouterView />
    </div>
  </div>
</template>
<style scoped></style>
