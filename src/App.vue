<!-- src/App.vue (phiên bản dùng Vue Router) -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="main-app-layout">
    <RouterView />
  </div>
</template>

<style>
nav {
  padding: 10px;
  background-color: #f0f0f0;
}
nav a {
  margin-right: 10px;
}
hr {
  margin-bottom: 20px;
}
</style>
