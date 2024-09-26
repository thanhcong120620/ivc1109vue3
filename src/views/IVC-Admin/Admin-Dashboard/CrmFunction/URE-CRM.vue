<template>
    
  <div>
    <!-- Header -->
    <div class="Header">
      <Navigation />
    </div>

    <div class="container dashboard-container">      
      <div class="row">
        <!-- Customer List -->
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4><i class="fas fa-users"></i> Danh sách khách hàng</h4>
            </div>
            <div class="card-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Phân loại</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(customer, index) in customers" :key="index">
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.phone }}</td>
                    <td>{{ customer.category }}</td>
                    <td class="action-buttons">
                      <button class="btn btn-outline-warning btn-sm" @click="editCustomer(index)">Sửa</button>
                      <button class="btn btn-outline-danger btn-sm" @click="deleteCustomer(index)">Xóa</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-primary btn-sm" @click="openAddCustomerModal">Thêm khách hàng</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Interaction History -->
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4><i class="fas fa-history"></i> Hồ sơ lịch sử tương tác</h4>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item" v-for="(interaction, index) in interactionHistory" :key="index">
                  <div class="interaction-content">
                    <span>{{ interaction.date }}: {{ interaction.description }}</span>
                    <div class="action-buttons">
                      <button class="btn btn-outline-warning btn-sm" @click="editInteraction(index)">Sửa</button>
                      <button class="btn btn-outline-danger btn-sm" @click="deleteInteraction(index)">Xóa</button>
                    </div>
                  </div>
                </li>
              </ul>
              <button class="btn btn-primary btn-sm mt-2" @click="openAddInteractionModal">Thêm tương tác</button>
            </div>
          </div>
        </div>

        <!-- Customer Care -->
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4><i class="fas fa-hand-holding-heart"></i> Chăm sóc khách hàng sau bán</h4>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item" v-for="(care, index) in careHistory" :key="index">
                  <div class="care-content">
                    <span>{{ care.date }}: {{ care.description }}</span>
                    <div class="action-buttons">
                      <button class="btn btn-outline-warning btn-sm" @click="editCare(index)">Sửa</button>
                      <button class="btn btn-outline-danger btn-sm" @click="deleteCare(index)">Xóa</button>
                    </div>
                  </div>
                </li>
              </ul>
              <button class="btn btn-success btn-sm mt-2" @click="openAddCareModal">Tạo sự kiện chăm sóc</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Contracts Management -->
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4><i class="fas fa-file-contract"></i> Quản lý giấy tờ và hợp đồng</h4>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item" v-for="(contract, index) in contracts" :key="index">
                  <div class="contract-content">
                    <span>{{ contract.name }} - {{ contract.status }}</span>
                    <div class="action-buttons">
                      <button class="btn btn-outline-warning btn-sm" @click="editContract(index)">Sửa</button>
                      <button class="btn btn-outline-danger btn-sm" @click="deleteContract(index)">Xóa</button>
                    </div>
                  </div>
                </li>
              </ul>
              <button class="btn btn-primary btn-sm mt-2" @click="openAddContractModal">Thêm hợp đồng</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCustomerModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showCustomerModal = false">&times;</span>
        <h5 class="modal-title">Thêm khách hàng</h5>
        <form @submit.prevent="saveCustomer">
          <div class="mb-3">
            <label for="customerName" class="form-label">Tên khách hàng</label>
            <input type="text" class="form-control" v-model="customerForm.name" required />
          </div>
          <div class="mb-3">
            <label for="customerEmail" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="customerForm.email" required />
          </div>
          <div class="mb-3">
            <label for="customerPhone" class="form-label">Điện thoại</label>
            <input type="text" class="form-control" v-model="customerForm.phone" required />
          </div>
          <div class="mb-3">
            <label for="customerCategory" class="form-label">Phân loại</label>
            <select class="form-select" v-model="customerForm.category" required>
              <option value="Tiềm năng">Tiềm năng</option>
              <option value="Đã mua">Đã mua</option>
              <option value="Tái đầu tư">Tái đầu tư</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Lưu</button>
        </form>
      </div>
    </div>

    <div v-if="showInteractionModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showInteractionModal = false">&times;</span>
        <h5 class="modal-title">Thêm tương tác</h5>
        <form @submit.prevent="saveInteraction">
          <div class="mb-3">
            <label for="interactionDate" class="form-label">Ngày</label>
            <input type="date" class="form-control" v-model="interactionForm.date" required />
          </div>
          <div class="mb-3">
            <label for="interactionDescription" class="form-label">Mô tả</label>
            <textarea class="form-control" v-model="interactionForm.description" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Lưu</button>
        </form>
      </div>
    </div>

    <div v-if="showCareModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showCareModal = false">&times;</span>
        <h5 class="modal-title">Tạo sự kiện chăm sóc</h5>
        <form @submit.prevent="saveCareEvent">
          <div class="mb-3">
            <label for="careDate" class="form-label">Ngày</label>
            <input type="date" class="form-control" v-model="careForm.date" required />
          </div>
          <div class="mb-3">
            <label for="careDescription" class="form-label">Mô tả</label>
            <textarea class="form-control" v-model="careForm.description" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Lưu</button>
        </form>
      </div>
    </div>

    <div v-if="showContractModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showContractModal = false">&times;</span>
        <h5 class="modal-title">Thêm/Sửa hợp đồng</h5>
        <form @submit.prevent="saveContract">
          <div class="mb-3">
            <label for="contractName" class="form-label">Tên hợp đồng</label>
            <input type="text" class="form-control" v-model="contractForm.name" required />
          </div>
          <div class="mb-3">
            <label for="contractStatus" class="form-label">Trạng thái</label>
            <select class="form-select" v-model="contractForm.status" required>
              <option value="Đang chờ ký">Đang chờ ký</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Lưu</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '@/views/IVC-Admin/Admin-Dashboard/TopLeftNavigation.vue'

