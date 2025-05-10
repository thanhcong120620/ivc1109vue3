<!-- src/views/OAuthCallbackPage.vue -->
<template>
  <div>
    <p v-if="loading">Đang hoàn tất đăng nhập OAuth2...</p>
    <p v-if="error" style="color: red">Lỗi đăng nhập OAuth2: {{ error }}</p>
    <p v-if="!loading && !error">Đã xác thực, đang lấy thông tin...</p>
  </div>
</template>

<script setup>
// import { ref, onMounted, defineEmits } from 'vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Thêm vào
import AuthService from '../api/services/AuthenticateJWTServices/AuthService' // Import AuthService

// const emit = defineEmits(['oauthSuccess'])
const loading = ref(true)
const error = ref(null)
const router = useRouter() // Thêm vào
// const token = ref(null); // Không cần nữa

onMounted(async () => {
  console.log('[OAuthCallbackPage] Component mounted. Current URL:', window.location.href)
  // Không cần đọc token từ URL nữa
  console.log(
    'OAuthCallbackPage mounted. Backend redirected here. Now calling /api/auth/oauth2/success...'
  )

  try {
    console.log('[OAuthCallbackPage] Calling AuthService.getOAuth2UserAndToken...')
    // Gọi API backend để lấy JWT dựa trên session hiện tại
    // const userData = await AuthService.getOAuth2UserAndToken() // Cũ
    const userData = await AuthService.getOAuth2UserAndToken()
    console.log(
      '[OAuthCallbackPage] AuthService.getOAuth2UserAndToken response (userData):',
      JSON.parse(JSON.stringify(userData))
    )

    if (userData && userData.token) {
      console.log('Successfully retrieved JWT from backend:', userData)
      console.log(
        '[OAuthCallbackPage] Emitting "oauthSuccess" event with userData:',
        JSON.parse(JSON.stringify(userData))
      )

      // CŨ: AuthService.getOAuth2UserAndToken đã lưu vào localStorage rồi
      // emit('oauthSuccess', userData) // Thông báo cho App.vue để cập nhật và chuyển trang

      // AuthService đã lưu token
      // Thay vì emit, store sẽ được cập nhật và router điều hướng
      // Ví dụ nếu dùng Pinia:
      // const authStore = useAuthStore();
      // authStore.loginSuccess(userData); // Cập nhật user trong store

      // Xử lý điều hướng dựa trên trạng thái user mới lấy được
      if (userData.roles && userData.roles.length > 0) {
        // Đã active, có roles -> đi đến dashboard phù hợp
        if (
          userData.roles.includes('ROLE_SUPER_ADMIN') ||
          userData.roles.some((r) => r.startsWith('ROLE_ADMIN_'))
        ) {
          router.push({ name: 'AdminDashboard' })
        } else if (userData.roles.some((r) => r.startsWith('ROLE_MODERATOR_'))) {
          router.push({ name: 'ModeratorPanel' })
        } else {
          router.push({ name: 'UserHome' })
        }
      } else {
        // Chưa active (roles rỗng) -> đi đến trang kích hoạt
        router.push({ name: 'ActivateAccount' })
      }
    } else {
      const errorMsg = 'Backend API /api/auth/oauth2/success did not return a token or valid data.'
      console.error(
        '[OAuthCallbackPage]',
        errorMsg,
        'Received:',
        JSON.parse(JSON.stringify(userData))
      )
      error.value = 'Không thể lấy thông tin phiên đăng nhập từ máy chủ.'
    }
  } catch (err) {
    console.error(
      '[OAuthCallbackPage] Error calling /api/auth/oauth2/success:',
      err.response || err
    )
    error.value =
      'Lỗi giao tiếp với máy chủ: ' +
      ((err.response &&
        err.response.data &&
        (err.response.data.message || err.response.data.error)) ||
        err.message ||
        'Lỗi không xác định.')
  } finally {
    loading.value = false
    console.log(
      '[OAuthCallbackPage] Processing finished. Loading:',
      loading.value,
      'Error:',
      error.value
    )
  }
})
</script>
