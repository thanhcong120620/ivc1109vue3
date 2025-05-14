import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/HomeView.vue'

import UserHomePage from '../views/UserHomePage.vue'
import OAuthCallbackPage from '../views/OAuthCallbackPage.vue'
import ModeratorPanelPage from '../views/ModeratorPanelPage.vue'
import AdminDashboardPage from '../views/AdminDashboardPage.vue'
import LoginPageOauth from '../views/LoginPage.vue' // Nếu bạn muốn route /login riêng
import RegisterPage from '../views/RegisterPage.vue' // Nếu bạn muốn route /register riêng
import ActivateAccountPage from '../views/ActivateAccountPage.vue'
import AuthService from '../api/services/AuthenticateJWTServices/AuthService'
// import AuthApp from '../views/IVC-Admin/AuthApp.vue'

//---------------------------TEST------------------------------------
//Components Test
import MKTEmailNeumorphism from '../components/test/IVC-CRM-EmailMKT.vue'
import SenderPannel from '../components/IVC-Admin/Admin-MKTDigital/EmailMKT/SenderPannel.vue'
import AxiosTest from '../components/test/AxiosTest.vue'
import GmailTest from '../components/test/GmailTest.vue'
import MKTTest from '../components/test/TestModal.vue'
import TestChart from '../components/test/TestChart.vue'
import TestTailwind from '../components/test/TestTailwind.vue'
import TestTailwindDarkmode from '../components/test/ScreenDarkmode.vue'
import CarouselImage from '../components/test/CarouselImage.vue'

//Components uni kit
import ButtonDoc from '../components/UniKit/ButtonDoc.vue'
import ChartDoc from '../components/UniKit/ChartDoc.vue'
import FileDoc from '../components/UniKit/FileDoc.vue'
import FormLayout from '../components/UniKit/FormLayout.vue'
import InputDoc from '../components/UniKit/InputDoc.vue'
import ListDoc from '../components/UniKit/ListDoc.vue'
import MediaDoc from '../components/UniKit/MediaDoc.vue'
import MenuDoc from '../components/UniKit/MenuDoc.vue'
import MessagesDoc from '../components/UniKit/MessagesDoc.vue'
import MiscDoc from '../components/UniKit/MiscDoc.vue'
import OverlayDoc from '../components/UniKit/OverlayDoc.vue'
import PanelsDoc from '../components/UniKit/PanelsDoc.vue'
import TableDoc from '../components/UniKit/TableDoc.vue'
import TimelineDoc from '../components/UniKit/TimelineDoc.vue'
import TreeDoc from '../components/UniKit/TreeDoc.vue'

//Components landing page
import LandingPage from '../components/UniKit/pages/LandingPage.vue'

//Components Crud  page
import CrudPage from '../components/UniKit/pages/CrudPage.vue'

//Components auth page
import AccessAuthPage from '../components/UniKit/pages/auth/AccessPage.vue'
import ErrorPage from '../components/UniKit/pages/auth/ErrorPage.vue'
import LoginPage from '../components/UniKit/pages/auth/LoginPage.vue'
import EmptyPage from '../components/UniKit/pages/Empty.vue'

//------------------------------Component------------------------------------

//CRM Funtion
import UserList from '../components/IVC-Admin/Admin-MKTDigital/CRM-Function/UserList.vue'

//Element Desktop
import ElementDesktop from '../components/Element-Desktop/ElementDesktop.vue'

//------------------------------View------------------------------------

//CRM Email Funtion
import IVCRealtorProject from '../views/IVC-Admin/Admin-Realtor/Admin-Realtor-ProjectManagement/IVCRealtorProject.vue'
import EmailMKTFormStandardPannel from '../views/IVC-Admin/Admin-MKTDigital/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT-ViewForm/EmailMKT-FormStandard-Pannel.vue'
import MKTEmail from '../views/IVC-Admin/Admin-MKTDigital/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT-Pannel.vue'

