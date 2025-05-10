<!-- src/App.vue (phiên bản dùng Vue Router) -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import AuthService from './api/services/AuthenticateJWTServices/AuthService.js' // Vẫn cần để lấy currentUser cho nav
import { useRouter, useRoute } from 'vue-router' // Để logout và kiểm tra route

const router = useRouter()
const route = useRoute() // Để lấy thông tin route hiện tại

// currentUser cần được lấy từ một nguồn đáng tin cậy,
// lý tưởng nhất là Pinia store, được cập nhật khi login/logout.
// Tạm thời vẫn dùng AuthService, nhưng cần đảm bảo nó reactive hoặc App.vue re-render khi thay đổi.
// Để App.vue tự re-render khi localStorage thay đổi là không dễ.
// Đây là lý do Pinia store rất hữu ích.
// Giả sử chúng ta có một cách để làm currentUser reactive (ví dụ qua event bus đơn giản hoặc Pinia)
const currentUser = ref(AuthService.getCurrentUser()) // Cần cách làm cho nó reactive

// Hàm này để App.vue biết khi nào nên ẩn nav
const shouldShowNav = computed(() => {
  const noNavRoutes = ['OAuthCallback', 'ActivateAccount', 'Login', 'Register'] // Các route không hiển thị nav
  return !noNavRoutes.includes(route.name)
})

function handleLogout() {
  AuthService.logout()
  currentUser.value = null // Cập nhật state (Pinia sẽ tốt hơn)
  router.push({ name: 'Login' })
}

// Theo dõi sự thay đổi trong localStorage (cách đơn giản, không lý tưởng bằng Pinia)
// window.addEventListener('storage', () => {
//   currentUser.value = AuthService.getCurrentUser();
// });
// onMounted(() => {
//   currentUser.value = AuthService.getCurrentUser();
// });
// Pinia sẽ giải quyết vấn đề reactivity của currentUser tốt hơn.
// Hiện tại, bạn có thể cần refresh trang để nav cập nhật sau login/logout nếu chỉ dựa vào localStorage.
// Hoặc, App.vue vẫn lắng nghe event từ các trang con.
</script>

<template>
  <div id="main-app-layout">
    <nav v-if="shouldShowNav">
      <!-- Ví dụ các link điều hướng -->
      <RouterLink to="/">Home (AuthApp)</RouterLink> |
      <RouterLink
        :to="{ name: 'UserHome' }"
        v-if="currentUser && currentUser.roles?.includes('ROLE_USER_MKT')"
        >User Dashboard</RouterLink
      >
      |
      <!-- Thêm các link khác -->

      <span v-if="!currentUser" style="float: right">
        <RouterLink :to="{ name: 'Register' }">Đăng Ký</RouterLink> |
        <RouterLink :to="{ name: 'Login' }">Đăng Nhập</RouterLink>
      </span>
      <span v-if="currentUser" style="float: right">
        Chào, {{ currentUser.username }}
        <button @click="handleLogout" style="margin-left: 10px">Đăng Xuất</button>
      </span>
    </nav>
    <hr v-if="shouldShowNav" />
    <RouterView />
  </div>
</template>

<style>
/* Styles chung */
nav {
  padding: 10px;
  background-color: #f0f0f0;
}
nav a {
  margin-right: 10px;
}
hr {
  margin-bottom: 20px;
}
</style>