const customers = ref([
  { name: "John Doe", email: "johndoe@example.com", phone: "+123 456 789", category: "VIP" },
  { name: "Jane Smith", email: "janesmith@example.com", phone: "+987 654 321", category: "Tiềm năng" },
]);

const interactionHistory = ref([
  { date: "02/09/2024", description: "Gọi điện trao đổi về dự án biệt thự ven biển" },
  { date: "10/09/2024", description: "Gửi email báo giá dự án" },
]);

const careHistory = ref([
  { date: "20/09/2024", description: "Gọi điện kiểm tra trạng thái hợp đồng" },
]);

const contracts = ref([
  { name: "Hợp đồng số #1234", status: "Đang chờ ký" },
  { name: "Hợp đồng số #5678", status: "Hoàn thành" },
]);

const showCustomerModal = ref(false);
const showInteractionModal = ref(false);
const showCareModal = ref(false);
const showContractModal = ref(false);

const customerForm = ref({ name: '', email: '', phone: '', category: 'Tiềm năng' });
const interactionForm = ref({ date: '', description: '' });
const careForm = ref({ date: '', description: '' });
const contractForm = ref({ name: '', status: 'Đang chờ ký' });
const editIndex = ref(null);

const openAddCustomerModal = () => {
  customerForm.value = { name: '', email: '', phone: '', category: 'Tiềm năng' };
  showCustomerModal.value = true;
  editIndex.value = null;
};

const saveCustomer = () => {
  if (editIndex.value !== null) {
    customers.value[editIndex.value] = { ...customerForm.value };
  } else {
    customers.value.push({ ...customerForm.value });
  }
  showCustomerModal.value = false;
};

const editCustomer = (index) => {
  customerForm.value = { ...customers.value[index] };
  showCustomerModal.value = true;
  editIndex.value = index;
};

const deleteCustomer = (index) => {
  customers.value.splice(index, 1);
};

const openAddInteractionModal = () => {
  interactionForm.value = { date: '', description: '' };
  showInteractionModal.value = true;
};

const saveInteraction = () => {
  interactionHistory.value.push({ ...interactionForm.value });
  showInteractionModal.value = false;
};

const editInteraction = (index) => {
  interactionForm.value = { ...interactionHistory.value[index] };
  showInteractionModal.value = true;
  editIndex.value = index;
};

const deleteInteraction = (index) => {
  interactionHistory.value.splice(index, 1);
};

const openAddCareModal = () => {
  careForm.value = { date: '', description: '' };
  showCareModal.value = true;
};

const saveCareEvent = () => {
  careHistory.value.push({ ...careForm.value });
  showCareModal.value = false;
};

const editCare = (index) => {
  careForm.value = { ...careHistory.value[index] };
  showCareModal.value = true;
  editIndex.value = index;
};

const deleteCare = (index) => {
  careHistory.value.splice(index, 1);
};

const openAddContractModal = () => {
  contractForm.value = { name: '', status: 'Đang chờ ký' };
  showContractModal.value = true;
  editIndex.value = null;
};

const saveContract = () => {
  if (editIndex.value !== null) {
    contracts.value[editIndex.value] = { ...contractForm.value };
  } else {
    contracts.value.push({ ...contractForm.value });
  }
  showContractModal.value = false;
};

const editContract = (index) => {
  contractForm.value = { ...contracts.value[index] };
  showContractModal.value = true;
  editIndex.value = index;
};

const deleteContract = (index) => {
  contracts.value.splice(index, 1);
};
</script>

<style scoped>
/* <!-- Custom CSS --> */
/* @import '../../../../assets/css/css-AdminSystem/SupperAdmin/style.min.css'; */
body {
  background-color: #f7f7f7;
}
.header {
  float:left;
}
.dashboard-container {
  margin-top: 20px;
  float:right;
}
.card {
  margin-bottom: 20px;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.interaction-content, .care-content, .contract-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.action-buttons {
  display: flex;
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-left:20px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px; /* Tăng chiều rộng modal */
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.btn {
  min-width: 20px; /* Đặt độ rộng tối thiểu cho các nút */
  height:30px;
}
</style>
