<template>
  <body class="  ">
    <!-- loader Start -->
    <!--<div id="loading">
      <div id="loading-center"></div>
    </div>-->
    <!-- loader END -->
    <!-- Wrapper Start -->
    <div class="wrapper">
      <!-- Left Nav start -->
      <AdminNavLeft />

      <!-- Top Nav start -->
      <AdminNavTop />

      <!-- Right Nav start -->
      <AdminNavRight />

      <!-- Content Admin Index start -->
      <AdminContent />

      <!-- Bottom Nav start -->
    </div>
    <!-- Wrapper End-->
    <AdminNavBottom />
  </body>
</template>

<script setup>
import AdminNavLeft from '../../components/IVC-Admin/IVC-Admin-Navigation/IVC-Admin-NavLeft.vue'
import AdminNavTop from '../../components/IVC-Admin/IVC-Admin-Navigation/IVC-Admin-NavTop.vue'
import AdminNavRight from '../../components/IVC-Admin/IVC-Admin-Navigation/IVC-Admin-NavRight.vue'
import AdminContent from '../../components/IVC-Admin/IVC-Admin-Content/IVC-Admin-AdminMainContent.vue'
import AdminNavBottom from '../../components/IVC-Admin/IVC-Admin-Navigation/IVC-Admin-NavBottom.vue'
</script>

<style scoped>
@import '../../assets/css/css-AdminSystem/libs.min.css';
@import '../../assets/css/css-AdminSystem/socialv.css';
@import '../../assets/vendor/vendor-AdminSystem/@fortawesome/fontawesome-free/css/all.min.css';
@import '../../assets/vendor/vendor-AdminSystem/remixicon/fonts/remixicon.css';
@import '../../assets/vendor/vendor-AdminSystem/vanillajs-datepicker/dist/css/datepicker.min.css';
@import '../../assets/vendor/vendor-AdminSystem/line-awesome/dist/font-awesome-line-awesome/css/all.min.css';
@import '../../assets/vendor/vendor-AdminSystem/line-awesome/dist/line-awesome/css/line-awesome.min.css';
</style>
