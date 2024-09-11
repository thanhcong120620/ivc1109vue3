<template>
  <div>
    <div class="supper-admin-dashboard">
      <!-- ============================================================== -->
      <!-- Preloader - style you can find in spinners.css -->
      <!-- <div class="preloader">
        <div class="lds-ripple">
          <div class="lds-pos"></div>
          <div class="lds-pos"></div>
        </div>
      </div> -->
      <!-- ============================================================== -->
      <!-- Main wrapper - style you can find in pages.scss -->
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <TopBar />

        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <AsideLeft />

        <!-- Page wrapper  -->
        <PageWarper />
      </div>
      <!-- ============================================================== -->
      <!-- End Wrapper -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- All Jquery -->
      <!-- ============================================================== -->
      <!-- <script src="../../assets/libs/jquery/dist/jquery.min.js"></script> -->
      <!-- Bootstrap tether Core JavaScript -->
      <!-- <script src="../../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script> -->
      <!-- <script src="../../dist/js/app-style-switcher.js"></script> -->
      <!--Wave Effects -->
      <!-- <script src="../../dist/js/waves.js"></script> -->
      <!--Menu sidebar -->
      <!-- <script src="../../dist/js/sidebarmenu.js"></script> -->
      <!--Custom JavaScript -->
      <!-- <script src="../../dist/js/custom.js"></script> -->
      <!--This page JavaScript -->
      <!--chartis chart-->
      <!-- <script src="../../assets/libs/chartist/dist/chartist.min.js"></script> -->
      <!-- <script src="../../assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js"></script> -->
      <!-- <script src="../../dist/js/pages/dashboards/dashboard1.js"></script> -->
    </div>
  </div>
</template>

<script setup>
import AsideLeft from '@/views/IVC-Admin/Admin-Dashboard/AsideLeft.vue'
import PageWarper from '@/views/IVC-Admin/Admin-Dashboard/PageWraper.vue'
import TopBar from '@/views/IVC-Admin/Admin-Dashboard/TopBarExtreme.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const sidebarClass = ref('')
// const iconClass = ref('ti-menu');
const isPreloading = ref(true)
// const isSearchVisible = ref(false);

// const toggleSidebar = () => {
//   sidebarClass.value = sidebarClass.value === 'show-sidebar' ? '' : 'show-sidebar';
//   iconClass.value = iconClass.value === 'ti-menu' ? 'ti-close' : 'ti-menu';
// };

// const toggleSearch = () => {
//   isSearchVisible.value = !isSearchVisible.value;
// };

const setSidebarType = () => {
  const width = window.innerWidth || document.documentElement.clientWidth
  sidebarClass.value = width < 1170 ? 'mini-sidebar' : 'full'
}

onMounted(() => {
  setSidebarType()
  window.addEventListener('resize', setSidebarType)
  isPreloading.value = false // Hide preloader after mounting
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setSidebarType)
})
</script>

<style scoped>
/* <!-- Favicon icon --> */
/* <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/favicon.png"> */
/* <!-- Custom CSS --> */
@import '../../../assets/css/css-AdminSystem/SupperAdmin/chartist.min.css';
/* <!-- Custom CSS --> */
@import '../../../assets/css/css-AdminSystem/SupperAdmin/style.min.css';

/* 
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// --> */
/* <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]--> */

/* Preload */
/* @import '../../../assets/css/css-AdminSystem/SupperAdmin/spinner.css'; */
</style>
