<template>
    <div>
      <h1>Gửi Dữ Liệu Qua API</h1>
      <form @submit.prevent="sendMailAll">
        <label for="subject">Subject:</label>
        <input type="text" v-model="formData.subjectA" id="subject" />
  
        <label for="paragraph0">Paragraph 0:</label>
        <textarea v-model="formData.paragraph0" id="paragraph0"></textarea>
  
        <label for="paragraph1">Paragraph 1:</label>
        <textarea v-model="formData.paragraph1" id="paragraph1"></textarea>
  
        <label for="paragraph2">Paragraph 2:</label>
        <textarea v-model="formData.paragraph2" id="paragraph2"></textarea>
  
        <label for="paragraph3">Paragraph 3:</label>
        <textarea v-model="formData.paragraph3" id="paragraph3"></textarea>
  
        <label for="paragraph4">Paragraph 4:</label>
        <textarea v-model="formData.paragraph4" id="paragraph4"></textarea>
  
        <label for="images">Upload Images:</label>
        <input type="file" id="images" multiple @change="handleFileUpload" />
  
        <button type="submit">Send Data</button>
      </form>
  
      <div v-if="response">
        <h2>Server Response:</h2>
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
          subjectA: "",
          paragraph0: "",
          paragraph1: "",
          paragraph2: "",
          paragraph3: "",
          paragraph4: "",
        },
        images: [],
        response: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.images = event.target.files; // Lưu danh sách file vào biến `images`
      },
      async sendMailAll() {
        try {
          // Tạo đối tượng FormData để gửi dữ liệu bao gồm file
          const data = new FormData();
          data.append("subjectA", this.formData.subjectA);
          data.append("paragraph0", this.formData.paragraph0);
          data.append("paragraph1", this.formData.paragraph1);
          data.append("paragraph2", this.formData.paragraph2);
          data.append("paragraph3", this.formData.paragraph3);
          data.append("paragraph4", this.formData.paragraph4);
  
          // Append các file hình ảnh
          Array.from(this.images).forEach((file, index) => {
            console.log(`File ${index + 1}: ${file.name}`);
            data.append("images", file);
          });
  
          // Gửi POST request đến backend Spring Boot
          const res = await axios.post(
            "http://localhost:8081/api/send-all-gmailformstandard",
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          // Lưu phản hồi từ server
          this.response = res.data;
        } catch (error) {
          console.error("Error:", error);
          this.response = error.response?.data || "An error occurred!";
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
  input,
  textarea {
    padding: 5px;
    margin-bottom: 10px;
    width: 100%;
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
  