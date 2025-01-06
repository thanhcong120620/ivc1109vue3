import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'




//CRM Funtion


//CRM Email Funtion
import IVCRealtorProject from '../views/IVC-Admin/Admin-Realtor/Admin-Realtor-ProjectManagement/IVCRealtorProject.vue'
import IVCCRMEmailMKTFormStandard from '../views/IVC-Admin/Admin-MKTDigital/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT-ViewForm/IVC-CRM-EmailMKT-FormStandard.vue'
import MKTEmail from '../views/IVC-Admin/Admin-MKTDigital/Marketing-Email/IVC-CRM-View/IVC-CRM-EmailMKT-Pannel.vue'




//Element Desktop
import ElementDesktop from '../components/Element-Desktop/ElementDesktop.vue'


//---------------------------TEST------------------------------------
//Components Test
import AxiosTest from '../components/test/AxiosTest.vue'
import GmailTest from '../components/test/GmailTest.vue'
import MKTTest from '../components/test/TestModal.vue'
import MKTEmailNeumorphism from '../components/test/IVC-CRM-EmailMKT.vue'

//------------------------------------------------------------------


const routes = [
  { path: '/', component: Home },

  //Admin Dashboard



  //CRM Function
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
  { path: '/crm-markeing-email-neumorphism', component: MKTEmailNeumorphism },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
