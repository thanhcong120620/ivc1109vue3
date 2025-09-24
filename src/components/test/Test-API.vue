<template>
  <div class="api-section">
    <h2>Dữ liệu từ API '/api/crm/hello':</h2>
    <p v-if="loadingHello">Đang tải dữ liệu...</p>
    <p v-else-if="errorHello" style="color: red">Lỗi: {{ errorHello }}</p>
    <p v-else class="api-data">{{ helloMessage }}</p>
  </div>

  <div class="api-section">
    <h2>Dữ liệu từ API '/api/crm/items':</h2>
    <p v-if="loadingItems">Đang tải dữ liệu...</p>
    <p v-else-if="errorItems" style="color: red">Lỗi: {{ errorItems }}</p>
    <ul v-else class="item-list">
      <li v-for="item in items" :key="item.id">ID: {{ item.id }}, Tên: {{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// BƯỚC 1: Import service bạn vừa tạo
import CrmApiService from '@/api/services/CrmApiService.js' // Sử dụng alias '@' cho /src

// Các ref để lưu trữ dữ liệu và trạng thái vẫn giữ nguyên
const helloMessage = ref('Chưa có dữ liệu')
const items = ref([])
const loadingHello = ref(true)
const errorHello = ref(null)
const loadingItems = ref(true)
const errorItems = ref(null)

// BƯỚC 2: Viết lại hàm fetch, sử dụng service
const fetchHelloData = async () => {
  try {
    // Gọi hàm từ service, code trở nên cực kỳ rõ ràng
    const response = await CrmApiService.getHelloMessage()
    // axios tự động parse JSON, dữ liệu nằm trong response.data
    helloMessage.value = response.data.message
  } catch (err) {
    // Bắt lỗi từ axios, có thể lấy thông điệp lỗi chi tiết hơn
    errorHello.value = err.response?.data?.message || err.message
    console.error('Lỗi khi gọi API /api/crm/hello:', err)
  } finally {
    loadingHello.value = false
  }
}

// BƯỚC 3: Làm tương tự cho hàm fetch items
const fetchItemsData = async () => {
  try {
    const response = await CrmApiService.getItems()
    items.value = response.data.data // Dữ liệu nằm trong response.data.data
  } catch (err) {
    errorItems.value = err.response?.data?.message || err.message
    console.error('Lỗi khi gọi API /api/crm/items:', err)
  } finally {
    loadingItems.value = false
  }
}

// Khi component được mount, gọi các hàm fetch data
onMounted(() => {
  fetchHelloData()
  fetchItemsData()
})
</script>

<style scoped>
/* Style không có gì thay đổi */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  color: #42b983;
}

.api-section {
  border: 1px solid #eee;
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.api-data {
  font-weight: bold;
  color: #35495e;
}

.item-list {
  list-style-type: none;
  padding: 0;
}

.item-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  padding: 8px 15px;
  border-radius: 4px;
}
</style>
