<template>
  <div :class="['right-sidebar-mini', { 'right-sidebar': sidebarOpen }]">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-3" data-scrollbar="init">
            <div v-for="(user, index) in users" :key="index" class="d-flex align-items-center mb-4">
              <div :class="['iq-profile-avatar', user.status]">
                <img class="rounded-circle avatar-50" :src="user.avatar" :alt="user.name" />
              </div>
              <div class="ms-3">
                <h6 class="mb-0">{{ user.name }}</h6>
                <p class="mb-0">{{ user.role }}</p>
              </div>
            </div>
          </div>
          <div class="right-sidebar-toggle bg-primary text-white mt-3" @click="toggleSidebar">
            <i class="ri-arrow-left-line side-left-icon"></i>
            <i class="ri-arrow-right-line side-right-icon">
              <span class="ms-3 d-inline-block">Close Menu</span>
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const users = [
  {
    name: 'Anna Sthesia',
    role: 'Just Now',
    avatar: '../assets/images/user/01.jpg',
    status: 'status-online'
  },
  {
    name: 'Paul Molive',
    role: 'Admin',
    avatar: '../assets/images/user/02.jpg',
    status: 'status-online'
  },
  {
    name: 'Anna Mull',
    role: 'Admin',
    avatar: '../assets/images/user/03.jpg',
    status: 'status-online'
  },
  {
    name: 'Paige Turner',
    role: 'Admin',
    avatar: '../assets/images/user/04.jpg',
    status: 'status-online'
  },
  {
    name: 'Bob Frapples',
    role: 'Admin',
    avatar: '../assets/images/user/11.jpg',
    status: 'status-online'
  },
  {
    name: 'Barb Ackue',
    role: 'Admin',
    avatar: '../assets/images/user/02.jpg',
    status: 'status-online'
  },
  {
    name: 'Greta Life',
    role: 'Admin',
    avatar: '../assets/images/user/03.jpg',
    status: 'status-online'
  },
  {
    name: 'Ira Membrit',
    role: 'Admin',
    avatar: '../assets/images/user/12.jpg',
    status: 'status-away'
  },
  {
    name: 'Pete Sariya',
    role: 'Admin',
    avatar: '../assets/images/user/01.jpg',
    status: 'status-away'
  },
  { name: 'Monty Carlo', role: 'Admin', avatar: '../assets/images/user/02.jpg', status: '' }
]
</script>

<style scoped>
@import '../../../assets/css/css-AdminSystem/libs.min.css';
@import '../../../assets/css/css-AdminSystem/socialv.css';
@import '../../../assets/vendor/vendor-AdminSystem/@fortawesome/fontawesome-free/css/all.min.css';
@import '../../../assets/vendor/vendor-AdminSystem/remixicon/fonts/remixicon.css';
@import '../../../assets/vendor/vendor-AdminSystem/vanillajs-datepicker/dist/css/datepicker.min.css';
@import '../../../assets/vendor/vendor-AdminSystem/line-awesome/dist/font-awesome-line-awesome/css/all.min.css';
@import '../../../assets/vendor/vendor-AdminSystem/line-awesome/dist/line-awesome/css/line-awesome.min.css';
</style>
