<!-- src/views/OAuthCallbackPage.vue -->
<template>
  <div>
    <p v-if="loading">Đang hoàn tất đăng nhập OAuth2...</p>
    <p v-if="error" style="color: red">Lỗi đăng nhập OAuth2: {{ error }}</p>
    <p v-if="!loading && !error">Đã xác thực, đang lấy thông tin...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import AuthService from '../api/services/AuthenticateJWTServices/AuthService' // Import AuthService

const emit = defineEmits(['oauthSuccess'])
const loading = ref(true)
const error = ref(null)
// const token = ref(null); // Không cần nữa

onMounted(async () => {
  // Không cần đọc token từ URL nữa
  console.log(
    'OAuthCallbackPage mounted. Backend redirected here. Now calling /api/auth/oauth2/success...'
  )

  try {
    // Gọi API backend để lấy JWT dựa trên session hiện tại
    const userData = await AuthService.getOAuth2UserAndToken() // Gọi hàm này

    if (userData && userData.token) {
      console.log('Successfully retrieved JWT from backend:', userData)
      // AuthService.getOAuth2UserAndToken đã lưu vào localStorage rồi
      emit('oauthSuccess', userData) // Thông báo cho App.vue để cập nhật và chuyển trang
    } else {
      console.error('Backend API /api/auth/oauth2/success did not return a token.')
      error.value = 'Không thể lấy thông tin phiên đăng nhập từ máy chủ.'
    }
  } catch (err) {
    console.error('Error calling /api/auth/oauth2/success:', err)
    error.value =
      'Lỗi giao tiếp với máy chủ: ' +
      ((err.response &&
        err.response.data &&
        (err.response.data.message || err.response.data.error)) ||
        err.message ||
        'Lỗi không xác định.')
  } finally {
    loading.value = false
  }
})
</script>
