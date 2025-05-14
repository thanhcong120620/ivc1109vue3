<!-- src/views/RegisterPage.vue -->
<template>
  <div>
    <h1>Đăng ký tài khoản</h1>
    <p>Vui lòng điền thông tin hoặc chọn đăng ký qua Google/Facebook.</p>
    <p style="font-style: italic">(Sau khi đăng ký, bạn sẽ cần kích hoạt tài khoản bằng Key)</p>

    <form @submit.prevent="handleRegister">
      <div v-if="message" :class="successful ? 'alert-success' : 'alert-danger'">{{ message }}</div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
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
    <p>
      <RouterLink :to="{ name: 'Login' }">Đã có tài khoản? Đăng nhập</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router' // Import useRouter và RouterLink
import AuthService from '../api/services/AuthenticateJWTServices/AuthService'

const router = useRouter() // Sử dụng router

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
    const jwtResponseData = await AuthService.register(user.value)
    // AuthService.register đã lưu token và user info vào localStorage

    console.log(
      '[RegisterPage] Registration API response (jwtResponseData):',
      JSON.parse(JSON.stringify(jwtResponseData))
    )

    if (jwtResponseData && jwtResponseData.token) {
      message.value = 'Đăng ký thành công! Bạn sẽ được chuyển đến trang để kích hoạt tài khoản.'
      successful.value = true
      setTimeout(() => {
        // Điều hướng đến trang kích hoạt
        router.push({ name: 'ActivateAccount' })
      }, 1500) // Delay để user đọc message
    } else {
      console.error(
        '[RegisterPage] Registration successful but no token received:',
        jwtResponseData
      )
      message.value = 'Đăng ký thất bại: Không nhận được thông tin đăng nhập từ máy chủ.'
      successful.value = false
      errors.value.push('Lỗi hệ thống, không thể tự động đăng nhập.')
      loading.value = false // Đảm bảo set loading false ở đây
    }
  } catch (error) {
    console.error('[RegisterPage] Registration error:', error.response || error)
    const resMessage =
      (error.response &&
        error.response.data &&
        (error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data))) ||
      error.message ||
      error.toString()
    message.value = 'Đăng ký thất bại: ' + resMessage
    successful.value = false
    // errors.value.push(resMessage); // Có thể thêm vào errors nếu message không đủ
    loading.value = false
  }
  // Không cần finally { loading.value = false } nếu đã xử lý trong các nhánh trên
  // nhưng để an toàn có thể giữ lại nếu có nhánh nào đó chưa set loading.
  // Tuy nhiên, nếu điều hướng thành công, component sẽ unmount, nên không sao.
}

function initiateGoogleLogin() {
  AuthService.initiateOAuth2Login('google')
}

function initiateFacebookLogin() {
  AuthService.initiateOAuth2Login('facebook')
}
</script>

<style scoped>
/* CSS nếu cần */
.oauth-login button {
  margin: 5px;
}
.error-messages {
  color: red;
  margin-top: 10px;
}
.alert-success {
  color: green;
  /* Thêm style cho alert-success nếu cần */
  padding: 10px;
  border: 1px solid green;
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: #e6ffed;
}
.alert-danger {
  color: red;
  /* Thêm style cho alert-danger nếu cần */
  padding: 10px;
  border: 1px solid red;
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: #ffe6e6;
}
</style>
