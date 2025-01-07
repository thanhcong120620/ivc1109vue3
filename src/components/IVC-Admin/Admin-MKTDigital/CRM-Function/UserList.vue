<template>
  <div class="user-management">
    <h1 class="title">User Management</h1>
    
    <!-- Fetch Button -->
    <button class="fetch-button" @click="fetchUsers">Fetch Users</button>
    
    <!-- User List with Pagination -->
    <div class="user-list">
      <ul>
        <li v-for="user in paginatedUsers" :key="user.id" class="user-item">
          <div class="user-details">
            <span class="user-name">{{ user.fullName }}</span>
            <span class="user-email">{{ user.gmail }}</span>
          </div>
          <div class="user-actions">
            <button @click="editUser(user)" class="edit-btn">Edit</button>
            <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- User Form -->
    <form @submit.prevent="saveUser" class="user-form">
      <input v-model="userForm.fullName" placeholder="Name" required />
      <input v-model="userForm.gmail" placeholder="Email" required />
      <button type="submit" class="submit-btn">{{ isEditing ? "Update" : "Create" }} User</button>
    </form>
  </div>
</template>

<script>
import userService from "@/services/userService";

export default {
  data() {
    return {
      users: [],
      userForm: {
        id: null,
        fullName: "",
        gmail: "",
      },
      isEditing: false,
      currentPage: 1,
      pageSize: 5, // You can adjust this to show more/less users per page
    };
  },
  computed: {
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },

    // Paginated list of users for the current page
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.users.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const data = await userService.getAllUsers();
        this.users = data;
        console.log(">>> abc", this.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    async saveUser() {
      try {
        if (this.isEditing) {
          await userService.updateUser(this.userForm);
        } else {
          await userService.createUser(this.userForm);
        }
        await this.fetchUsers();
        this.resetForm();
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    },
    async deleteUser(userId) {
      try {
        await userService.deleteUsers([userId]);
        await this.fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
    editUser(user) {
      this.userForm = { ...user };
      this.isEditing = true;
    },
    resetForm() {
      this.userForm = { id: null, fullName: "", gmail: "" };
      this.isEditing = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.user-management {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.fetch-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

.fetch-button:hover {
  background-color: #45a049;
}

.user-list {
  margin-bottom: 20px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-item .user-details {
  flex: 1;
}

.user-name {
  font-weight: bold;
  margin-right: 10px;
}

.user-email {
  font-style: italic;
}

.user-actions button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 0.9em;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}

.pagination-controls {
  text-align: center;
  margin: 20px 0;
}

.pagination-controls button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.user-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

.user-form input {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

.user-form button:hover {
  background-color: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5em;
  }

  .fetch-button,
  .pagination-controls button,
  .user-form button {
    font-size: 0.9em;
  }

  .user-form input {
    padding: 8px;
  }
}
</style>
