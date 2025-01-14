<template>
  <div class="relative max-w-4xl mx-auto">
    <!-- Carousel -->
    <div class="overflow-hidden rounded-lg">
      <div class="flex transition-transform duration-500" :style="carouselStyle">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          alt="Carousel Image"
          class="w-full object-cover"
        />
      </div>
    </div>

    <!-- Previous and Next Buttons -->
    <button
      @click="prevImage"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md"
    >
      &lt;
    </button>
    <button
      @click="nextImage"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md"
    >
      &gt;
    </button>

    <!-- Dots navigation -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <div
        v-for="(image, index) in images"
        :key="index"
        @click="goToImage(index)"
        class="w-3 h-3 rounded-full bg-white cursor-pointer"
        :class="{ 'bg-gray-500': index !== currentIndex }"
      ></div>
    </div>
  </div>
</template>

<script setup>
// Import các hàm cần thiết từ Vue
import { ref, computed } from 'vue'

// Import các hình ảnh từ thư mục assets
import ButtonImage1 from '@/assets/images/ButtonImage1.png'
import ButtonImage2 from '@/assets/images/ButtonImage2.png'
import ButtonImage3 from '@/assets/images/ButtonImage1.png'

// Mảng chứa các hình ảnh
const images = [{ src: ButtonImage1 }, { src: ButtonImage2 }, { src: ButtonImage3 }]

// Lưu trữ chỉ số của hình ảnh hiện tại
const currentIndex = ref(0)

// Chuyển đến hình ảnh tiếp theo
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

// Chuyển đến hình ảnh trước đó
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

// Đi đến một hình ảnh cụ thể khi người dùng nhấp vào dot
const goToImage = (index) => {
  currentIndex.value = index
}

// Tính toán vị trí của carousel để chuyển hình ảnh
const carouselStyle = computed(() => {
  return `transform: translateX(-${currentIndex.value * 100}%)`
})
</script>

<style scoped>
/* Optional: Add styles for the carousel */
</style>
