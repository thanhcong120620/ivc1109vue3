<!-- src/views/admin/AdminRoleManagementPage.vue -->
<template>
  <div class="role-management-page">
    <h2>Quản lý Vai trò Hệ thống</h2>

    <div class="toolbar">
      <button @click="openNewRoleDialog">Thêm Vai trò Mới</button>
    </div>

    <DataTable :value="roles" :paginator="true" :rows="10" responsiveLayout="scroll">
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="Tên Vai trò" :sortable="true"></Column>
      <Column field="description" header="Mô tả"></Column>
      <Column field="level" header="Cấp bậc (Level)" :sortable="true"></Column>
      <Column header="Hành động">
        <template #body="slotProps">
          <button @click="openEditRoleDialog(slotProps.data)">Sửa</button>
        </template>
      </Column>
    </DataTable>

    <!-- Dialog Tạo/Sửa Role -->
    <Dialog
      v-model:visible="roleDialogVisible"
      :header="dialogHeader"
      :modal="true"
      class="p-fluid"
      :style="{ width: '50vw' }"
    >
      <div class="p-field">
        <label for="roleName">Tên Vai trò (VD: ADMIN_MKT, USER_FIN)</label>
        <InputText
          id="roleName"
          v-model.trim="editableRole.name"
          required
          autofocus
          :class="{ 'p-invalid': submitted && !editableRole.name }"
        />
        <small class="p-error" v-if="submitted && !editableRole.name"
          >Tên vai trò là bắt buộc.</small
        >
      </div>
      <div class="p-field">
        <label for="roleDescription">Mô tả</label>
        <Textarea id="roleDescription" v-model="editableRole.description" rows="3" cols="20" />
      </div>
      <div class="p-field">
        <label for="roleLevel">Cấp bậc (Level)</label>
        <InputNumber
          id="roleLevel"
          v-model="editableRole.level"
          required
          :class="{ 'p-invalid': submitted && editableRole.level == null }"
        />
        <small class="p-error" v-if="submitted && editableRole.level == null"
          >Cấp bậc là bắt buộc.</small
        >
      </div>

      <div v-if="apiError" class="p-error api-error-message">{{ apiError }}</div>

      <template #footer>
        <Button label="Hủy" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button
          :label="editableRole.id ? 'Lưu thay đổi' : 'Tạo mới'"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveRole"
          :loading="saving"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Import các component PrimeVue cần thiết
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
// Import service để gọi API (bạn cần tạo service này hoặc dùng apiClient)
// import RoleApiService from '@/api/services/RoleApiService'; // Ví dụ
import apiClient from '@/api/axiosInstance' // Sử dụng instance Axios đã cấu hình

const roles = ref([])
const roleDialogVisible = ref(false)
const editableRole = ref({}) // Dùng cho cả tạo mới và sửa
const dialogHeader = ref('')
const submitted = ref(false) // Để kiểm tra validation client-side
const saving = ref(false) // Trạng thái loading cho nút save
const apiError = ref('') // Để hiển thị lỗi từ API

async function fetchRoles() {
  try {
    const response = await apiClient.get('/admin/roles') // Gọi API GET /api/admin/roles
    roles.value = response.data
  } catch (error) {
    console.error('Lỗi khi tải danh sách vai trò:', error)
    // Hiển thị thông báo lỗi cho người dùng nếu cần
  }
}

onMounted(() => {
  fetchRoles()
})

function openNewRoleDialog() {
  editableRole.value = { name: '', description: '', level: 0 } // Reset
  dialogHeader.value = 'Tạo Vai trò Mới'
  submitted.value = false
  apiError.value = ''
  roleDialogVisible.value = true
}

function openEditRoleDialog(role) {
  // Tạo một bản sao để không làm thay đổi trực tiếp danh sách roles khi đang sửa
  editableRole.value = { ...role }
  dialogHeader.value = 'Chỉnh sửa Vai trò'
  submitted.value = false
  apiError.value = ''
  roleDialogVisible.value = true
}

function hideDialog() {
  roleDialogVisible.value = false
  submitted.value = false
}

async function saveRole() {
  submitted.value = true
  apiError.value = ''

  // Client-side validation cơ bản
  if (
    !editableRole.value.name ||
    editableRole.value.name.trim() === '' ||
    editableRole.value.level == null
  ) {
    return // Không submit nếu thiếu thông tin bắt buộc
  }

  saving.value = true
  try {
    if (editableRole.value.id) {
      // Cập nhật Role
      const response = await apiClient.put(
        `/admin/roles/${editableRole.value.id}`,
        editableRole.value
      )
      // Cập nhật lại role trong danh sách roles
      const index = roles.value.findIndex((r) => r.id === editableRole.value.id)
      if (index !== -1) {
        roles.value[index] = response.data
      }
    } else {
      // Tạo Role mới
      const response = await apiClient.post('/admin/roles', editableRole.value)
      roles.value.push(response.data) // Thêm role mới vào danh sách
    }
    hideDialog()
    // Có thể thêm Toast thông báo thành công
  } catch (error) {
    console.error('Lỗi khi lưu vai trò:', error.response || error)
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        apiError.value = error.response.data
      } else if (error.response.data.message) {
        apiError.value = error.response.data.message
      } else if (error.response.data.error) {
        apiError.value = error.response.data.error
      } else {
        apiError.value = 'Lỗi không xác định từ máy chủ.'
      }
    } else {
      apiError.value = 'Không thể kết nối đến máy chủ hoặc lỗi không xác định.'
    }
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 1rem;
}
.p-field {
  margin-bottom: 1rem;
}
.api-error-message {
  margin-top: 10px;
  display: block;
}
</style>
