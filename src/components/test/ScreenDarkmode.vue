<!-- Giải thích code:
- darkModeClass computed property: Thay vì sử dụng :class="{ 'dark': isDarkMode }", chúng ta sử dụng computed property darkModeClass để 
thêm hoặc loại bỏ lớp app-dark. Lớp này sẽ được thêm vào thẻ <html> để kích hoạt chế độ tối.
- Nếu isDarkMode là true, chúng ta thêm lớp app-dark vào thẻ html.
- Nếu isDarkMode là false, chúng ta xóa lớp app-dark.
- toggleDarkMode method: Khi người dùng nhấn vào nút, phương thức này sẽ đảo ngược giá trị của isDarkMode và lưu trạng thái vào 
localStorage. Điều này giúp ứng dụng nhớ trạng thái chế độ sáng/tối giữa các lần tải lại trang.
- mounted hook: Kiểm tra trạng thái chế độ tối khi trang được tải và áp dụng lớp app-dark nếu cần.
- watch: Theo dõi sự thay đổi của isDarkMode. Mỗi khi giá trị thay đổi, chúng ta sẽ thêm hoặc xóa lớp app-dark vào thẻ html. 

-->

<template>
  <div :class="darkModeClass">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="flex items-center justify-center h-full">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">
            Dark Mode Example
          </h1>
          <p class="text-center text-gray-600 dark:text-gray-300 mt-4">
            This is an example of how to toggle dark mode in Vue with Tailwind CSS.
          </p>
          <button
            @click="toggleDarkMode"
            class="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Khai báo trạng thái chế độ tối
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

// Tính toán class cho chế độ tối
const darkModeClass = computed(() => (isDarkMode.value ? 'app-dark' : ''))

// Hàm chuyển đổi trạng thái chế độ tối
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
}

// Kiểm tra chế độ tối khi component được mount
onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('app-dark')
  }
})

// Theo dõi sự thay đổi của isDarkMode và cập nhật lớp
watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('app-dark')
  } else {
    document.documentElement.classList.remove('app-dark')
  }
})
</script>

<style scoped>
/* Các style tùy chỉnh nếu cần */
</style>
