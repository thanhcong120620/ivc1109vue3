<template>
    <div id="app">
      <h1>Quản lý danh sách khách hàng</h1>
      
      <!-- Nút thêm khách hàng -->
      <button @click="openForm" v-if="!isFormVisible">Thêm mới khách hàng</button>
      
      <!-- Overlay hiển thị form -->
      <div v-if="isFormVisible" class="overlay" @click="cancelForm">
        <div class="form-container" @click.stop>
          <h2>Thêm khách hàng mới</h2>
          <form @submit.prevent="addCustomer">
            <label for="name">Tên:</label>
            <input v-model="newCustomer.name" type="text" id="name" required />
            
            <label for="email">Email:</label>
            <input v-model="newCustomer.email" type="email" id="email" required />
            
            <label for="phone">Số điện thoại:</label>
            <input v-model="newCustomer.phone" type="text" id="phone" required />
            
            <button type="submit">Lưu</button>
            <button @click="cancelForm" type="button">Hủy</button>
          </form>
        </div>
      </div>
  
      <!-- Danh sách khách hàng -->
      <h2>Danh sách khách hàng</h2>
      <ul>
        <li v-for="(customer, index) in customers" :key="index">
          {{ customer.name }} - {{ customer.email }} - {{ customer.phone }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [
          { name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789' },
          { name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321' },
        ],
        newCustomer: {
          name: '',
          email: '',
          phone: '',
        },
        isFormVisible: false,
      };
    },
    methods: {
      openForm() {
        this.isFormVisible = true;
      },
      cancelForm() {
        this.isFormVisible = false;
        this.resetForm();
      },
      resetForm() {
        this.newCustomer.name = '';
        this.newCustomer.email = '';
        this.newCustomer.phone = '';
      },
      addCustomer() {
        if (this.newCustomer.name && this.newCustomer.email && this.newCustomer.phone) {
          this.customers.push({ ...this.newCustomer });
          this.resetForm();
          this.isFormVisible = false;
        } else {
          alert('Vui lòng điền đầy đủ thông tin!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style cho trang quản lý khách hàng */
  #app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  button {
    margin: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button[type="button"] {
    background-color: #f44336;
  }
  
  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
    max-width: 300px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f1f1f1;
  }
  
  /* Overlay style */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-top: 0;
  }
  
  button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  
  button[type="button"] {
    background-color: #f44336;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
  }
  
  input {
    margin-bottom: 10px;
  }
  </style>
  