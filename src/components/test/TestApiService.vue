<script setup>
import { ref, onMounted } from 'vue'
import { userService } from '@/api/services/userService' // Import service

// Reactive state
const users = ref([])
const isLoading = ref(false)
const error = ref(null)

// Hàm lấy dữ liệu từ tầng service
async function fetchUsers() {
  isLoading.value = true
  try {
    users.value = await userService.getUsers() // Gọi hàm từ service
  } catch (err) {
    error.value = 'Lỗi khi lấy dữ liệu từ API.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// Gọi API khi component mount
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <h1>Danh sách người dùng</h1>
    <div v-if="isLoading">Đang tải dữ liệu...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
