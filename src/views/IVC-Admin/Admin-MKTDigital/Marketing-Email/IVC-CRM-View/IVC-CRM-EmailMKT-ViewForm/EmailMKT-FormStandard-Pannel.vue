<template>
  <div class="container mx-auto p-4">
    <div class="main-content flex flex-wrap">
      <!-- Model content on the left -->
      <div class="model mb-8 flex-1 pr-4">
        <div class="email-container">
          <div class="header">
            <!-- Logo hoặc hình ảnh có thể được thêm vào ở đây -->
          </div>
          <div class="content">
            <!-- Greeting -->
            <h3>{{ formData.greeting || paragraph0 }}</h3>
            <div style="height: 20px"></div>

            <!-- 1 image, 1 para, 1 para -->
            <div class="section glass">
              <!-- Hiển thị hình ảnh đầu tiên nếu có -->
              <div v-if="formData.imageURLs[0]">
                <img :src="formData.imageURLs[0]" alt="Hình ảnh 1" />
              </div>
              <!-- Hiển thị hình ảnh mặc định nếu chưa có -->
              <div v-else>
                <img src="https://images.unsplash.com/photo-1506748686219-2efb90e8e9fb" alt="Hình ảnh mặc định 1" />
              </div>
              <div style="height: 20px"></div>
              <p>{{ formData.content1 || paragraph1 }}</p>
              <br /><br />
              <p>{{ formData.content2 || paragraph2 }}</p>
            </div>

            <div style="height: 20px"></div>

            <!-- 1 image, 1 para, 1 image, 1 para -->
            <div class="section glass">
              <!-- Hiển thị hình ảnh thứ hai nếu có -->
              <div v-if="formData.imageURLs[1]">
                <img :src="formData.imageURLs[1]" alt="Hình ảnh 2" />
              </div>
              <!-- Hiển thị hình ảnh mặc định nếu chưa có -->
              <div v-else>
                <img src="https://images.unsplash.com/photo-1514634957903-4d9fcbf0f6da" alt="Hình ảnh mặc định 2" />
              </div>
              <p>{{ formData.content3 || paragraph3 }}</p>
              <div style="height: 20px"></div>
              <!-- Hiển thị hình ảnh thứ ba nếu có -->
              <div v-if="formData.imageURLs[2]">
                <img :src="formData.imageURLs[2]" alt="Hình ảnh 3" />
              </div>
              <!-- Hiển thị hình ảnh mặc định nếu chưa có -->
              <div v-else>
                <img src="https://images.unsplash.com/photo-1506748686219-2efb90e8e9fb" alt="Hình ảnh mặc định 3" />
              </div>
              <p>{{ formData.content4 || paragraph4 }}</p>
            </div>

            <!-- Contact -->
            <a href="https://zalo.me/0931901206" target="_blank" class="golden-btn">Liên hệ ngay</a>
          </div>
          <div class="footer">
            <p>NGUYỄN THÀNH CÔNG | Bất động sản cao cấp Đà Nẵng | Điện thoại: 0931 901 206</p>
          </div>
        </div>
      </div>

      <!-- Sender content on the right -->
      <div class="sender bg-white shadow-md rounded-lg p-6 flex-1">
        <div class="md:w-1/2 mb-6 md:mb-0">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Send Email</h3>
          <form @submit.prevent="submitForm" class="space-y-4">
            <h5 class="text-lg text-gray-700">Thay đổi từ ngữ trong đoạn văn:</h5>
            <p v-html="'Sử dụng cả cụm có chứa Mr. hoặc Ms., ví dụ: Mr. Công: ==> Thay thế bằng <b>{{headerName}}</b>'"></p>
            <p v-html="'Sử dụng cả cụm xưng viết hoa, ví dụ: Anh Công: ==> Thay thế bằng <b>{{caplockName}}</b>'"></p>
            <p v-html="'Sử dụng cả cụm xưng, ví dụ: anh Công: ==> Thay thế bằng <b>{{normalName}}</b>'"></p>
            <p v-html="'Sử dụng giới tính khi xưng, ví dụ: anh ... hoặc chị ...: ==> Thay thế bằng <b>{{gender}}</b>'"></p>
            <hr />

            <!-- Greeting setup -->
            <div class="form-group">
              <label for="emailContent0" class="text-sm font-medium text-gray-600">Greeting</label>
              <input
                class="form-control w-full border border-gray-300 rounded-md p-2 mt-1"
                id="emailContent0"
                v-model="formData.greeting"
                placeholder="Nhập câu chào, Ví dụ: Xin chào {{headerName}} !"
                required
              />
            </div>

            <!-- Content setup -->
            <div v-for="(content, index) in ['content1', 'content2', 'content3', 'content4']" :key="index" class="form-group">
              <label :for="'emailContent' + (index + 1)" class="text-sm font-medium text-gray-600">{{ 'Đoạn văn ' + (index + 1) }}</label>
              <textarea
                :id="'emailContent' + (index + 1)"
                class="form-control w-full border border-gray-300 rounded-md p-2 mt-1"
                v-model="formData[content]"
                rows="4"
                placeholder="Nhập nội dung của đoạn văn {{ index + 1 }}"
                required
              ></textarea>
            </div>

            <!-- File upload -->
            <div class="form-group">
              <label for="fileUpload" class="text-sm font-medium text-gray-600">Chọn hình ảnh</label>
              <input type="file" multiple @change="handleFileChange" class="border border-gray-300 rounded-md p-2 w-full mt-1" />
            </div>

            <!-- Subject setup -->
            <div class="form-group">
              <label for="emailSubject" class="text-sm font-medium text-gray-600">Tiêu đề mail</label>
              <input
                class="form-control w-full border border-gray-300 rounded-md p-2 mt-1"
                id="emailSubject"
                v-model="formData.subject"
                required
                type="text"
                placeholder="Nhập tiêu đề trước khi gửi"
              />
            </div>

            <hr />
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition duration-300">
              <i class="fas fa-paper-plane mr-2"></i> Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Ensure axios is installed

