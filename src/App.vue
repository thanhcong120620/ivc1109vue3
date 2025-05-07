<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import AdminIndex from './components/EmptyPage.vue'
// import HomeView from './views/HomeView.vue'
import { ref, onMounted, computed } from 'vue'
import AuthService from './api/services/AuthenticateJWTServices/AuthService'
import SelectRolePage from './views/SelectRolePage.vue'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'
import UserHomePage from './views/UserHomePage.vue'
import ModeratorPanelPage from './views/ModeratorPanelPage.vue'
import AdminDashboardPage from './views/AdminDashboardPage.vue'
import OAuthCallbackPage from './views/OAuthCallbackPage.vue'

const currentPage = ref('selectRole') // Trang ban đầu
const currentUser = ref(AuthService.getCurrentUser())
const roleForRegistration = ref('')

const isOAuthCallbackPage = computed(() => {
  // Kiểm tra xem URL có phải là trang callback OAuth2 không
  return window.location.pathname === '/oauth-callback'
})

onMounted(() => {
  // Kiểm tra xem có phải là trang callback từ OAuth2 không
  if (isOAuthCallbackPage.value) {
    currentPage.value = 'oauthCallback'
  } else {
    // Nếu đã đăng nhập, chuyển đến trang tương ứng
    if (currentUser.value) {
      navigateToUserPage(currentUser.value.roles)
    }
  }
})

function navigateToUserPage(roles) {
  // KIỂM TRA LOGIC NÀY
  console.log('Navigating based on roles:', roles) // Thêm log
  if (roles.includes('ROLE_ADMIN')) {
    currentPage.value = 'adminDashboard'
    console.log('Setting currentPage to adminDashboard')
  } else if (roles.includes('ROLE_MODERATOR')) {
    currentPage.value = 'moderatorPanel'
    console.log('Setting currentPage to moderatorPanel')
  } else if (roles.includes('ROLE_USER')) {
    currentPage.value = 'userHome'
    console.log('Setting currentPage to userHome')
  } else {
    currentPage.value = 'login' // Fallback nếu không có role phù hợp
    console.log('No matching role, setting currentPage to login')
  }
}

function handleRoleSelectedForRegistration(role) {
  roleForRegistration.value = role
  currentPage.value = 'register'
}

function handleLoginOrRegisterSuccess(userData) {
  // KIỂM TRA userData và roles
  console.log('handleLoginOrRegisterSuccess called with userData:', userData)
  if (userData && userData.roles && Array.isArray(userData.roles)) {
    currentUser.value = userData
    navigateToUserPage(userData.roles) // Gọi hàm chuyển trang
  } else {
    console.error('Invalid userData received in handleLoginOrRegisterSuccess:', userData)
    // Xử lý lỗi, ví dụ: hiển thị thông báo, quay về login
    currentUser.value = null
    currentPage.value = 'login'
  }
}

function handleLogout() {
  AuthService.logout()
  currentUser.value = null
  currentPage.value = 'login'
}
</script>

<template>
  <div>
    <!-- <router-view /> -->
    <!-- <AdminIndex /> -->
    <!-- <RouterView /> -->
    <div id="app-container">
      <nav v.if="!isOAuthCallbackPage">
        <button @click="currentPage = 'selectRole'">Chọn Role Đăng Ký</button> |
        <button @click="currentPage = 'login'" v-if="!currentUser">Đăng Nhập</button>
        <span v-if="currentUser">
          | Chào, {{ currentUser.username }} ({{ currentUser.roles.join(', ') }}) |
          <button @click="handleLogout">Đăng Xuất</button>
        </span>
      </nav>
      <hr v.if="!isOAuthCallbackPage" />

      <div v-if="currentPage === 'selectRole'">
        <SelectRolePage @role-selected="handleRoleSelectedForRegistration" />
      </div>
      <div v-else-if="currentPage === 'register'">
        <RegisterPage
          :selectedRole="roleForRegistration"
          @registered="handleLoginOrRegisterSuccess"
        />
      </div>
      <div v-else-if="currentPage === 'login'">
        <LoginPage @loggedIn="handleLoginOrRegisterSuccess" />
      </div>
      <div v-else-if="currentPage === 'oauthCallback'">
        <OAuthCallbackPage @oauthSuccess="handleLoginOrRegisterSuccess" />
      </div>
      <div v-else-if="currentUser && currentPage === 'userHome'">
        <UserHomePage :user="currentUser" />
      </div>
      <div v-else-if="currentUser && currentPage === 'moderatorPanel'">
        <ModeratorPanelPage :user="currentUser" />
      </div>
      <div v-else-if="currentUser && currentPage === 'adminDashboard'">
        <AdminDashboardPage :user="currentUser" />
      </div>
      <div v-else-if="!currentUser && !isOAuthCallbackPage">
        <p>Vui lòng chọn một hành động hoặc đăng nhập.</p>
      </div>
    </div>
  </div>
</template>

<style>
#app-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
}
nav button {
  margin-right: 10px;
}
</style>
