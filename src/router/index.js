import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
// import AdminIndex from '../views/IVC-Admin/IVC-Admin-Index.vue'
import AdminDashboard from '../views/IVC-Admin/Admin-Dashboard/IVC-SupperAdmin-Dashboard.vue'
import TestBoostrap from '../components/test/TestBoostrap.vue'
import TableBasic from '../views/IVC-Admin/Admin-Dashboard/IVC-Admin-Page-Extreme/TableBasic.vue'
import Error404 from '../views/IVC-Admin/Admin-Dashboard/IVC-Admin-Page-Extreme/ErrorPage404.vue'
import IconMaterial from '../views/IVC-Admin/Admin-Dashboard/IVC-Admin-Page-Extreme/IconMaterial.vue'
import PagesProfile from '../views/IVC-Admin/Admin-Dashboard/IVC-Admin-Page-Extreme/PagesProfile.vue'
import StarterKit from '../views/IVC-Admin/Admin-Dashboard/IVC-Admin-Page-Extreme/StarterKit.vue'

//CRM Funtion
import UserRealEstateCRM from '../views/IVC-Admin/Admin-Dashboard/CrmFunction/URE-CRM.vue'
import PropertiesPage from '../views/IVC-Admin/Admin-Dashboard/CrmFunction/PropertiesPage.vue'
import MKTEmail from '../views/IVC-Admin/Admin-Dashboard/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT.vue'


//CRM Funtion
import IVCRealtorProject from '../views/IVC-Admin/Admin-Dashboard/ProjectManagement/IVCRealtorProject.vue'
import IVCCRMEmailMKTFormStandard from '../views/IVC-Admin/Admin-Dashboard/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT-ViewForm/IVC-CRM-EmailMKT-FormStandard.vue'


//Element Desktop
import ElementDesktop from '../components/Element-Desktop/ElementDesktop.vue'


//---------------------------TEST------------------------------------
//Components Test
import AxiosTest from '../components/test/AxiosTest.vue'
import GmailTest from '../components/test/GmailTest.vue'
import MKTTest from '../components/test/TestModal.vue'

//------------------------------------------------------------------


const routes = [
  { path: '/', component: Home },

  //Admin Dashboard
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/test-boostrap',
    name: 'TestBoostrap',
    component: TestBoostrap
  },
  {
    path: '/table-basic',
    name: 'TableBasic',
    component: TableBasic
  },
  {
    path: '/error-404',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/icon-material',
    name: 'IconMaterial',
    component: IconMaterial
  },
  {
    path: '/pages-profile',
    name: 'PagesProfile',
    component: PagesProfile
  },
  {
    path: '/starter-kit',
    name: 'StarterKit',
    component: StarterKit
  },


  //CRM Function
  { path: '/user-realestate-crm', component: UserRealEstateCRM },
  { path: '/properties', component: PropertiesPage },
  { path: '/crm-markeing-email', component: MKTEmail },
  { path: '/IVC-CRM-EmailMKT-FormStandard', component: IVCCRMEmailMKTFormStandard },


  //Project Management
  { path: '/ivc-realtor-projects', component: IVCRealtorProject },



  //Element desktop
  { path: '/element-desktop', component: ElementDesktop },


//---------------------------TEST------------------------------------
  //Components Test
  { path: '/axios-test', component: AxiosTest },
  { path: '/gmail-test', component: GmailTest },
  { path: '/crm-markeing-test', component: MKTTest },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
