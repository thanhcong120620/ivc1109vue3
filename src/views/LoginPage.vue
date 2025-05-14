<!-- src/views/LoginPage.vue -->
<template>
  <div>
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <div v-if="message" class="alert-danger">{{ message }}</div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Đang đăng nhập...</span>
        <span v-else>Đăng nhập</span>
      </button>
    </form>
    <hr />
    <h2>Có thể tiếp tục bằng:</h2>
    <div class="oauth-login">
      <button @click="initiateGoogleLogin">Đăng nhập với Google</button>
    </div>
    <div class="oauth-login">
      <button @click="initiateFacebookLogin">Đăng nhập với Facebook</button>
    </div>
    <p>
      <RouterLink :to="{ name: 'Register' }">Chưa có tài khoản? Đăng ký</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue' // defineEmits không cần nữa nếu tự điều hướng
import { useRouter } from 'vue-router' // Import useRouter
import AuthService from '../api/services/AuthenticateJWTServices/AuthService'

// const emit = defineEmits(['loggedIn']); // Bỏ emit này
const router = useRouter() // Sử dụng router

const user = ref({ username: '', password: '' })
const loading = ref(false)
const message = ref('')

// async function handleLogin() {
//   loading.value = true
//   message.value = ''
//   try {
//     const responseData = await AuthService.login(user.value)
//     emit('loggedIn', responseData)
//   } catch (error) {
//     const resMessage =
//       (error.response && error.response.data && error.response.data.message) ||
//       (error.response &&
//         typeof error.response.data === 'string' &&
//         error.response.data.startsWith('Error:'))
//         ? error.response.data
//         : error.message || error.toString()
//     message.value = resMessage
//     loading.value = false
//   }
// }

async function handleLogin() {
  loading.value = true
  message.value = ''
  try {
    const jwtResponseData = await AuthService.login(user.value)
    // AuthService đã lưu token và user info vào localStorage

    // Điều hướng dựa trên jwtResponseData.roles
    if (jwtResponseData && jwtResponseData.token) {
      if (jwtResponseData.roles && jwtResponseData.roles.length > 0) {
        // Đã active, có roles -> đi đến dashboard phù hợp
        if (
          jwtResponseData.roles.includes('ROLE_SUPER_ADMIN') ||
          jwtResponseData.roles.some((r) => r.startsWith('ROLE_ADMIN_'))
        ) {
          router.push({ name: 'AdminDashboard' })
        } else if (jwtResponseData.roles.some((r) => r.startsWith('ROLE_MODERATOR_'))) {
          router.push({ name: 'ModeratorPanel' })
        } else {
          router.push({ name: 'UserHome' })
        }
      } else {
        // Chưa active (roles rỗng) -> đi đến trang kích hoạt
        router.push({ name: 'ActivateAccount' })
      }
    } else {
      // Lỗi không mong muốn: API trả về không có token
      message.value = 'Lỗi đăng nhập: Không nhận được thông tin phiên từ máy chủ.'
      loading.value = false
    }
  } catch (error) {
    // ... (xử lý lỗi như cũ) ...
    const resMessage = /* ... */ error.message || error.toString()
    message.value = 'Lỗi đăng nhập: ' + resMessage
    loading.value = false
  }
  // loading.value sẽ được set lại trong khối catch nếu có lỗi,
  // hoặc không cần set lại nếu điều hướng thành công
}

function initiateGoogleLogin() {
  // Khi đăng nhập bằng OAuth2, vai trò đã chọn trước đó (nếu có) sẽ được backend sử dụng
  // Nếu không có vai trò nào được chọn trước (ví dụ người dùng vào thẳng trang login),
  // backend sẽ gán role mặc định (USER) khi tạo user mới qua OAuth2.
  // AuthService.initiateOAuth2Login('google', localStorage.getItem('selectedRoleForOAuth') || 'USER') // Lấy role từ localStorage hoặc mặc định USER
  AuthService.initiateOAuth2Login('google') // Bỏ role
}

function initiateFacebookLogin() {
  // AuthService.initiateOAuth2Login(
  //   'facebook',
  //   localStorage.getItem('selectedRoleForOAuth') || 'USER'
  // )
  AuthService.initiateOAuth2Login('facebook') // Bỏ role
}

// Lưu ý: Việc lưu `selectedRoleForOAuth` vào localStorage là một cách đơn giản.
// Trong ứng dụng thực tế, bạn có thể muốn quản lý state này cẩn thận hơn.
// Controller backend /oauth2/initiate... sẽ lưu vào session.
// Nếu người dùng đi từ /select-role -> /register -> nhấp OAuth2, thì session đã có role.
// Nếu người dùng vào /login -> nhấp OAuth2, thì cần một cách truyền role (ví dụ: query param trong link, hoặc mặc định).
// Đoạn code initiateGoogleLogin/FacebookLogin ở trên giả định một cách đơn giản hóa.
</script>

<style scoped>
/* CSS nếu cần */
</style>
