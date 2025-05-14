<!-- src/views/UserHomePage.vue
<template>
  <div>
    <h1>Chào mừng đến Trang chủ Admin!</h1>
    <p v-if="user">

      Xin chào, <strong>{{ user.username }}</strong
      >!
    </p>
    <p v-if="user">
      Vai trò của bạn: <span>{{ user.roles.join(', ') }}</span>
    </p>

    <hr />
  
    <div v-if="canUserCreateKeys(user.roles)">
      <CreateActivationKeyForm />
    </div>
    <div v-else>
      <p><em>Bạn không có quyền tạo key kích hoạt.</em></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CreateActivationKeyForm from '@/components/IVC-Admin/CreateActivationKeyForm.vue' // Đường dẫn đúng
defineProps({
  user: Object
})

// Hàm helper để kiểm tra quyền tạo key dựa trên roles của user hiện tại
function canUserCreateKeys(roles) {
  if (!roles) return false
  // Danh sách các role được phép tạo key (phải khớp với SecurityConfig backend)
  const allowedRoles = [
    'ROLE_SUPER_ADMIN',
    'ROLE_ADMIN_MKT',
    'ROLE_ADMIN_FIN',
    'ROLE_MODERATOR_MKT',
    'ROLE_MODERATOR_FIN'
    // Thêm các role khác
  ]
  return roles.some((userRole) => allowedRoles.includes(userRole))
}
</script> -->

<!-- src/views/AdminDashboardPage.vue -->
<script setup>
import { ref, onBeforeMount } from 'vue'
import AuthService from '@/api/services/AuthenticateJWTServices/AuthService' // Đảm bảo đúng đường dẫn
import CreateActivationKeyForm from '@/components/IVC-Admin/CreateActivationKeyForm.vue' // Đường dẫn đúng
import { useRouter, RouterLink } from 'vue-router' // Import nếu cần cho nav

const user = ref(null)
const router = useRouter() // Nếu cần điều hướng

onBeforeMount(() => {
  const currentUserFromAuthService = AuthService.getCurrentUser()
  if (currentUserFromAuthService && currentUserFromAuthService.token) {
    user.value = currentUserFromAuthService
    console.log('[AdminDashboardPage] User data loaded:', JSON.parse(JSON.stringify(user.value)))
    // Logic kiểm tra active/roles và redirect nếu cần (tốt hơn là để guard xử lý)
  } else {
    console.error('[AdminDashboardPage] No authenticated user found. Redirecting to Login.')
    // Navigation guard nên xử lý việc này
    // router.push({ name: 'Login' });
  }
})

// Hàm helper để kiểm tra quyền tạo key dựa trên roles của user hiện tại
function canUserCreateKeys(roles) {
  if (!roles || !Array.isArray(roles)) return false // Kiểm tra roles là mảng
  const allowedRoles = [
    'ROLE_SUPER_ADMIN',
    'ROLE_ADMIN_MKT',
    'ROLE_ADMIN_FIN',
    'ROLE_MODERATOR_MKT',
    'ROLE_MODERATOR_FIN'
  ]
  return roles.some((userRole) => allowedRoles.includes(userRole))
}

function handlePageLogout() {
  AuthService.logout()
  user.value = null
  router.push({ name: 'Login' })
}
</script>

<template>
  <div>
    <nav v-if="user">
      <!-- Nav cục bộ -->
      <span>Chào, {{ user.username }}</span>
      <button @click="handlePageLogout" style="margin-left: 10px">Đăng Xuất</button>
      <RouterLink
        :to="{ name: 'ActivateAccount' }"
        v-if="user && (!user.roles || user.roles.length === 0)"
        style="margin-left: 10px"
        >Kích hoạt tài khoản</RouterLink
      >
    </nav>
    <hr v-if="user" />

    <div v-if="user">
      <h1>Chào mừng đến Trang chủ Admin!</h1>
      <p>
        Xin chào, <strong>{{ user.username }}</strong
        >!
      </p>
      <p v-if="user.roles && user.roles.length > 0">
        Vai trò của bạn: <span>{{ user.roles.join(', ') }}</span>
      </p>
      <p v-else-if="user.token">
        <!-- Có token nhưng roles rỗng -->
        Tài khoản của bạn chưa được kích hoạt. Vui lòng
        <router-link :to="{ name: 'ActivateAccount' }">kích hoạt</router-link>.
      </p>

      <hr />
      <div v-if="canUserCreateKeys(user.roles)">
        <CreateActivationKeyForm />
      </div>
      <div v-else-if="user.roles">
        <!-- Chỉ hiển thị nếu user.roles đã được load -->
        <p><em>Bạn không có quyền tạo key kích hoạt.</em></p>
      </div>
    </div>
    <div v-else>
      <p>Đang tải thông tin người dùng...</p>
    </div>
  </div>
</template>

<style scoped>
/* Styles cho AdminDashboardPage nếu cần */
nav {
  padding: 10px;
  background-color: #e9e9e9;
  margin-bottom: 15px;
}
nav button,
nav a {
  margin-left: 10px;
}
</style>
