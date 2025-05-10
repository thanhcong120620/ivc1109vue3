<!-- src/views/UserHomePage.vue -->
<template>
  <div>
    <h1>Chào mừng đến Trang chủ Admin!</h1>
    <p v-if="user">
      <!-- Vẫn dùng 'user' trực tiếp ở đây -->
      Xin chào, <strong>{{ user.username }}</strong
      >!
    </p>
    <p v-if="user">
      Vai trò của bạn: <span>{{ user.roles.join(', ') }}</span>
    </p>

    <hr />
    <!-- Chỉ hiển thị form tạo key nếu user có quyền (ví dụ, kiểm tra role) -->
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
</script>
