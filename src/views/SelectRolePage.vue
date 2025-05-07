<!-- src/views/SelectRolePage.vue -->
<template>
  <div>
    <h1>Bước 1: Chọn Vai Trò Bạn Muốn Đăng Ký</h1>
    <p>(Vai trò sẽ được áp dụng khi bạn hoàn tất đăng ký)</p>
    <div class="role-options">
      <div class="role-option" @click="selectRole('USER')">
        <h2>User</h2>
        <p>Truy cập các tính năng cơ bản.</p>
      </div>
      <div class="role-option" @click="selectRole('MODERATOR')">
        <h2>Moderator</h2>
        <p>Quản lý nội dung, người dùng.</p>
      </div>
      <div class="role-option" @click="selectRole('ADMIN')">
        <h2>Admin</h2>
        <p>Toàn quyền quản trị hệ thống.</p>
        <p style="color: red; font-size: small">(Cảnh báo: Chỉ dành cho quản trị viên)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['role-selected'])

function selectRole(role) {
  emit('role-selected', role)
}
</script>

<style scoped>
.role-options {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.role-option {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  width: 200px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}
.role-option:hover {
  background-color: #f0f0f0;
}
</style>
