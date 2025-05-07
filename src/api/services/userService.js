import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

const userService = {
  // Lấy danh sách người dùng
  async getAllUsers() {
    try {
      const response = await axios.get(`${BASE_URL}/test-crud-show-userList`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  },

  // Tạo mới một người dùng
  async createUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/test-crud-create-user`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Cập nhật thông tin người dùng
  async updateUser(userData) {
    try {
      const response = await axios.put(`${BASE_URL}/test-crud-update-user`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Xóa người dùng
  async deleteUsers(userIds) {
    try {
      const response = await axios.delete(`${BASE_URL}/test-crud-delete-user`, {
        data: userIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting users:", error);
      throw error;
    }
  },
};

export default userService;
