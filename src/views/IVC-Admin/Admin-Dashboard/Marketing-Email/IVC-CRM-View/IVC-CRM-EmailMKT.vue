<template>
  <div class="main-area">
    <div class="container mt-5">
      <h2 class="mb-4 text-center">IVC-Email Marketing</h2>
      <div class="row">


        <!-- DATA CONTROL -->
        <div class="col-12 col-md-8">
          <h3>Customer List</h3>
          <button class="btn btn-success mb-3" @click="openCustomerForm">
            <i class="fas fa-plus"></i> Add Customer
          </button>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.gender }}</td>
                <td>
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-primary btn-sm me-2" @click="editCustomer(index)">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" @click="deleteCustomer(index)">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SEND MAIL -->
        <div class="col-12 col-md-4">
          <h3>Send Email</h3>
          <form @submit.prevent="sendEmail">
            <div class="form-group mb-3">
              <label for="emailSubject">Subject</label>
              <input
                type="text"
                class="form-control"
                v-model="emailSubject"
                placeholder="Nhập tiêu đề trước khi gửi"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="emailContent">Content</label>
              <textarea
                class="form-control"
                v-model="emailContent"
                rows="10"
                placeholder="Enter email content"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i> Send Email
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Overlay for Adding/Editing Customer -->
    <div v-if="isFormVisible" class="overlay" @click="closeCustomerForm">
      <div class="form-container" @click.stop>
        <div class="form-header">
          <h5>{{ currentCustomer.id ? 'Edit' : 'Add' }} Customer</h5>
          <button class="close-btn" @click="closeCustomerForm">&times;</button>
        </div>
        <div class="form-body">
          <form @submit.prevent="saveCustomer">
            <div class="form-group mb-3">
              <label for="customerName">Name</label>
              <input
                type="text"
                class="form-control"
                id="customerName"
                v-model="currentCustomer.name"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="customerEmail">Email</label>
              <input
                type="email"
                class="form-control"
                id="customerEmail"
                v-model="currentCustomer.email"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="customerGender">Gender</label>
              <select class="form-control" v-model="currentCustomer.gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save"></i> Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  setup() {
    const customers = ref([]);
    const emailSubject = ref('');
    const emailContent = ref('');
    const currentCustomer = reactive({
      id: null,
      name: '',
      email: '',
      gender: ''
    });
    const isFormVisible = ref(false);

    const fetchCustomers = async () => {
      setTimeout(() => {
        customers.value = [
          { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', gender: 'Male' },
          { id: 2, name: 'Trần Thị B', email: 'b@example.com', gender: 'Female' },
          { id: 3, name: 'Lê Minh C', email: 'c@example.com', gender: 'Male' },
          { id: 4, name: 'Phạm Lan D', email: 'd@example.com', gender: 'Female' },
          { id: 5, name: 'Hoàng Vũ E', email: 'e@example.com', gender: 'Other' }
        ];
      }, 1000);
    };

    const openCustomerForm = () => {
      currentCustomer.id = null;
      currentCustomer.name = '';
      currentCustomer.email = '';
      currentCustomer.gender = '';
      isFormVisible.value = true;
    };

    const closeCustomerForm = () => {
      isFormVisible.value = false;
    };

    const saveCustomer = () => {
      if (currentCustomer.id) {
        const index = customers.value.findIndex(customer => customer.id === currentCustomer.id);
        if (index !== -1) {
          customers.value[index] = { ...currentCustomer };
        }
      } else {
        currentCustomer.id = Date.now();
        customers.value.push({ ...currentCustomer });
      }
      closeCustomerForm();
    };

    const editCustomer = (index) => {
      currentCustomer.id = customers.value[index].id;
      currentCustomer.name = customers.value[index].name;
      currentCustomer.email = customers.value[index].email;
      currentCustomer.gender = customers.value[index].gender;
      isFormVisible.value = true;
    };

    const deleteCustomer = (index) => {
      customers.value.splice(index, 1);
    };

    const sendEmail = () => {
      const emailList = customers.value.map(customer => customer.email).join(', ');
      alert(`Sending email to: ${emailList}\nSubject: ${emailSubject.value}\nContent: ${emailContent.value}`);
    };

    onMounted(fetchCustomers);

    return {
      customers,
      emailSubject,
      emailContent,
      currentCustomer,
      isFormVisible,
      openCustomerForm,
      closeCustomerForm,
      saveCustomer,
      editCustomer,
      deleteCustomer,
      sendEmail
    };
  }
};
</script>


<style scoped>
body {
  background-color: #f0f0f3; /* Nền sáng nhẹ */
  font-family: 'Open Sans', sans-serif; /* Font chữ dễ đọc */
  color: #333; /* Chữ màu tối cho độ tương phản tốt */
  margin: 0;
  padding: 0;
}

h2 {
  color: #4e4e4e; /* Tiêu đề chính */
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  text-transform: uppercase;
}

h3 {
  margin-bottom: 1rem;
  color: #333; /* Tiêu đề phụ */
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.table th,
.table td {
  vertical-align: middle;
  color: #333;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.form-container {
  background-color: #e0e5ec;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  max-width: 100%;
  z-index: 1001;
  box-shadow: 10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff;
  transition: all 0.3s ease;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h5 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}




.close-btn {
  cursor: pointer;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #333;
}

.form-body {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background-color: #e0e5ec;
  box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
  color: #333;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff, 0 0 10px rgba(0, 0, 0, 0.2);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 12px 20px;
  background: #f5f8fa;
  border: none;
  border-radius: 15px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

button:hover {
  box-shadow: 10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff;
  transform: translateY(-3px);
}

button:active {
  transform: translateY(1px);
  box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
}

@media (max-width: 768px) {
  /* Thay đổi bố cục trên các màn hình nhỏ */
  .main-area {
    padding: 10px;
  }

  .form-container {
    width: 100%;
    padding: 20px;
  }

  .container {
    margin-top: 20px;
  }

  /* Chỉnh lại bảng cho phù hợp với màn hình nhỏ */
  .table {
    font-size: 0.875rem;
  }

  .col-12.col-md-8 {
    margin-bottom: 20px;
  }

  .col-12.col-md-4 {
    margin-top: 20px;
  }

  h2 {
    font-size: 2rem; /* Giảm kích thước tiêu đề trên màn hình nhỏ */
  }

  h3 {
    font-size: 1.2rem; /* Giảm kích thước tiêu đề phụ trên màn hình nhỏ */
  }

  button {
    font-size: 14px; /* Giảm kích thước nút trên màn hình nhỏ */
    padding: 10px 18px;
  }
}

@media (max-width: 576px) {
  /* Điều chỉnh cho màn hình điện thoại nhỏ */
  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  .table th,
  .table td {
    font-size: 0.75rem; /* Giảm kích thước chữ trong bảng trên điện thoại nhỏ */
  }

  .form-container {
    width: 100%;
    padding: 15px;
  }

  .table {
    font-size: 0.75rem;
  }

  .btn {
    font-size: 14px;
  }

  .col-12.col-md-8,
  .col-12.col-md-4 {
    padding: 0; /* Đảm bảo không có khoảng cách thừa trên màn hình nhỏ */
  }

  .overlay {
    padding: 0;
  }
}
</style>

