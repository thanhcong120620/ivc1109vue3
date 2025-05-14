<script setup>
import { ref, onBeforeMount } from 'vue' // Hoặc onMounted
import AuthService from '../api/services/AuthenticateJWTServices/AuthService'
import { useRouter } from 'vue-router' // Để điều hướng nếu cần
import CreateActivationKeyForm from '@/components/IVC-Admin/CreateActivationKeyForm.vue'

const user = ref(null)
const router = useRouter() // Nếu cần điều hướng

onBeforeMount(() => {
  const currentUserFromAuthService = AuthService.getCurrentUser()
  if (currentUserFromAuthService && currentUserFromAuthService.token) {
    user.value = currentUserFromAuthService
    console.log(
      '[ModeratorPanelPage] User data loaded from AuthService:',
      JSON.parse(JSON.stringify(user.value))
    )

    // Kiểm tra thêm: Nếu user có token nhưng không có roles (chưa active),
    // có thể nên điều hướng về trang kích hoạt.
    // Logic này tốt hơn nên nằm trong navigation guard của router.
    // if (!(user.value.roles && user.value.roles.length > 0)) {
    //   console.log('[UserHomePage] User is not active or has no roles, redirecting to activate.');
    //   router.push({ name: 'ActivateAccount' });
    // }
  } else {
    console.error('[ModeratorPanelPage] No authenticated user found. Redirecting to Login.')
    // Nếu không có user, có thể là truy cập trực tiếp URL mà chưa login,
    // hoặc token đã hết hạn/bị xóa. Navigation guard của router nên xử lý việc này.
    // Tạm thời, có thể redirect về Login ở đây nếu guard chưa hoàn chỉnh.
    router.push({ name: 'Login' })
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
</script>

<template>
  <div>
    <nav>
      <!-- Thanh Nav cục bộ cho trang này, hoặc bạn có thể tạo Layout Component -->
      <span v-if="user" style="float: right">
        Chào, {{ user.username }}
        <button
          @click="
            () => {
              AuthService.logout()
              user = null
              router.push({ name: 'Login' })
            }
          "
          style="margin-left: 10px"
        >
          Đăng Xuất
        </button>
      </span>
      <span v-else style="float: right">
        <router-link :to="{ name: 'Login' }">Đăng Nhập</router-link>
      </span>
    </nav>
    <hr />

    <h1>Chào mừng đến Trang chủ User!</h1>
    <div v-if="user">
      <!-- Kiểm tra user trước khi truy cập thuộc tính -->
      <p>
        Xin chào, <strong>{{ user.username }}</strong
        >!
      </p>
      <p v-if="user.roles && user.roles.length > 0">
        <!-- Kiểm tra user.roles -->
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
      <p>Đang tải thông tin người dùng hoặc bạn cần đăng nhập...</p>
    </div>
  </div>
</template>

<style scoped>
/* Styles cho UserHomePage nếu cần */
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
