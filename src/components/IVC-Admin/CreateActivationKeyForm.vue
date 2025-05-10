<template>
  <div class="create-key-form">
    <h3>Tạo Key Kích hoạt Mới</h3>
    <form @submit.prevent="handleCreateKey">
      <div class="form-group">
        <label for="targetRoleName">Vai trò Mục tiêu:</label>
        <!-- Nên là một dropdown lấy từ danh sách các role mà Host được phép tạo -->
        <select id="targetRoleName" v-model="keyRequest.targetRoleName" required>
          <option disabled value="">Vui lòng chọn vai trò</option>
          <option v-for="role in creatableRoles" :key="role.value" :value="role.value">
            {{ role.text }}
          </option>
        </select>
        <!-- Hoặc một input text nếu bạn muốn nhập tự do, nhưng dropdown an toàn hơn -->
        <!-- <input type="text" id="targetRoleName" v-model="keyRequest.targetRoleName" placeholder="VD: USER_MKT, MODERATOR_FIN" required /> -->
      </div>

      <div class="form-group">
        <label for="targetDepartmentCode">Mã Phòng ban (nếu có):</label>
        <!-- Nên là một dropdown lấy từ danh sách department -->
        <select id="targetDepartmentCode" v-model="keyRequest.targetDepartmentCode">
          <option value="">Không chọn</option>
          <option v-for="dept in availableDepartments" :key="dept.code" :value="dept.code">
            {{ dept.name }} ({{ dept.code }})
          </option>
        </select>
        <!-- <input type="text" id="targetDepartmentCode" v-model="keyRequest.targetDepartmentCode" placeholder="VD: MKT, FIN" /> -->
      </div>

      <div class="form-group">
        <label for="targetJobTitle">Chức Danh (nếu có):</label>
        <input
          type="text"
          id="targetJobTitle"
          v-model="keyRequest.targetJobTitle"
          placeholder="VD: Nhân viên Content, Quản lý Thuế"
        />
      </div>

      <button type="submit" :disabled="loading">
        <span v-if="loading">Đang tạo...</span>
        <span v-else>Tạo Key</span>
      </button>
    </form>

    <div
      v-if="message"
      :class="{ 'message-success': success, 'message-error': !success }"
      class="message-area"
    >
      {{ message }}
      <div v-if="success && generatedKeyInfo" class="generated-key-details">
        <p>
          <strong>Key Kích hoạt: {{ generatedKeyInfo.activationKey }}</strong>
        </p>
        <p>Vai trò: {{ generatedKeyInfo.targetRoleName }}</p>
        <p v-if="generatedKeyInfo.targetDepartmentName">
          Phòng ban: {{ generatedKeyInfo.targetDepartmentName }}
        </p>
        <p v-if="generatedKeyInfo.targetJobTitle">
          Chức danh: {{ generatedKeyInfo.targetJobTitle }}
        </p>
        <p>Hết hạn lúc: {{ formatDateTime(generatedKeyInfo.expiryTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Giả sử bạn có một service để gọi API tạo key (có thể thêm vào AuthService hoặc tạo service mới)
// import KeyService from '@/api/services/KeyService'; // Ví dụ
import AuthService from '@/api/services/AuthenticateJWTServices/AuthService' // Hoặc API service khác
import axios from 'axios' // Hoặc dùng instance Axios đã cấu hình

const API_USERS_URL = 'http://localhost:8080/api/users/'

const keyRequest = ref({
  targetRoleName: '',
  targetDepartmentCode: '',
  targetJobTitle: ''
})
const loading = ref(false)
const message = ref('')
const success = ref(false)
const generatedKeyInfo = ref(null)

// ----- TODO: Lấy danh sách các role và department mà Host này được phép tạo/chọn -----
const creatableRoles = ref([
  // Đây là dữ liệu giả, cần lấy từ API hoặc cấu hình dựa trên role của Host
  // Ví dụ, nếu Host là ADMIN_MKT, chỉ nên hiện các role thấp hơn hoặc bằng trong MKT
  { value: 'USER_MKT', text: 'Nhân viên Marketing (USER_MKT)' },
  { value: 'USER_FIN', text: 'Nhân viên Tài chính (USER_FIN)' },
  { value: 'MODERATOR_MKT', text: 'Quản lý Marketing (MODERATOR_MKT)' }
])
const availableDepartments = ref([
  // Dữ liệu giả, cần lấy từ API
  { code: 'MKT', name: 'Phòng Marketing' },
  { code: 'FIN', name: 'Phòng Tài chính' },
  { code: 'HR', name: 'Phòng Nhân sự' }
])

// onMounted(async () => {
//   // TODO: Gọi API để lấy danh sách creatableRoles và availableDepartments
//   // Ví dụ:
//   // creatableRoles.value = await KeyService.getCreatableRolesForCurrentUser();
//   // availableDepartments.value = await DepartmentService.getAllDepartments();
// });

async function handleCreateKey() {
  loading.value = true
  message.value = ''
  success.value = false
  generatedKeyInfo.value = null

  const currentUser = AuthService.getCurrentUser()
  if (!currentUser || !currentUser.token) {
    message.value = 'Lỗi: Phiên đăng nhập hết hạn hoặc không hợp lệ.'
    loading.value = false
    return
  }

  try {
    // Gọi API POST /api/users/activation-keys
    const response = await axios.post(API_USERS_URL + 'activation-keys', keyRequest.value, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
    // Giả sử KeyService.createActivationKey(keyRequest.value) đã xử lý header token
    // const responseData = await KeyService.createActivationKey(keyRequest.value);

    generatedKeyInfo.value = response.data // response.data là GeneratedKeyResponse
    message.value = `Tạo key thành công! Key: ${generatedKeyInfo.value.activationKey}`
    success.value = true
    // Reset form (tùy chọn)
    // keyRequest.value = { targetRoleName: '', targetDepartmentCode: '', targetJobTitle: '' };
  } catch (error) {
    console.error('Error creating activation key:', error.response || error)
    success.value = false
    if (error.response && error.response.data) {
      // Nếu backend trả về string (ví dụ AccessDeniedException message)
      if (typeof error.response.data === 'string') {
        message.value = 'Lỗi: ' + error.response.data
      }
      // Nếu backend trả về object (ví dụ từ @RestControllerAdvice)
      else if (error.response.data.message) {
        message.value = 'Lỗi: ' + error.response.data.message
      } else if (error.response.data.error) {
        // Một số cấu trúc lỗi khác
        message.value = 'Lỗi: ' + error.response.data.error
      } else {
        message.value = 'Lỗi không xác định từ máy chủ khi tạo key.'
      }
    } else {
      message.value = 'Lỗi tạo key: ' + (error.message || 'Không thể kết nối đến máy chủ.')
    }
  } finally {
    loading.value = false
  }
}

function formatDateTime(dateTimeString) {
  if (!dateTimeString) return ''
  const date = new Date(dateTimeString)
  return date.toLocaleString('vi-VN')
}
</script>

<style scoped>
.create-key-form {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.message-area {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}
.message-success {
  background-color: #d4edda;
  color: #155724;
}
.message-error {
  background-color: #f8d7da;
  color: #721c24;
}
.generated-key-details {
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #ccc;
  background-color: #f9f9f9;
}
.generated-key-details p {
  margin: 5px 0;
}
</style>
