<template>
    <div>
      <h1>Vue.js 3 với Spring Boot</h1>
      <form @submit.prevent="sendData">
        <label for="name">Name:</label>
        <input type="text" v-model="formData.name" id="name" />
  
        <label for="email">Email:</label>
        <input type="email" v-model="formData.email" id="email" />
  
        <button type="submit">Gửi Dữ Liệu</button>
      </form>
  
      <div v-if="response">
        <h2>Kết Quả Phản Hồi:</h2>
        <pre>{{ response }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          name: "",
          email: "",
        },
        response: null,
      };
    },
    methods: {
      async sendData() {
        try {
          const res = await axios.post("http://localhost:8081/api/send", this.formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          this.response = res.data; // Lưu kết quả phản hồi
        } catch (error) {
          console.error("Error:", error);
          this.response = error.response?.data || "Có lỗi xảy ra!";
        }
      },
    },
  };
  </script>
  
  <style>
  form {
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin: 10px 0 5px;
  }
  input {
    padding: 5px;
    margin-bottom: 10px;
    width: 300px;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  