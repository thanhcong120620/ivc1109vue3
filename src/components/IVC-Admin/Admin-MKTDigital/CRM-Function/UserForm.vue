<script setup>
import { ref } from "vue";
import { userService } from "@/services/userService";

const user = ref({ name: "", email: "" });
const isEditing = ref(false);

async function saveUser() {
  try {
    if (isEditing.value) {
      await userService.updateUser(user.value.id, user.value); // Gọi API cập nhật
    } else {
      await userService.createUser(user.value); // Gọi API thêm mới
    }
    alert("Lưu user thành công!");
  } catch (err) {
    console.error("Lỗi khi lưu user:", err);
  }
}
</script>

<template>
  <div>
    <h1>{{ isEditing ? "Cập nhật" : "Thêm mới" }} user</h1>
    <form @submit.prevent="saveUser">
      <div>
        <label for="name">Tên:</label>
        <input v-model="user.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="user.email" id="email" type="email" required />
      </div>
      <button type="submit">Lưu</button>
    </form>
  </div>
</template>
