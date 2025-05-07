<!-- src/views/RegisterPage.vue -->
<template>
  <div>
    <h1>
      Đăng ký với vai trò: <span style="color: #007bff">{{ selectedRole }}</span>
    </h1>
    <p>Vui lòng điền thông tin hoặc chọn đăng ký qua Google/Facebook.</p>

    <form @submit.prevent="handleRegister">
      <div v-if="message" :class="successful ? 'alert-success' : 'alert-danger'">{{ message }}</div>
      <div>
        <label for="username">Username:</label>
        <!-- SỬA LẠI: v-model -->
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <!-- SỬA LẠI: v-model -->
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <!-- SỬA LẠI: v-model -->
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <!-- SỬA LẠI: v-model -->
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Đang xử lý...</span>
        <span v-else>Hoàn tất Đăng ký</span>
      </button>
    </form>
    <div v-if="errors.length > 0" class="error-messages">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <hr />
    <h2>Hoặc đăng ký bằng:</h2>
    <div class="oauth-login">
      <button @click="initiateGoogleLogin">Đăng ký với Google</button>
    </div>
    <div class="oauth-login">
      <button @click="initiateFacebookLogin">Đăng ký với Facebook</button>
    </div>
    <p><a href="#" @click.prevent="$parent.currentPage = 'login'">Đã có tài khoản? Đăng nhập</a></p>
    <p><a href="#" @click.prevent="$parent.currentPage = 'selectRole'">Chọn lại vai trò</a></p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
// Đảm bảo đường dẫn import AuthService là chính xác
import AuthService from '../api/services/AuthenticateJWTServices/AuthService' // Giả sử AuthService nằm trong src/services

const props = defineProps({
  selectedRole: String
})
const emit = defineEmits(['registered'])
const user = ref({ username: '', email: '', password: '' })
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const successful = ref(false)
const errors = ref([])

async function handleRegister() {
  message.value = ''
  successful.value = false
  loading.value = true
  errors.value = []

  console.log('Submitting registration form with data:', JSON.parse(JSON.stringify(user.value)))
  console.log('Confirm password value:', confirmPassword.value)
  console.log('Selected role for this form:', props.selectedRole)

  if (user.value.password !== confirmPassword.value) {
    errors.value.push('Mật khẩu xác nhận không khớp.')
    loading.value = false
    return
  }
  if (!user.value.username || !user.value.email || !user.value.password) {
    errors.value.push('Vui lòng điền đầy đủ thông tin.')
    loading.value = false
    return
  }

  try {
    // AuthService.register trả về trực tiếp JwtResponse (response.data)
    const jwtResponseData = await AuthService.register(user.value)

    console.log('Registration API response (jwtResponseData):', jwtResponseData) // Log dữ liệu thực nhận

    // KIỂM TRA TRỰC TIẾP jwtResponseData
    if (jwtResponseData && jwtResponseData.token) {
      message.value = 'Đăng ký thành công! Bạn sẽ được chuyển hướng.'
      successful.value = true
      // AuthService.register đã lưu token vào localStorage rồi
      setTimeout(() => {
        // Emit đúng jwtResponseData
        emit('registered', jwtResponseData)
      }, 1500)
    } else {
      // Trường hợp API trả về 200 OK nhưng không có token (không nên xảy ra với code backend hiện tại)
      console.error(
        'Registration successful but no token received in jwtResponseData:',
        jwtResponseData
      )
      message.value = 'Đăng ký thất bại: Không nhận được thông tin đăng nhập từ máy chủ.'
      successful.value = false
      errors.value.push('Lỗi hệ thống, không thể tự động đăng nhập.')
    }
  } catch (error) {
    // ... xử lý lỗi giữ nguyên như code trước ...
    console.error('Registration error:', error.response || error)
    const resMessage =
      /* ... */ (error.response &&
        error.response.data &&
        (error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data))) ||
      error.message ||
      error.toString()
    message.value = 'Đăng ký thất bại: ' + resMessage
    successful.value = false
    if (error.response && error.response.status === 400 && error.response.data) {
      /* ... */
    } else if (error.response && error.response.status !== 400) {
      /* ... */
    } else {
      errors.value.push(resMessage)
    }
  } finally {
    loading.value = false
  }
}

function initiateGoogleLogin() {
  // Lưu ý: AuthService.initiateOAuth2Login sẽ chuyển hướng trang
  // Nên lưu role vào đâu đó mà OAuthCallbackPage có thể truy cập sau khi redirect
  // Hiện tại backend đang lưu vào session HTTP khi gọi /oauth2/initiate/...
  AuthService.initiateOAuth2Login('google', props.selectedRole)
}

function initiateFacebookLogin() {
  AuthService.initiateOAuth2Login('facebook', props.selectedRole)
}
</script>

<style scoped>
/* Thêm CSS nếu cần */
.oauth-login button {
  margin: 5px;
}
.error-messages {
  color: red;
  margin-top: 10px;
}
.alert-success {
  color: green;
}
.alert-danger {
  color: red;
}
</style>
