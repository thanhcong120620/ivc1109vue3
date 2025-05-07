<!-- src/views/UserHomePage.vue -->
<template>
  <div>
    <h1>Chào mừng đến Trang chủ Moderator!</h1>
    <p v-if="user">
      <!-- Vẫn dùng 'user' trực tiếp ở đây -->
      Xin chào, <strong>{{ user.username }}</strong
      >!
    </p>
    <p v-if="user">
      Vai trò của bạn: <span>{{ user.roles.join(', ') }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  // <<-- KHÔNG CÓ "const props =" ở đây
  user: Object
})
</script>
