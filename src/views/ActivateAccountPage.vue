<template>
  <div class="activate-container">
    <h2>Kích hoạt Tài khoản</h2>
    <p v-if="currentUserInfo">
      Chào mừng, <strong>{{ currentUserInfo.username }}</strong
      >! <br />
      Tài khoản của bạn đã được tạo nhưng cần được kích hoạt để sử dụng đầy đủ tính năng.
    </p>
    <p v-else>Vui lòng đăng nhập lại nếu bạn đã đăng ký trước đó.</p>
    <p>Vui lòng nhập Key Kích hoạt (6 ký tự) đã được cung cấp:</p>

    <form @submit.prevent="handleActivation">
      <div class="form-group">
        <label for="activationKey">Key Kích hoạt:</label>
        <input type="text" id="activationKey" v-model="activationKey" maxlength="6" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Đang kích hoạt...</span>
        <span v-else>Kích hoạt</span>
      </button>
    </form>
    <div v-if="message" :class="successfulActivation ? 'message success' : 'message error'">
      {{ message }}
    </div>
    <div v-if="!currentUserInfo" style="margin-top: 20px">
      <button @click="$parent.currentPage = 'login'">Quay lại Đăng nhập</button>
    </div>
  </div>
  <!-- THÊM CÁC NÚT MỚI Ở ĐÂY -->
  <div class="navigation-options" style="margin-top: 20px">
    <!-- Nút này sẽ ẩn đi nếu currentUserInfo.token không còn -->
    <button
      @click="handleLogoutAndGoToLogin"
      v-if="currentUserInfo && currentUserInfo.token && !successfulActivation"
      style="margin-left: 10px"
    >
      Đăng xuất
    </button>
    <!-- Nút này có thể vẫn hiện -->
    <button @click="handleGoToLogin" v-if="!successfulActivation">Quay lại Đăng nhập</button>
  </div>
  <!-- Nút cũ nếu không có currentUserInfo -->
  <div v-if="!currentUserInfo && !successfulActivation" style="margin-top: 20px">
    <button @click="emit('navigateToLogin')">Quay lại Đăng nhập</button>
    <!-- Nút này cũng có thể hiện -->
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import AuthService from '../api/services/AuthenticateJWTServices/AuthService' // Đảm bảo đúng đường dẫn

// const emit = defineEmits(['activationSuccess'])
const emit = defineEmits(['activationSuccess', 'navigateToLogin', 'userLoggedOut'])
const activationKey = ref('')
const loading = ref(false)
const message = ref('')
const successfulActivation = ref(false)
const currentUserInfo = ref(AuthService.getCurrentUser()) // Lấy user hiện tại (sẽ có token nhưng roles rỗng)

onMounted(() => {
  currentUserInfo.value = AuthService.getCurrentUser()
  console.log(
    '[ActivateAccountPage] Component mounted. CurrentUserInfo from localStorage:',
    JSON.parse(JSON.stringify(currentUserInfo.value))
  )
  if (!currentUserInfo.value || !currentUserInfo.value.token) {
    message.value = 'Vui lòng đăng nhập để có thể kích hoạt tài khoản.'
    // Có thể thêm logic redirect về login nếu không có user
    console.warn('[ActivateAccountPage] No current user or token found on mount.')
  }
})

async function handleActivation() {
  loading.value = true
  message.value = ''
  successfulActivation.value = false

  console.log('[ActivateAccountPage] handleActivation: Attempting with key:', activationKey.value)
  console.log(
    '[ActivateAccountPage] handleActivation: Current user for activation:',
    JSON.parse(JSON.stringify(currentUserInfo.value))
  )

  if (!activationKey.value || activationKey.value.length !== 6) {
    message.value = 'Key kích hoạt phải có đúng 6 ký tự.'
    loading.value = false
    return
  }

  if (!currentUserInfo.value || !currentUserInfo.value.token) {
    message.value = 'Không tìm thấy thông tin đăng nhập để kích hoạt. Vui lòng đăng nhập lại.'
    loading.value = false
    return
  }

  try {
    // AuthService cần một phương thức mới để gọi API /api/auth/activate
    const newJwtResponse = await AuthService.activateAccount(activationKey.value)

    console.log(
      '[ActivateAccountPage] handleActivation: AuthService.activateAccount response (newJwtResponse):',
      JSON.parse(JSON.stringify(newJwtResponse))
    )

    if (newJwtResponse && newJwtResponse.token) {
      message.value = 'Kích hoạt thành công! Bạn sẽ được chuyển hướng.'
      successfulActivation.value = true
      // AuthService.activateAccount đã lưu JWT mới và user vào localStorage
      setTimeout(() => {
        console.log(
          '[ActivateAccountPage] Emitting "activationSuccess" event with newJwtResponse:',
          JSON.parse(JSON.stringify(newJwtResponse))
        )
        emit('activationSuccess', newJwtResponse) // Thông báo cho App.vue
      }, 1500)
    } else {
      message.value = 'Kích hoạt thất bại: Không nhận được thông tin cập nhật từ máy chủ.'
      console.error(
        '[ActivateAccountPage] Activation successful but no token in response:',
        JSON.parse(JSON.stringify(newJwtResponse))
      )
    }
  } catch (error) {
    console.error('Activation error:', error.response || error)
    console.error('[ActivateAccountPage] Activation error caught in component:', error)
    message.value =
      'Kích hoạt thất bại: ' +
      ((error.response && error.response.data) || error.message || 'Lỗi không xác định.')
  } finally {
    loading.value = false
  }
}

function handleGoToLogin() {
  console.log('[ActivateAccountPage] User chose to go back to login.')
  emit('navigateToLogin') // Event này giờ đã được khai báo
}

function handleLogoutAndGoToLogin() {
  console.log('[ActivateAccountPage] User chose to logout.')
  AuthService.logout()
  currentUserInfo.value = null
  emit('userLoggedOut') // Event này giờ đã được khai báo
}
</script>

<style scoped>
.activate-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 80%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
}
.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}
.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