// Default email content
const paragraph0 = ref("Xin chào Mr. ABC !");
const paragraph1 = ref("Đoạn văn thu hút người đọc.");
const paragraph2 = ref("Giải thích lý do lại sao.");
const paragraph3 = ref("Hãy khám phá thêm về các tiện ích và thông tin chi tiết");
const paragraph4 = ref("Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí!");

// Form data
const formData = ref({
  images: [],
  imageURLs: [],
  subject: '',
  greeting: '',
  content1: '',
  content2: '',
  content3: '',
  content4: ''
});

// Handle file changes
const handleFileChange = (event) => {
  const files = event.target.files;
  formData.value.images = files;
  formData.value.imageURLs = Array.from(files).map(file => URL.createObjectURL(file));
};

// Submit form data
const submitForm = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('subject', formData.value.subject);
    formDataToSend.append('greeting', formData.value.greeting);
    formDataToSend.append('content1', formData.value.content1);
    formDataToSend.append('content2', formData.value.content2);
    formDataToSend.append('content3', formData.value.content3);
    formDataToSend.append('content4', formData.value.content4);

    // Append images to formData
    formData.value.images.forEach((file, index) => {
      formDataToSend.append(`image${index}`, file);
    });

    const response = await axios.post('https://api.yourserver.com/send-email', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Email sent successfully!', response.data);
    alert('Email đã được gửi thành công!');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Đã xảy ra lỗi khi gửi email.');
  }
};
</script>

<style scoped>
/* Flexbox for the main layout */
.main-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.model {
  flex: 1;
  padding-right: 20px; /* Khoảng cách bên phải */
}

.sender {
  flex: 2; /* Tăng độ rộng của div sender */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Khoảng cách giữa các phần tử */
}

.container {
  max-width: 100%;
  padding: 0 20px;
}

h3 {
  color: #333;
  font-size: 1.5rem;
}

h5 {
  color: #555;
  font-size: 1.125rem;
}

.form-group label {
  font-size: 1rem;
  color: #444;
}



button {
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  padding: 12px;
}

button:hover {
  background-color: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sender, .model {
    flex: 1 100%; /* Stacked layout for small screens */
  }

  .sender {
    padding: 15px;
  }

  .form-group {
    width: 100%;
  }
}


/* -------------- STYLE CHO .model -------------- */
  .model {
    flex: 2; /* Tăng độ rộng của div sender */
    width: 100%;
    padding-right: 20px; /* Khoảng cách bên phải */
  }
  
  .email-container {
    width: 100%;
    max-width: 600px; /* Giới hạn chiều rộng của email container */
    margin: 20px auto;
    padding: 0;
    border: 2px solid #d4af37;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 1%, transparent 1%),
      radial-gradient(circle, rgba(255, 215, 0, 0.2) 2%, transparent 2%),
      radial-gradient(circle, rgba(255, 215, 0, 0.2) 3%, transparent 3%),
      radial-gradient(circle, rgba(255, 215, 0, 0.2) 4%, transparent 4%), white;
    background-size: 20px 20px, 40px 40px, 60px 60px, 80px 80px, 100% 100%;
    background-blend-mode: multiply;
  }
  
  .glass {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 40px;
    color: #333;
  }
  
  .header {
    text-align: center;
    padding: 10px;
    background-color: #030303;
    color: #ffffff;
  }
  
  .header img {
    max-width: 80%;
    height: auto;
  }
  
  .content {
    padding: 20px;
  }
  
  .section {
    padding: 20px;
    border-top: 1px solid #dddddd;
  }
  
  .section:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .section img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .section h2 {
    margin: 20px 0 10px;
    font-size: 22px;
    font-weight: 600;
    color: #212529;
  }
  
  .section p {
    margin: 10px 0;
    color: #495057;
    font-size: 16px;
  }
  
  .footer {
    text-align: center;
    padding: 20px;
    background-color: #343a40;
    color: #ffffff;
  }
  
  .footer p {
    margin: 0;
    font-size: 14px;
  }

.golden-btn {
    display: flex;
    width: fit-content;
    height: auto;
    margin: 20px auto;
    font-family: inherit;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
    font-size: 1em;
    box-sizing: border-box;
    /* padding: 0 1em; */
    padding: 7px 7px 7px 7px;
    background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
    border: 1px solid #a55d07;
    color: rgb(120, 50, 5);
    cursor: pointer;
    border-radius: 4px;
  }
  
  .golden-btn:focus,
  .golden-btn:hover {
    background-size: 150%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
  }
  
  .golden-btn:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }



</style>
