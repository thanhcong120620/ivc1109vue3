<template>
  <div class="container">
    <h1>Giao diện Neumorphism Sang Trọng</h1>

    <div class="neumorphism-input">
      <input type="text" placeholder="Nhập tên..." />
    </div>

    <div class="neumorphism-card">
      <h3>Tên sản phẩm</h3>
      <p>Mô tả sản phẩm ngắn gọn.</p>
      <button>Thêm vào giỏ hàng</button>
    </div>

    <table class="neumorphism-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sản phẩm A</td>
          <td>$10</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Sản phẩm B</td>
          <td>$15</td>
        </tr>
      </tbody>
    </table>

    <div class="neumorphism-paragraph">
      <p>
        Đây là một đoạn văn bản trong phong cách Neumorphism chìm. Nội dung này có thể chứa thông
        tin hữu ích cho người dùng.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeumorphismDemo'
}
</script>

<style scoped>
body {
  background-color: #e0e5ec; /* Màu nền sáng */
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.neumorphism-input input {
  padding: 12px;
  border-radius: 20px;
  border: none;
  box-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.15),
    -6px -6px 12px rgba(255, 255, 255, 0.9);
  background-color: #f5f5f5; /* Màu nền sáng hơn */
  width: 100%;
  transition: all 0.2s ease;
}

.neumorphism-input input:focus {
  outline: none;
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.2),
    -4px -4px 10px rgba(255, 255, 255, 1);
}

.neumorphism-card {
  padding: 20px;
  border-radius: 20px;
  box-shadow:
    8px 8px 15px rgba(0, 0, 0, 0.2),
    -8px -8px 15px rgba(255, 255, 255, 0.9);
  background-color: #f5f5f5; /* Màu nền sáng hơn */
  margin: 20px 0;
}

.neumorphism-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
}

.neumorphism-table th,
.neumorphism-table td {
  padding: 12px;
  text-align: left;
  border: none;
  box-shadow:
    inset 5px 5px 10px rgba(0, 0, 0, 0.1),
    inset -5px -5px 10px rgba(255, 255, 255, 0.8);
  background-color: #f5f5f5; /* Màu nền sáng hơn */
}

.neumorphism-paragraph {
  padding: 15px;
  border-radius: 15px;
  box-shadow:
    inset 5px 5px 10px rgba(0, 0, 0, 0.1),
    inset -5px -5px 10px rgba(255, 255, 255, 0.8);
  background-color: #f5f5f5; /* Màu nền sáng hơn */
}
</style>