//Admin-Realtor-News
import AdminRealtorNews from '../components/IVC-Admin/Admin-Realtor/Admin-Realtor-News/Admin-Realtor-News-View/NewsFeed.vue'
import AdminRealtorNewsXMLProcess from '../components/IVC-Admin/Admin-Realtor/Admin-Realtor-News/Admin-Realtor-News-View/NewsFeed-XuLyXml.vue'
import DanTriFrontDirectNotUseBackEnd from '../components/IVC-Admin/Admin-Realtor/Admin-Realtor-News/Admin-Realtor-News-View/DanTriFrontDirectNotUseBackEnd.vue'

//_____________________________________________________________________________________________________________________________________

const routes = [
  {
    path: '/',
    name: 'LandingPage', // Hoặc LandingPage, hoặc không cần name nếu chỉ redirect
    redirect: () => {
      const currentUser = AuthService.getCurrentUser()
      const isLoggedIn = !!(currentUser && currentUser.token)
      const userIsActive = isLoggedIn && currentUser.roles && currentUser.roles.length > 0

      if (isLoggedIn) {
        if (userIsActive) {
          if (
            currentUser.roles.includes('ROLE_SUPER_ADMIN') ||
            currentUser.roles.some((r) => r.startsWith('ROLE_ADMIN_'))
          ) {
            return { name: 'AdminDashboard' }
          } else if (currentUser.roles.some((r) => r.startsWith('ROLE_MODERATOR_'))) {
            return { name: 'ModeratorPanel' }
          }
          return { name: 'UserHome' }
        } else {
          return { name: 'ActivateAccount' }
        }
      }
      return { name: 'Login' }
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginPageOauth,

    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/activate-account',
    name: 'ActivateAccount',
    component: ActivateAccountPage,
    meta: { requiresAuth: true } // Cần User (dù chưa active) để vào đây
  },
  {
    path: '/oauth-callback',
    name: 'OAuthCallback',
    component: OAuthCallbackPage
    // Không cần meta, trang này tự xử lý và điều hướng
  },
  {
    path: '/user/home',
    name: 'UserHome',
    component: UserHomePage,
    meta: {
      requiresAuth: true,
      roles: [
        // User, Mod, Admin, SuperAdmin đều có thể vào UserHome
        'ROLE_USER_MKT',
        'ROLE_USER_FIN', // Thêm tất cả các USER roles của bạn
        'ROLE_MODERATOR_MKT',
        'ROLE_MODERATOR_FIN', // Thêm tất cả các MODERATOR roles
        'ROLE_ADMIN_MKT',
        'ROLE_ADMIN_FIN', // Thêm tất cả các ADMIN roles
        'ROLE_SUPER_ADMIN'
      ]
    }
  },
  {
    path: '/moderator/panel',
    name: 'ModeratorPanel',
    component: ModeratorPanelPage,
    meta: {
      requiresAuth: true,
      roles: [
        // CHỈNH SỬA Ở ĐÂY: Mod, Admin, SuperAdmin
        'ROLE_MODERATOR_MKT',
        'ROLE_MODERATOR_FIN', // Thêm tất cả các MODERATOR roles
        'ROLE_ADMIN_MKT',
        'ROLE_ADMIN_FIN', // Các ADMIN roles
        'ROLE_SUPER_ADMIN'
      ]
    }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboardPage,
    meta: {
      requiresAuth: true,
      roles: [
        // CHỈNH SỬA Ở ĐÂY: Admin, SuperAdmin
        'ROLE_ADMIN_MKT',
        'ROLE_ADMIN_FIN', // Các ADMIN roles
        'ROLE_SUPER_ADMIN'
      ]
    }
  },

  //==========================================================================================================

  //Admin-Realtor-News
  { path: '/admin-realtor-news', component: AdminRealtorNews },
  { path: '/admin-realtor-news-xu-ly-xml', component: AdminRealtorNewsXMLProcess },
  {
    path: '/admin-realtor-Dan-Tri-Front-Direct-Not-Use-BackEnd',
    component: DanTriFrontDirectNotUseBackEnd
  },

  //Admin Dashboard

  //-----------------------------------------------------------TEST--------------------------------------------------------

  //Components Test
  { path: '/axios-test', component: AxiosTest },
  { path: '/gmail-test', component: GmailTest },
  { path: '/test-chart', component: TestChart },
  { path: '/crm-markeing-test', component: MKTTest },
  { path: '/crm-markeing-email-neumorphism', component: MKTEmailNeumorphism },
  { path: '/test-user-list', component: UserList },
  { path: '/test-tailwind', component: TestTailwind },
  { path: '/test-tailwind-darkmode', component: TestTailwindDarkmode },
  { path: '/carousel-image', component: CarouselImage },

  //Components unit-kit
  { path: '/button-doc', component: ButtonDoc },
  { path: '/chart-doc', component: ChartDoc },
  { path: '/file-doc', component: FileDoc },
  { path: '/form-layout', component: FormLayout },
  { path: '/input-doc', component: InputDoc }, //đang bị lỗi css so với Sakai
  { path: '/list-doc', component: ListDoc },
  { path: '/media-doc', component: MediaDoc },
  { path: '/menu-doc', component: MenuDoc }, //đang bị lỗi css so với Sakai
  { path: '/message-doc', component: MessagesDoc },
  { path: '/misc-doc', component: MiscDoc },
  { path: '/overlay-doc', component: OverlayDoc }, //Cần cài lại API, Sakai cũng bị lỗi API
  { path: '/pannels-doc', component: PanelsDoc }, //đang bị lỗi css so với Sakai  //đang bị lỗi toast và dữ liệu với services, cần đối chiếu với sakai để test lại
  { path: '/table-doc', component: TableDoc }, //Cần cài lại API, Sakai cũng bị lỗi API
  { path: '/timeline-doc', component: TimelineDoc },
  { path: '/tree-doc', component: TreeDoc },

  //Components landing-page
  { path: '/landing-page', component: LandingPage },

  //Components Auth-page
  { path: '/access-auth-page', component: AccessAuthPage },
  { path: '/error-auth-page', component: ErrorPage },
  { path: '/login-auth-page', component: LoginPage },

  //Components landing-page
  { path: '/crud-page', component: CrudPage },

  //CRM Function
  { path: '/crm-markeing-email', component: MKTEmail },
  { path: '/EmailMKT-FormStandard-pannel', component: EmailMKTFormStandardPannel },
  { path: '/user-list', component: UserList },

  //Project Management
  { path: '/ivc-realtor-projects', component: IVCRealtorProject },

  //Element desktop
  { path: '/element-desktop', component: ElementDesktop },

  //----------------------------------------------------------VIEW------------------------------------------------------------

  //--------------------------------------------------------Component----------------------------------------------------------

  //Component/components/IVC-Admin/Admin-MKTDigital/EmailMKT/SenderPannel.vue
  { path: '/sender-pannel', component: SenderPannel },

  {
    path: '/:pathMatch(.*)*', // Ký tự * sau (.*) để nó bắt cả các path có /
    name: 'NotFound',
    component: EmptyPage // Component hiển thị trang 404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  // 'from' giờ đã được dùng (hoặc có thể bỏ nếu không cần log)
  console.log(`[Router Guard] Navigating from ${from.fullPath} to ${to.fullPath}`)

  const currentUser = AuthService.getCurrentUser()
  const isLoggedIn = !!(currentUser && currentUser.token)
  // userIsActive được tính khi cần, dựa vào currentUser.roles
  const userIsActive = isLoggedIn && currentUser.roles && currentUser.roles.length > 0

  console.log(
    `[Router Guard] isLoggedIn: ${isLoggedIn}, userIsActive: ${userIsActive}, currentUser:`,
    currentUser ? JSON.parse(JSON.stringify(currentUser)) : null
  )
  console.log(`[Router Guard] Target route meta:`, JSON.parse(JSON.stringify(to.meta)))

  // 1. Xử lý các route không yêu cầu xác thực đặc biệt (như OAuthCallback)
  if (to.name === 'OAuthCallback') {
    console.log('[Router Guard] Allowing navigation to OAuthCallback.')
    return next()
  }

  // 2. Nếu route yêu cầu là guest (ví dụ: /login, /register)
  if (to.meta.requiresGuest) {
    if (isLoggedIn) {
      // Nếu đã đăng nhập, không cho vào trang login/register nữa, redirect đến dashboard
      console.log(
        '[Router Guard] User is logged in, attempting to access a guest page. Redirecting...'
      )
      if (userIsActive) {
        if (
          currentUser.roles.includes('ROLE_SUPER_ADMIN') ||
          currentUser.roles.some((r) => r.startsWith('ROLE_ADMIN_'))
        ) {
          return next({ name: 'AdminDashboard' })
        } else if (currentUser.roles.some((r) => r.startsWith('ROLE_MODERATOR_'))) {
          return next({ name: 'ModeratorPanel' })
        }
        return next({ name: 'UserHome' })
      } else {
        // Đã đăng nhập (có token) nhưng chưa active
        return next({ name: 'ActivateAccount' })
      }
    } else {
      // Chưa đăng nhập, cho phép vào trang guest
      console.log('[Router Guard] User is not logged in, allowing access to guest page.')
      return next()
    }
  }

  // 3. Nếu route yêu cầu xác thực (requiresAuth: true)
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, redirect về login, lưu lại trang muốn đến
      console.log('[Router Guard] Auth required, but user not logged in. Redirecting to Login.')
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    // Đã đăng nhập (isLoggedIn is true)
    // Kiểm tra xem có phải là trang ActivateAccount không
    if (to.name === 'ActivateAccount') {
      if (userIsActive) {
        // Nếu đã active rồi mà cố vào trang activate -> về home/dashboard
        console.log('[Router Guard] User is already active, redirecting from ActivateAccount.')
        return next({ name: 'UserHome' }) // Hoặc dashboard phù hợp
      } else {
        // Chưa active, cho phép vào trang activate
        console.log('[Router Guard] User is not active, allowing access to ActivateAccount.')
        return next()
      }
    }

    // Đối với các trang cần auth khác (không phải ActivateAccount)
    if (!userIsActive) {
      // Nếu chưa active, phải vào trang ActivateAccount
      console.log('[Router Guard] User not active, redirecting to ActivateAccount.')
      return next({ name: 'ActivateAccount' })
    }

    // Đã đăng nhập và đã active, kiểm tra vai trò nếu route yêu cầu
    if (to.meta.roles) {
      const userRoles = currentUser.roles || [] // Mảng roles của user
      const hasRequiredRole = to.meta.roles.some((requiredRole) => userRoles.includes(requiredRole))
      if (!hasRequiredRole) {
        console.log(
          `[Router Guard] User roles ${userRoles} do not meet required roles ${to.meta.roles}. Redirecting to NotFound (or an Unauthorized page).`
        )
        // Không có quyền, redirect về trang NotFound hoặc một trang "Unauthorized"
        return next({ name: 'NotFound' }) // Hoặc tạo route { name: 'Unauthorized', path: '/unauthorized' }
      }
    }
    // Nếu qua hết các kiểm tra, cho phép vào
    console.log('[Router Guard] All checks passed, allowing navigation.')
    return next()
  }

  // Nếu route không có meta đặc biệt (không requiresAuth, không requiresGuest)
  console.log('[Router Guard] No specific meta rules, allowing navigation.')
  next()
})

export default router
