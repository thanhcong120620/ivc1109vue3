import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
// import AdminIndex from '../views/IVC-Admin/IVC-Admin-Index.vue'
import AdminDashboard from '../views/IVC-Admin/Admin-Dashboard/IVC-SupperAdmin-Dashboard.vue'
import TestBoostrap from '../components/test/TestBoostrap.vue'
import TableBasic from '../components/IVC-Admin/IVC-Admin-Page-Extreme/TableBasic.vue'
import Error404 from '../components/IVC-Admin/IVC-Admin-Page-Extreme/ErrorPage404.vue'
import IconMaterial from '../components/IVC-Admin/IVC-Admin-Page-Extreme/IconMaterial.vue'
import PagesProfile from '../components/IVC-Admin/IVC-Admin-Page-Extreme/PagesProfile.vue'
import StarterKit from '../components/IVC-Admin/IVC-Admin-Page-Extreme/StarterKit.vue'

//CRM Funtion
import UserRealEstateCRM from '../views/IVC-Admin/Admin-Dashboard/CrmFunction/URE-CRM.vue'
import PropertiesPage from '../views/IVC-Admin/Admin-Dashboard/CrmFunction/PropertiesPage.vue'

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

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
