<template>
  <div class="container-fluid">
    <header
      class="top-bar bg-success text-white text-center p-3 d-flex justify-content-between align-items-center"
    >
      <h1 class="m-0">Tiêu đề Website</h1>
      <div class="hamburger-icon" @click="toggleLeftBar">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
    <div class="row flex-grow-1">
      <!-- Left Bar -->
      <nav class="col-md-2 col-lg-2 left-bar bg-light" v-if="isLeftBarVisible">
        <ul class="list-unstyled p-3">
          <li><a href="#">Liên kết 1</a></li>
          <li><a href="#">Liên kết 2</a></li>
          <li><a href="#">Liên kết 3</a></li>
        </ul>
      </nav>

      <!-- Nội dung chính -->
      <main class="col-md-8 col-lg-8 content p-3">
        <h2>Nội dung chính</h2>
        <p>Đây là phần nội dung chính của website.</p>
      </main>

      <!-- Right Bar -->
      <aside class="col-md-2 col-lg-2 right-bar bg-light p-3">
        <h3>Thông tin bổ sung</h3>
        <p>Nội dung bên phải.</p>
      </aside>
    </div>

    <!-- Footer -->
    <footer class="footer bg-dark text-white text-center p-3">
      <p>Bản quyền © 2024</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isLeftBarVisible = ref(true)
const isMobile = ref(false)

const toggleLeftBar = () => {
  isLeftBarVisible.value = !isLeftBarVisible.value
}

const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    // Tự động tắt Left Bar nếu ở mobile
    isLeftBarVisible.value = false
  }
}

onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDevice)
})
</script>

<style scoped>
.hamburger-icon {
  cursor: pointer;
  display: inline-block;
}

.hamburger-icon div {
  width: 30px;
  height: 4px;
  background-color: white;
  margin: 5px 0;
}

.footer {
  position: relative;
}
</style>
