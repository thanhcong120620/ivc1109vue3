<!-- src/AuthApp.vue -->
<script setup>
// TOÀN BỘ LOGIC TỪ App.vue HIỆN TẠI CHUYỂN SANG ĐÂY
// (ref, computed, watch, onMounted, các hàm handle...Success, navigateTo...)
// import { ref, onMounted, computed, watch } from 'vue'
import { ref } from 'vue'
import AuthService from '@/api/services/AuthenticateJWTServices/AuthService.js'
// ... imports các trang LoginPage, RegisterPage, UserHomePage etc. ...

const currentPage = ref('login') // Hoặc giá trị khởi tạo dựa trên AuthService.getCurrentUser()
const currentUser = ref(AuthService.getCurrentUser())
// const router = null; // Sẽ inject nếu dùng Vue Router

// ... (TOÀN BỘ watch(currentUser, ...), onMounted, và các hàm handlers ...)

// Nếu bạn muốn AuthApp.vue điều hướng bằng router sau này:
// import { useRouter } from 'vue-router';
// const router = useRouter();
// thì thay vì currentPage.value = 'userHome', bạn sẽ dùng router.push({ name: 'UserHome' })
</script>

<template>
  <div>
    <!-- Thanh Nav có thể nằm ở đây hoặc ở App.vue (layout cha) -->
    <nav v-if="currentPage !== 'oauthCallback' && currentPage !== 'activateAccount'">
      <button @click="navigateToRegister" v-if="!currentUser">Đăng Ký</button>
      <button @click="navigateToLogin" v-if="!currentUser" style="margin-left: 5px">
        Đăng Nhập
      </button>
      <span v-if="currentUser">
        Chào, {{ currentUser.username }} ({{
          currentUser.roles && currentUser.roles.length > 0
            ? currentUser.roles.join(', ')
            : 'Chưa kích hoạt'
        }}) <button @click="performLogoutActions" style="margin-left: 10px">Đăng Xuất</button>
        <!-- Sửa tên hàm nếu cần -->
      </span>
    </nav>
    <hr v-if="currentPage !== 'oauthCallback' && currentPage !== 'activateAccount'" />

    <!-- Conditional rendering dựa trên currentPage -->
    <div v-if="currentPage === 'register'">
      <RegisterPage @registered="handleRegistrationSuccess" @navigateToLogin="navigateToLogin" />
    </div>
    <div v-else-if="currentPage === 'login'">
      <LoginPage @loggedIn="handleLoginSuccess" @navigateToRegister="navigateToRegister" />
    </div>
    <div v-else-if="currentPage === 'oauthCallback'">
      <OAuthCallbackPage @oauthSuccess="handleLoginSuccess" />
    </div>
    <div v-else-if="currentPage === 'activateAccount'">
      <ActivateAccountPage
        @activationSuccess="handleActivationSuccess"
        @navigateToLogin="navigateToLogin"
        @userLoggedOut="performLogoutActions"
      />
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
    <!-- ... các trường hợp khác ... -->
  </div>
</template>
