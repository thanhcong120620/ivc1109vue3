<!-- src/AuthApp.vue
<script setup>
// TOÀN BỘ LOGIC TỪ App.vue HIỆN TẠI CHUYỂN SANG ĐÂY
// (ref, computed, watch, onMounted, các hàm handle...Success, navigateTo...)
// import { ref, onMounted, computed, watch } from 'vue'
import { ref } from 'vue'
import AuthService from '@/api/services/AuthenticateJWTServices/AuthService.js'
// ... imports các trang LoginPage, RegisterPage, UserHomePage etc. ...

const currentPage = ref('login') // Hoặc giá trị khởi tạo dựa trên AuthService.getCurrentUser()
const currentUser = ref(AuthService.getCurrentUser())

</script>

<template>
  <div>

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
        
      </span>
    </nav>
    <hr v-if="currentPage !== 'oauthCallback' && currentPage !== 'activateAccount'" />


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
   
  </div>
</template> -->

<!-- src/views/IVC-Admin/AuthApp.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue' // Đầy đủ imports
import AuthService from '@/api/services/AuthenticateJWTServices/AuthService.js'

// IMPORT CÁC COMPONENT VIEWS VỚI ĐƯỜNG DẪN ĐÚNG
// Giả sử các view này nằm trong thư mục src/views/
import RegisterPage from '../RegisterPage.vue'
import LoginPage from '../LoginPage.vue'
import UserHomePage from '../UserHomePage.vue'
import ModeratorPanelPage from '../ModeratorPanelPage.vue'
import AdminDashboardPage from '../AdminDashboardPage.vue'
// import OAuthCallbackPage from '../OAuthCallbackPage.vue'
import ActivateAccountPage from '../ActivateAccountPage.vue'

const currentPage = ref('login')
const currentUser = ref(AuthService.getCurrentUser())

// isOAuthCallbackPage sẽ cần được tính toán lại nếu AuthApp không phải là root và không truy cập trực tiếp window.location
// Tuy nhiên, nếu AuthApp được render ở route '/', và bạn điều hướng đến /oauth-callback (là một route riêng biệt),
// thì AuthApp sẽ không được render khi ở /oauth-callback.
// Nên để logic isOAuthCallbackPage cho component nào thực sự xử lý /oauth-callback.
// Tạm thời bỏ, vì App.vue (root) sẽ render OAuthCallbackPage trực tiếp nếu có route cho nó.
// const isOAuthCallbackPage = computed(() => window.location.pathname === '/oauth-callback');

// --- TOÀN BỘ LOGIC WATCH VÀ CÁC HÀM HANDLERS TỪ APP.VUE CŨ CHUYỂN VÀO ĐÂY ---
console.log('[AuthApp.vue] Component setup. Initial currentPage:', currentPage.value)
if (currentUser.value === undefined) {
  console.log('[AuthApp.vue] Initial currentUser is undefined.')
} else if (currentUser.value === null) {
  console.log('[AuthApp.vue] Initial currentUser is null.')
} else {
  console.log('[AuthApp.vue] Initial currentUser (raw):', currentUser.value)
}

watch(
  currentUser,
  (newUser, oldUser) => {
    console.log('[AuthApp.vue] Watcher: currentUser changed.')
    if (newUser === undefined) {
      /* ... log ... */
    } else if (newUser === null) {
      console.log('[AuthApp.vue] Watcher: New User is null')
    } else {
      console.log('[AuthApp.vue] Watcher: New User (raw):', newUser)
    }

    if (oldUser === undefined) {
      /* ... log ... */
    } else if (oldUser === null) {
      console.log('[AuthApp.vue] Watcher: Old User is null')
    } else {
      console.log('[AuthApp.vue] Watcher: Old User (raw):', oldUser)
    }

    if (newUser) {
      if (newUser.roles && newUser.roles.length > 0) {
        navigateToUserPageBasedOnRoles(newUser.roles)
      } else {
        currentPage.value = 'activateAccount'
        console.log(
          '[AuthApp.vue] Watcher: User logged in but not active or no roles, navigating to activateAccount'
        )
      }
    } else {
      console.log('[AuthApp.vue] Watcher: No currentUser (newUser is null), navigating to login.')
      currentPage.value = 'login'
    }
  },
  { immediate: true }
)

