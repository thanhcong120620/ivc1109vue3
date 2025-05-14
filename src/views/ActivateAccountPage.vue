<!-- src/views/ActivateAccountPage.vue -->
<script setup>
import { ref, onMounted } from 'vue' // Bỏ defineEmits nếu không dùng nữa
import { useRouter } from 'vue-router' // THÊM IMPORT
import AuthService from '../api/services/AuthenticateJWTServices/AuthService'

// const emit = defineEmits(['activationSuccess', 'navigateToLogin', 'userLoggedOut']); // BỎ HOẶC SỬA
// const emit = defineEmits(['navigateToLogin', 'userLoggedOut']); // Chỉ giữ lại nếu các nút đó vẫn emit cho App.vue (mà App.vue mới không bắt)

const router = useRouter() // SỬ DỤNG ROUTER
const activationKey = ref('')
const loading = ref(false)
const message = ref('')
const successfulActivation = ref(false)
const currentUserInfo = ref(null)

onMounted(() => {
  currentUserInfo.value = AuthService.getCurrentUser()
  console.log(
    '[ActivateAccountPage] Component mounted. CurrentUserInfo from localStorage:',
    currentUserInfo.value ? JSON.parse(JSON.stringify(currentUserInfo.value)) : null
  )
  if (!currentUserInfo.value || !currentUserInfo.value.token) {
    message.value = 'Vui lòng đăng nhập để có thể kích hoạt tài khoản.'
    console.warn('[ActivateAccountPage] No current user or token found on mount.')
    // Navigation guard nên đã xử lý việc redirect về login nếu không có token
  }
})

async function handleActivation() {
  loading.value = true
  message.value = ''
  successfulActivation.value = false

  console.log('[ActivateAccountPage] handleActivation: Attempting with key:', activationKey.value)

  if (!activationKey.value || activationKey.value.length !== 6) {
    message.value = 'Key kích hoạt phải có đúng 6 ký tự.'
    loading.value = false
    return
  }

  if (!currentUserInfo.value || !currentUserInfo.value.token) {
    message.value = 'Không tìm thấy thông tin đăng nhập để kích hoạt. Vui lòng đăng nhập lại.'
    loading.value = false
    // router.push({ name: 'Login' }); // Có thể thêm điều hướng về login ở đây
    return
  }

  try {
    const newJwtResponse = await AuthService.activateAccount(activationKey.value)
    console.log(
      '[ActivateAccountPage] handleActivation: AuthService.activateAccount response (newJwtResponse):',
      newJwtResponse ? JSON.parse(JSON.stringify(newJwtResponse)) : null
    )

    if (newJwtResponse && newJwtResponse.token) {
      message.value = 'Kích hoạt thành công! Bạn sẽ được chuyển hướng.'
      successfulActivation.value = true
      // AuthService.activateAccount đã lưu JWT mới và user vào localStorage

      setTimeout(() => {
        console.log(
          '[ActivateAccountPage] Activation successful. Navigating based on new roles:',
          newJwtResponse.roles
        )
        // emit('activationSuccess', newJwtResponse); // BỎ EMIT NÀY

        // TỰ ĐIỀU HƯỚNG
        if (newJwtResponse.roles && newJwtResponse.roles.length > 0) {
          if (
            newJwtResponse.roles.includes('ROLE_SUPER_ADMIN') ||
            newJwtResponse.roles.some((r) => r.startsWith('ROLE_ADMIN_'))
          ) {
            router.push({ name: 'AdminDashboard' })
          } else if (newJwtResponse.roles.some((r) => r.startsWith('ROLE_MODERATOR_'))) {
            router.push({ name: 'ModeratorPanel' })
          } else {
            router.push({ name: 'UserHome' })
          }
        } else {
          // Trường hợp lạ: kích hoạt thành công nhưng không có role (backend nên luôn trả role)
          // Hoặc roles không được backend trả về đúng cách
          console.error(
            '[ActivateAccountPage] Activation reported success, but no roles in new JWT. Staying on page or redirecting to login.'
          )
          message.value =
            'Kích hoạt có thể chưa hoàn tất, không xác định được vai trò. Vui lòng thử đăng nhập lại.'
          // router.push({ name: 'Login' }); // Hoặc để user ở lại trang activate
        }
      }, 1500) // Delay để user đọc message
    } else {
      message.value = 'Kích hoạt thất bại: Không nhận được thông tin cập nhật từ máy chủ.'
      console.error(
        '[ActivateAccountPage] Activation successful but no token in response:',
        newJwtResponse
      )
    }
  } catch (error) {
    console.error('[ActivateAccountPage] Activation error caught in component:', error)
    message.value =
      'Kích hoạt thất bại: ' +
      ((error.response &&
        error.response.data &&
        (error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data))) ||
        error.message ||
        'Lỗi không xác định.')
  } finally {
    loading.value = false
  }
}

// Các hàm handleGoToLogin và handleLogoutAndGoToLogin cần dùng router.push
function handleGoToLogin() {
  console.log('[ActivateAccountPage] User chose to go back to login.')
  router.push({ name: 'Login' })
}

function handleLogoutAndGoToLogin() {
  console.log('[ActivateAccountPage] User chose to logout.')
  AuthService.logout()
  currentUserInfo.value = null
  router.push({ name: 'Login' })
}
</script>

<!-- Template giữ nguyên các nút "Quay lại đăng nhập" và "Đăng xuất" -->
<template>
  <div class="activate-container">
    <h2>Kích hoạt Tài khoản</h2>
    <p v-if="currentUserInfo && currentUserInfo.username">
      <!-- Thêm kiểm tra username -->
      Chào mừng, <strong>{{ currentUserInfo.username }}</strong
      >! <br />
      Tài khoản của bạn đã được tạo nhưng cần được kích hoạt để sử dụng đầy đủ tính năng.
    </p>
    <p v-else-if="!currentUserInfo || !currentUserInfo.token">
      Vui lòng <router-link :to="{ name: 'Login' }">đăng nhập</router-link> để kích hoạt tài khoản.
    </p>
    <p>Vui lòng nhập Key Kích hoạt (6 ký tự) đã được cung cấp:</p>

    <form @submit.prevent="handleActivation">
      <div class="form-group">
        <label for="activationKey">Key Kích hoạt:</label>
        <input
          type="text"
          id="activationKey"
          v-model="activationKey"
          maxlength="6"
          required
          :disabled="!currentUserInfo || !currentUserInfo.token"
        />
      </div>
      <button type="submit" :disabled="loading || !currentUserInfo || !currentUserInfo.token">
        <span v-if="loading">Đang kích hoạt...</span>
        <span v-else>Kích hoạt</span>
      </button>
    </form>
    <div v-if="message" :class="successfulActivation ? 'message success' : 'message error'">
      {{ message }}
    </div>

    <div
      class="navigation-options"
      style="margin-top: 20px"
      v-if="!successfulActivation && currentUserInfo && currentUserInfo.token"
    >
      <button @click="handleGoToLogin">Quay lại Đăng nhập</button>
      <button @click="handleLogoutAndGoToLogin" style="margin-left: 10px">Đăng xuất</button>
    </div>
  </div>
</template>
<!-- style giữ nguyên -->

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
