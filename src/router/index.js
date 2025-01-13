import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'


//---------------------------TEST------------------------------------
//Components Test
import AxiosTest from '../components/test/AxiosTest.vue'
import GmailTest from '../components/test/GmailTest.vue'
import MKTTest from '../components/test/TestModal.vue'
import TestChart from '../components/test/TestChart.vue'
import MKTEmailNeumorphism from '../components/test/IVC-CRM-EmailMKT.vue'
import SenderPannel from '../components/IVC-Admin/Admin-MKTDigital/EmailMKT/SenderPannel.vue'

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







//_____________________________________________________________________________________________________________________________________


const routes = [
  { path: '/', component: Home },

  //Admin Dashboard


//-----------------------------------------------------------TEST--------------------------------------------------------
  //Components Test
  { path: '/axios-test', component: AxiosTest },
  { path: '/gmail-test', component: GmailTest },
  { path: '/test-chart', component: TestChart },
  { path: '/crm-markeing-test', component: MKTTest },
  { path: '/crm-markeing-email-neumorphism', component: MKTEmailNeumorphism },
  { path: '/test-user-list', component: UserList },


  //Components unit-kit
  { path: '/button-doc', component: ButtonDoc },
  { path: '/chart-doc', component: ChartDoc },
  { path: '/file-doc', component: FileDoc },
  { path: '/form-layout', component: FormLayout },
  { path: '/input-doc', component: InputDoc }, //đang bị lỗi css so với Sakai
  { path: '/list-doc', component: ListDoc },
  { path: '/media-doc', component: MediaDoc },
  { path: '/menu-doc', component: MenuDoc },  //đang bị lỗi css so với Sakai
  { path: '/message-doc', component: MessagesDoc }, 
  { path: '/misc-doc', component: MiscDoc }, 
  { path: '/overlay-doc', component: OverlayDoc },  //Cần cài lại API, Sakai cũng bị lỗi API
  { path: '/pannels-doc', component: PanelsDoc }, //đang bị lỗi css so với Sakai  //đang bị lỗi toast và dữ liệu với services, cần đối chiếu với sakai để test lại
  { path: '/table-doc', component: TableDoc }, //Cần cài lại API, Sakai cũng bị lỗi API
  { path: '/timeline-doc', component: TimelineDoc },
  { path: '/tree-doc', component: TreeDoc },
  


  //CRM Function
  { path: '/crm-markeing-email', component: MKTEmail },
  { path: '/EmailMKT-FormStandard-pannel', component: EmailMKTFormStandardPannel },

  //Project Management
  { path: '/ivc-realtor-projects', component: IVCRealtorProject },

  //Element desktop
  { path: '/element-desktop', component: ElementDesktop },





//----------------------------------------------------------VIEW------------------------------------------------------------ 







//--------------------------------------------------------Component----------------------------------------------------------  

  //Component/components/IVC-Admin/Admin-MKTDigital/EmailMKT/SenderPannel.vue
  { path: '/sender-pannel', component: SenderPannel },





]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
