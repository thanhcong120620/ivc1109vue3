<template>
    <div class="app">
      <div class="top-bar">
        <h1>Tên Trang Web</h1>
        <div class="menu-toggle" @click="toggleMenu">
          <div :class="{ 'open': isMenuOpen }"></div>
          <div :class="{ 'open': isMenuOpen }"></div>
          <div :class="{ 'open': isMenuOpen }"></div>
        </div>
      </div>
  
      <div class="container">
        <div class="left-bar" v-show="isMenuOpen">
          <h2>Menu</h2>
          <ul>
            <li>Liên kết 1</li>
            <li>Liên kết 2</li>
            <li>Liên kết 3</li>
            <li>Liên kết 4</li>
            <li>Liên kết 5</li>
          </ul>
        </div>
  
        <div class="content">
          <div class="banner">
            <h2>Chào mừng đến với trang web của chúng tôi!</h2>
          </div>
  
          <div class="input-container">
            <input type="text" placeholder="Nhập văn bản" class="neumorphic-input" />
          </div>
  
          <div class="card">
            <h3>Tiêu đề Card</h3>
            <p>User Role hiện tại: 
              Super Admin – Nhóm người dùng cao nhất và có quyền quản trị toàn bộ hệ thống. Ngoài ra, Super Admin có quyền xóa các người dùng trong nhóm Administrator.
              Administrator – Nhóm người dùng có quyền sử dụng toàn bộ các tính năng có trong một website, không bao gồm các website khác trong mạng website nội bộ.
              Editor – Nhóm này có quyền đăng bài viết lên website (publish) và quản lý các post khác của những người dùng khác.
              Author – Nhóm này sẽ có quyền đăng bài lên website và quản lý các post của họ.
              Contributor – Nhóm này sẽ có quyền viết bài mới nhưng không được phép đăng lên mà chỉ có thể gửi để xét duyệt (Save as Review) và quản lý post của họ.
              Subscriber – Người dùng trong nhóm này chỉ có thể quản lý thông tin cá nhân của họ.
            </p>
          </div>
  
          <table class="neumorphic-table">
            <thead>
              <tr>
                <th>Tiêu đề 1</th>
                <th>Tiêu đề 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nội dung 1</td>
                <td>Nội dung 2</td>
              </tr>
            </tbody>
          </table>
  
          <p class="neumorphic-paragraph">
            Đây là một đoạn văn theo phong cách Neumorphism.
          </p>
  
          <ul class="neumorphic-list">
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </div>
  
        <div class="right-bar">
          <h2>Thông tin bên phải</h2>
          <p>Nội dung cho phần right bar có thể bao gồm thông tin, liên kết hoặc bất kỳ nội dung nào khác.</p>
        </div>
      </div>
  
      <footer class="footer">
        <p>Bản quyền © 2024</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    data() {
      return {
        isMenuOpen: true, // Mặc định mở menu cho desktop
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .app {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f7f7f7;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-bottom: 20px;
  }
  
  .menu-toggle {
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  
  .menu-toggle div {
    width: 30px;
    height: 4px;
    background: #333;
    margin: 4px 0;
    transition: transform 0.3s, opacity 0.3s;
  }
  
  .menu-toggle div.open {
    transform: rotate(45deg);
  }
  
  .menu-toggle div:nth-child(2).open {
    opacity: 0;
  }
  
  .menu-toggle div:nth-child(3).open {
    transform: rotate(-45deg);
  }
  
  .container {
    display: flex;
    flex-wrap: wrap; /* Cho phép phần tử cuộn khi cần */
  }
  
  .left-bar {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-right: 20px;
    width: 250px; /* Kích thước cố định cho desktop */
    flex-shrink: 0; /* Ngăn chặn co lại */
  }
  
  .left-bar h2 {
    margin: 0 0 15px 0;
  }
  
  .left-bar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .left-bar li {
    padding: 10px 0;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .left-bar li:hover {
    background: #d1d9e0;
    border-radius: 5px;
  }
  
  .content {
    flex: 1;
    min-width: 300px; /* Đảm bảo nội dung không quá hẹp */
  }
  
  .right-bar {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-left: 20px; /* Khoảng cách với content */
    width: 250px; /* Kích thước cố định cho desktop */
    flex-shrink: 0; /* Ngăn chặn co lại */
  }
  
  .banner {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-bottom: 20px;
  }
  
  .input-container {
    padding: 20px;
  }
  
  .neumorphic-input {
    border: none;
    background: #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .neumorphic-input:focus {
    box-shadow: inset 4px 4px 10px #d1d9e0, inset -4px -4px 10px #ffffff;
  }
  
  .card {
    background: #e0e0e0;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-bottom: 20px;
  }
  
  .neumorphic-table {
    width: 100%;
    background: #e0e0e0;
    border-radius: 10px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .neumorphic-table th,
  .neumorphic-table td {
    padding: 15px;
    text-align: left;
  }
  
  .neumorphic-paragraph {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-bottom: 20px;
  }
  
  .neumorphic-list {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    list-style-type: none;
  }
  
  .footer {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 8px 8px 15px #d1d9e0, -8px -8px 15px #ffffff;
    margin-top: 20px;
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) { /* Tablet */
    .container {
      flex-direction: column; /* Chuyển sang cột cho tablet */
    }
  
    .left-bar {
      width: 100%; /* Chiếm toàn bộ chiều rộng */
      margin-right: 0;
      margin-bottom: 20px; /* Khoảng cách dưới */
    }
  
    .right-bar {
      width: 100%; /* Chiếm toàn bộ chiều rộng */
      margin-left: 0;
    }
  }
  
  @media (max-width: 768px) { /* Mobile */
    .left-bar {
      padding: 15px; /* Giảm padding cho mobile */
    }
  
    .left-bar h2 {
      font-size: 18px; /* Kích thước chữ nhỏ hơn */
    }
  
    .left-bar li {
      padding: 8px 0; /* Giảm padding cho các mục */
    }
  
    .banner {
      padding: 20px; /* Giảm padding của banner */
    }
  }
  </style>
  