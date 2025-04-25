<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id
</script>
<template>
  <div class="mt-4 rounded-lg bg-blue-50 p-4 shadow-sm">
    <h4 class="mb-2 text-lg font-medium text-blue-800">使用者貼文</h4>
    <div class="border-t border-blue-200 pt-3">
      <p class="text-gray-600">使用者 {{ userId }} 的貼文</p>
    </div>
  </div>
</template>
<style scoped></style>
