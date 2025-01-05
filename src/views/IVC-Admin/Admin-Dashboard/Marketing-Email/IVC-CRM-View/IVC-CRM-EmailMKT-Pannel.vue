<template>
  <div class="main-area col-lg-12">
    <div class="container">
      <h2 class="mb-4 text-center">IVC-Email Marketing</h2>
      <div class="row">
        <div class="col-lg-8">
          <h3>Customer List</h3>
          <button class="btn btn-success mb-3" @click="addCustomer">
            <i class="fas fa-plus"></i> Add Customer
          </button>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.fullName }}</td>
                <td>{{ customer.gmail }}</td>
                <td>{{ customer.genderUser }}</td>
                <td>
                  <button @click="editCustomer(customer.id)" class="btn btn-primary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Hiển thị thông báo nếu không có khách hàng -->
          <div v-if="customers.length === 0" class="alert alert-info">
            No customers found.
          </div>
          
          <!-- Hiển thị thông báo lỗi nếu có lỗi khi gọi API -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CustomerList',
  setup() {
    const customers = ref([]);  // Lưu trữ dữ liệu khách hàng
    const errorMessage = ref('');  // Lưu trữ thông báo lỗi

    // Hàm gọi API để lấy danh sách khách hàng
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/crm-emailMKT-pannel');
        // Kiểm tra dữ liệu và gán cho customers
        if (response.data.status === 'success' && response.data.userResponse) {
          customers.value = response.data.userResponse.userCustomer;  // Lấy dữ liệu từ userResponse.userCustomer
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        errorMessage.value = 'Error fetching customers: ' + (error.response ? error.response.data : error.message);
        console.error('Error fetching customers:', error);
      }
    };

    // Gọi fetchCustomers khi component được mounted
    onMounted(fetchCustomers);

    // Hàm add customer (chưa triển khai logic chi tiết)
    const addCustomer = () => {
      console.log('Add customer button clicked');
    };

    // Hàm edit customer (chưa triển khai logic chi tiết)
    const editCustomer = (customerId) => {
      console.log('Edit customer with id:', customerId);
    };

    return {
      customers,
      errorMessage,
      addCustomer,
      editCustomer,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
