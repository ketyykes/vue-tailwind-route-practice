<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="mb-4 border-l-4 border-indigo-500 pl-4">
    <h3 class="mb-2 text-xl font-semibold text-gray-700">
      使用者 {{ $route.params.id }}
    </h3>
    <RouterLink
      :to="{ name: 'UserPosts', params: { id: $route.params.id } }"
      class="inline-block rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 transition duration-300 hover:bg-indigo-200"
    >
      查看貼文
    </RouterLink>
  </div>

  <!-- 第三層 router-view，渲染 /users/:id/posts -->
  <RouterView />
</template>
<style scoped></style>
