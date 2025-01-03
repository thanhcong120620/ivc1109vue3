<template>
    <div class="main-area col-lg-12">
      <div class="text-center">
        <h2 class="mb-4">IVC-Email Marketing</h2>
      </div>
  
      <div class="col-lg-12">
        <!-- __________________________Display Result__________________________-->
        <div class="col-lg-5" style="float: left">
          <div v-if="isFormVisible">
            <!-- Placeholder for Form-Gmail-Standard component -->
            <p>Form-Gmail-Standard would go here</p>
          </div>
        </div>
  
        <!-- __________________________Mail sending__________________________-->
        <div class="col-lg-6" style="float: right">
          <h3>Send Email</h3>
          <form @submit.prevent="submitForm" class="sendData" enctype="multipart/form-data">
            <div class="form-group">
              <!-- Upload Image -->
              <input
                type="file"
                multiple
                @change="handleFileChange"
              />
              <hr />
  
              <!-- Subject setup -->
              <label for="emailSubject">Tiêu đề mail</label>
              <input
                class="form-control"
                id="emailSubject"
                v-model="formData.subject"
                required
                type="text"
                placeholder="Nhập tiêu đề trước khi gửi"
              />
            </div>
  
            <!-- Subject Hint -->
            <h5>Thay đổi từ ngữ trong đoạn văn:</h5>
            <p>
              Sử dụng cả cụm có chứa "Mr. hoặc Ms.", ví dụ: Mr. Công: --> Thay thế bằng <b>{{ headerName }}</b>
            </p>
            <p>
              Sử dụng cả cụm xưng viết hoa, ví dụ: Anh Công: --> Thay thế bằng <b>{{ caplockName }}</b>
            </p>
            <p>
              Sử dụng cả cụm xưng, ví dụ: anh Công: --> Thay thế bằng <b>{{ normalName }}</b>
            </p>
            <p>
              Sử dụng giới tính khi xưng, ví dụ: anh ... hoặc chị ...: --> Thay thế bằng <b>{{ gender }}</b>
            </p>
            <hr />
  
            <!-- Greeting setup -->
            <div class="form-group">
              <label for="emailContent0">Greeting</label>
              <input
                class="form-control"
                id="emailContent0"
                v-model="formData.greeting"
                placeholder="Nhập câu chào, Ví dụ: Xin chào {{headerName}} !"
                required
              />
            </div>
  
            <!-- Content 1 setup -->
            <div class="form-group">
              <label for="emailContent1">Đoạn văn 1</label>
              <textarea
                class="form-control"
                id="emailContent1"
                v-model="formData.content1"
                rows="10"
                placeholder="Nhập nội dung của đoạn văn 1"
                required
              ></textarea>
            </div>
  
            <!-- Content 2 setup -->
            <div class="form-group">
              <label for="emailContent2">Đoạn văn 2</label>
              <textarea
                class="form-control"
                id="emailContent2"
                v-model="formData.content2"
                rows="10"
                placeholder="Nhập nội dung của đoạn văn 2"
                required
              ></textarea>
            </div>
  
            <!-- Content 3 setup -->
            <div class="form-group">
              <label for="emailContent3">Đoạn văn 3</label>
              <textarea
                class="form-control"
                id="emailContent3"
                v-model="formData.content3"
                rows="10"
                placeholder="Nhập nội dung của đoạn văn 3"
                required
              ></textarea>
            </div>
  
            <!-- Content 4 setup -->
            <div class="form-group">
              <label for="emailContent4">Đoạn văn 4</label>
              <textarea
                class="form-control"
                id="emailContent4"
                v-model="formData.content4"
                rows="10"
                placeholder="Nhập nội dung của đoạn văn 4"
                required
              ></textarea>
            </div>
  
            <!-- Submit setup -->
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i> Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'EmailForm',
    setup() {
      const formData = ref({
        images: [],
        subject: '',
        greeting: '',
        content1: '',
        content2: '',
        content3: '',
        content4: ''
      });
  
      const headerName = ref('Mr. Công');
      const caplockName = ref('ANH CÔNG');
      const normalName = ref('anh Công');
      const gender = ref('anh');
  
      const isFormVisible = ref(true);
  
      const handleFileChange = (event) => {
        formData.value.images = event.target.files;
      };
  
      const submitForm = () => {
        // Log form data to console for now (you can replace this with actual submission logic)
        console.log('Form submitted!', formData.value);
        // Here you can handle the form submission (e.g., send the data to the server)
      };
  
      return {
        formData,
        headerName,
        caplockName,
        normalName,
        gender,
        isFormVisible,
        handleFileChange,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  