onMounted(() => {
  // Nếu AuthApp được render ở route '/', không cần kiểm tra isOAuthCallbackPage ở đây
  // vì OAuthCallbackPage sẽ là một route riêng do Vue Router xử lý.
  // Watcher currentUser đã chạy rồi.
  console.log('[AuthApp.vue] Mounted. CurrentUser watcher with immediate=true should have run.')
})

function navigateToUserPageBasedOnRoles(roles) {
  // ... (giữ nguyên) ...
  console.log('[AuthApp.vue] Navigating based on roles:', roles)
  if (roles.includes('ROLE_SUPER_ADMIN') || roles.some((role) => role.startsWith('ROLE_ADMIN_'))) {
    currentPage.value = 'adminDashboard'
  } else if (roles.some((role) => role.startsWith('ROLE_MODERATOR_'))) {
    currentPage.value = 'moderatorPanel'
  } else if (roles.some((role) => role.startsWith('ROLE_USER_'))) {
    currentPage.value = 'userHome'
  } else {
    console.warn(
      '[AuthApp.vue] No specific dashboard for roles:',
      roles,
      '. Defaulting to userHome.'
    )
    currentPage.value = 'userHome'
  }
}

function handleRegistrationSuccess(userData) {
  console.log('[AuthApp.vue] handleRegistrationSuccess called with userData (raw):', userData)
  currentUser.value = AuthService.getCurrentUser()
}

function handleLoginSuccess(userData) {
  // Nếu OAuthCallbackPage emit event này, AuthApp đang được render ở route '/'
  // AuthApp sẽ cập nhật currentUser và watcher sẽ đổi currentPage
  console.log('[AuthApp.vue] handleLoginSuccess called with userData (raw):', userData)
  currentUser.value = AuthService.getCurrentUser()
}

function handleActivationSuccess(userData) {
  console.log('[AuthApp.vue] handleActivationSuccess called with userData (raw):', userData)
  currentUser.value = AuthService.getCurrentUser()
}

function performLogoutActions() {
  console.log('[AuthApp.vue] Performing logout actions.')
  AuthService.logout()
  currentUser.value = null // Kích hoạt watcher
}

function navigateToLogin() {
  currentPage.value = 'login'
}
function navigateToRegister() {
  currentPage.value = 'register'
}
</script>

<template>
  <div>
    <!-- Thanh Nav cục bộ cho AuthApp -->
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
        }})
        <button @click="performLogoutActions" style="margin-left: 10px">Đăng Xuất</button>
      </span>
    </nav>
    <hr v-if="currentPage !== 'oauthCallback' && currentPage !== 'activateAccount'" />

    <!-- Conditional rendering -->
    <div v-if="currentPage === 'register'">
      <RegisterPage @registered="handleRegistrationSuccess" @navigateToLogin="navigateToLogin" />
    </div>
    <div v-else-if="currentPage === 'login'">
      <LoginPage @loggedIn="handleLoginSuccess" @navigateToRegister="navigateToRegister" />
    </div>
    <!-- OAuthCallbackPage sẽ được render bởi Vue Router ở route /oauth-callback, không phải ở đây -->
    <!-- <div v-else-if="currentPage === 'oauthCallback'"> <OAuthCallbackPage @oauthSuccess="handleLoginSuccess" /> </div> -->
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
    <div
      v-else-if="
        !currentUser &&
        currentPage !== 'login' &&
        currentPage !== 'register' &&
        currentPage !== 'activateAccount' &&
        currentPage !== 'oauthCallback'
      "
    >
      <p>Vui lòng đăng nhập hoặc đăng ký.</p>
      <button @click="navigateToLogin">Đăng Nhập</button>
      <button @click="navigateToRegister">Đăng Ký</button>
    </div>
    <div
      v-else-if="
        currentUser &&
        currentPage !== 'activateAccount' &&
        (!currentUser.roles || currentUser.roles.length === 0)
      "
    >
      <p>Tài khoản của bạn đã được tạo nhưng chưa kích hoạt. Vui lòng kích hoạt để tiếp tục.</p>
      <button @click="currentPage = 'activateAccount'">Đi đến trang Kích hoạt</button>
    </div>
  </div>
</template>
