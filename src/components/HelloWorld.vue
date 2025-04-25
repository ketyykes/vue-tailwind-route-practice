<script setup>
const count = ref(0)
</script>

<template>
  <div>Hello World</div>
  <button @click="count++">Click me</button>
  <p>Count: {{ count }}</p>
</template>

<style scoped></style>
