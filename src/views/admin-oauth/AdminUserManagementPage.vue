<template>
  <div class="admin-user-management p-p-3">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <!-- Cần cho chức năng xóa sau này -->

    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Thêm User Mới"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNewUserDialog"
          />
          <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" /> -->
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="searchTerm"
              placeholder="Tìm Username hoặc Email..."
              @keyup.enter="onSearch"
              style="width: 300px"
            />
          </span>
          <Button label="Tìm" icon="pi pi-search" class="p-button-sm ml-2" @click="onSearch" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="users"
        :lazy="true"
        :paginator="true"
        :rows="lazyParams.rows"
        v-model:first="lazyParams.first"
        :totalRecords="totalRecords"
        @page="onPage($event)"
        @sort="onSort($event)"
        :loading="loadingTable"
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        currentPageReportTemplate="Hiển thị {first} đến {last} của {totalRecords} người dùng"
        dataKey="id"
        stripedRows
        class="p-datatable-customers"
      >
        <template #header>
          <div class="table-header">
            <h5 class="m-0">Danh sách người dùng</h5>
          </div>
        </template>
        <template #empty> Không tìm thấy người dùng nào. </template>
        <template #loading> Đang tải dữ liệu người dùng... </template>

        <Column field="id" header="ID" :sortable="true" style="min-width: 4rem"></Column>
        <Column
          field="username"
          header="Username"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column field="email" header="Email" :sortable="true" style="min-width: 12rem"></Column>
        <Column
          field="active"
          header="Trạng thái"
          :sortable="true"
          dataType="boolean"
          style="min-width: 8rem"
        >
          <template #body="slotProps">
            <Tag
              :severity="slotProps.data.active ? 'success' : 'danger'"
              :value="slotProps.data.active ? 'Active' : 'Inactive'"
            ></Tag>
          </template>
        </Column>
        <Column
          field="roleName"
          header="Vai trò"
          :sortable="false"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="departmentName"
          header="Phòng ban"
          :sortable="false"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="managerUsername"
          header="Quản lý"
          :sortable="false"
          style="min-width: 10rem"
        ></Column>
        <Column field="createdAt" header="Ngày tạo" :sortable="true" style="min-width: 10rem">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createdAt) }}
          </template>
        </Column>
        <Column headerStyle="min-width:10rem;" exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editUserDialog(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteUser(slotProps.data)"
              :loading="isDeleting === slotProps.data.id"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog Tạo/Sửa User -->
    <Dialog
      v-model:visible="userDialogVisible"
      :header="dialogHeader"
      :modal="true"
      class="p-fluid"
      :style="{ width: '650px' }"
      @hide="hideUserDialog"
    >
      <div class="field">
        <label for="username" class="font-bold">Username</label>
        <InputText
          id="username"
          v-model.trim="editableUser.username"
          required
          :autofocus="!editableUser.id"
          :class="{ 'p-invalid': submitted && !editableUser.username }"
        />
        <small class="p-error" v-if="submitted && !editableUser.username"
          >Username là bắt buộc.</small
        >
      </div>
      <div class="field">
        <label for="email" class="font-bold">Email</label>
        <InputText
          id="email"
          type="email"
          v-model.trim="editableUser.email"
          required
          :class="{ 'p-invalid': submitted && !editableUser.email }"
        />
        <small class="p-error" v-if="submitted && !editableUser.email"
          >Email là bắt buộc và phải hợp lệ.</small
        >
      </div>
      <div class="field" v-if="!editableUser.id">
        <!-- Chỉ hiển thị và yêu cầu password khi tạo mới -->
        <label for="password" class="font-bold">Mật khẩu</label>
        <Password
          id="password"
          v-model="editableUser.password"
          :feedback="false"
          toggleMask
          required
          :class="{ 'p-invalid': submitted && !editableUser.id && !editableUser.password }"
        />
        <small class="p-error" v-if="submitted && !editableUser.id && !editableUser.password"
          >Mật khẩu là bắt buộc khi tạo mới (ít nhất 6 ký tự).</small
        >
      </div>
      <div class="field">
        <label for="jobTitle" class="font-bold">Chức danh</label>
        <InputText id="jobTitle" v-model.trim="editableUser.jobTitle" />
      </div>
      <div class="field">
        <label for="employeeId" class="font-bold">Mã nhân viên</label>
        <InputText id="employeeId" v-model.trim="editableUser.employeeId" />
      </div>
      <div class="field">
        <label for="assignedRoleId" class="font-bold">Vai trò</label>
        <Dropdown
          id="assignedRoleId"
          v-model="editableUser.assignedRoleId"
          :options="availableRoles"
          optionLabel="name"
          optionValue="value"
          placeholder="Chọn vai trò"
          style="width: 100%"
        />
      </div>
      <div class="field">
        <label for="departmentId" class="font-bold">Phòng ban</label>
        <Dropdown
          id="departmentId"
          v-model="editableUser.departmentId"
          :options="availableDepartments"
          optionLabel="name"
          optionValue="value"
          placeholder="Chọn phòng ban"
          :showClear="true"
          style="width: 100%"
        />
      </div>
      <div class="field">
        <label for="managerId" class="font-bold">Người quản lý trực tiếp</label>
        <Dropdown
          id="managerId"
          v-model="editableUser.managerId"
          :options="availableManagers"
          optionLabel="name"
          optionValue="value"
          placeholder="Chọn người quản lý"
          :showClear="true"
          :filter="true"
          style="width: 100%"
        >
          <template #option="slotProps">
            <div>{{ slotProps.option.name }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field-checkbox mt-3">
        <Checkbox inputId="active" v-model="editableUser.active" :binary="true" />
        <label for="active" class="ml-2">Kích hoạt tài khoản</label>
      </div>

      <small v-if="apiUserError" class="p-error api-error-message">{{ apiUserError }}</small>

      <template #footer>
        <Button label="Hủy" icon="pi pi-times" class="p-button-text" @click="hideUserDialog" />
        <Button
          :label="editableUser.id ? 'Lưu thay đổi' : 'Tạo User'"
          icon="pi pi-check"
          @click="saveUser"
          :loading="savingUser"
        />
      </template>
    </Dialog>

    <!-- Dialog Xác nhận Xóa User -->
    <Dialog
      v-model:visible="deleteUserDialogVisible"
      header="Xác nhận Xóa"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="userToDelete"
          >Bạn có chắc chắn muốn xóa người dùng <b>{{ userToDelete.username }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteUserDialogVisible = false"
        />
        <Button
          label="Có"
          icon="pi pi-check"
          class="p-button-text"
          @click="executeDeleteUser"
          :loading="isDeleting === userToDelete?.id"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import Toolbar from 'primevue/toolbar' // Import Toolbar
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog' // Import ConfirmDialog (nếu dùng p-confirmDialog)
import { useToast } from 'primevue/usetoast'
// import { useConfirm } from 'primevue/useconfirm' // Nếu dùng p-confirmDialog thay cho p-dialog thủ công

import apiClient from '@/api/axiosInstance'

const users = ref([])
const loadingTable = ref(true)
const totalRecords = ref(0)
const searchTerm = ref('')
const toast = useToast()
// const confirm = useConfirm(); // Cho p-confirmDialog

const lazyParams = ref({
  first: 0,
  rows: 10,
  page: 0,
  sortField: 'username',
  sortOrder: 1
})

const userDialogVisible = ref(false)
const deleteUserDialogVisible = ref(false)
const editableUser = ref({
  username: '',
  email: '',
  password: '',
  active: true,
  assignedRoleId: null,
  departmentId: null,
  jobTitle: '',
  managerId: null,
  employeeId: ''
})
const userToDelete = ref(null)
const dialogHeader = ref('')
const submitted = ref(false)
const savingUser = ref(false)
const apiUserError = ref('')
const isDeleting = ref(null)

const availableRoles = ref([])
const availableDepartments = ref([])
const availableManagers = ref([])

// --- FETCH DATA ---
async function loadLazyData() {
  loadingTable.value = true
  try {
    const params = {
      page: lazyParams.value.page,
      size: lazyParams.value.rows,
      sort: lazyParams.value.sortField
        ? `${lazyParams.value.sortField},${lazyParams.value.sortOrder === 1 ? 'asc' : 'desc'}`
        : null,
      searchTerm: searchTerm.value || null
    }
    Object.keys(params).forEach((key) => params[key] == null && delete params[key])
    const response = await apiClient.get('/admin/users', { params })
    users.value = response.data.content
    totalRecords.value = response.data.totalElements
  } catch (error) {
    console.error('Lỗi tải người dùng:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải danh sách người dùng.',
      life: 3000
    })
  } finally {
    loadingTable.value = false
  }
}

async function fetchDropdownData() {
  try {
    const [rolesRes, deptsRes, managersRes] = await Promise.all([
      apiClient.get('/admin/roles'),
      apiClient.get('/admin/departments'),
      apiClient.get('/admin/users', { params: { page: 0, size: 1000, sort: 'username,asc' } }) // Lấy nhiều user để làm manager
    ])

    availableRoles.value = rolesRes.data.map((role) => ({
      name: `${role.name} (Lvl: ${role.level})`,
      value: role.id
    }))
    availableDepartments.value = deptsRes.data.map((dept) => ({
      name: `${dept.name} (${dept.code})`,
      value: dept.id
    }))
    availableManagers.value = managersRes.data.content
      .filter((u) => u.active && u.id !== editableUser.value?.id) // Lọc user active và không phải user đang sửa
      .map((u) => ({ name: u.username, value: u.id }))
  } catch (error) {
    console.error('Lỗi tải dữ liệu cho dropdowns:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi Dữ Liệu Form',
      detail: 'Không thể tải dữ liệu cho các lựa chọn.',
      life: 3000
    })
  }
}

onMounted(() => {
  lazyParams.value.page = Math.floor(lazyParams.value.first / lazyParams.value.rows)
  loadLazyData()
  fetchDropdownData() // Load dữ liệu dropdown khi component mount
})

// --- CRUD OPERATIONS ---
function openNewUserDialog() {
  editableUser.value = { active: true, username: '', email: '', password: '' } // Reset cho user mới
  dialogHeader.value = 'Thêm Người dùng Mới'
  submitted.value = false
  apiUserError.value = ''
  userDialogVisible.value = true
  // Đảm bảo manager list không chứa user đang tạo (nếu có logic đó)
  // Có thể cần gọi lại fetchManagersForDropdown nếu danh sách manager phụ thuộc vào user đang sửa
  if (availableManagers.value.length > 0 && editableUser.value.id) {
    availableManagers.value = availableManagers.value.filter(
      (m) => m.value !== editableUser.value.id
    )
  }
}

function editUserDialog(user) {
  editableUser.value = { ...user } // Lấy dữ liệu user cần sửa
  // Chuyển đổi lại để khớp với DTO mà backend mong đợi
  // Ví dụ, backend nhận assignedRoleId, departmentId, managerId là ID
  editableUser.value.assignedRoleId = user.assignedRole?.id || null
  editableUser.value.departmentId = user.department?.id || null
  editableUser.value.managerId = user.manager?.id || null
  // Password không nên hiển thị hoặc chỉ cho phép reset/thay đổi qua quy trình riêng
  editableUser.value.password = '' // Không hiển thị password cũ

  dialogHeader.value = 'Chỉnh sửa Người dùng'
  submitted.value = false
  apiUserError.value = ''
  userDialogVisible.value = true
  // Lọc user hiện tại ra khỏi danh sách manager có thể chọn
  if (availableManagers.value.length > 0 && editableUser.value.id) {
    availableManagers.value = availableManagers.value.filter(
      (m) => m.value !== editableUser.value.id
    )
  }
}

function hideUserDialog() {
  userDialogVisible.value = false
  submitted.value = false
  apiUserError.value = ''
}

async function saveUser() {
  submitted.value = true
  apiUserError.value = ''

  if (
    !editableUser.value.username?.trim() ||
    !editableUser.value.email?.trim() ||
    (!editableUser.value.id && !editableUser.value.password?.trim())
  ) {
    toast.add({
      severity: 'warn',
      summary: 'Thiếu thông tin',
      detail: 'Username, Email (và Password khi tạo mới) là bắt buộc.',
      life: 3000
    })
    return
  }
  if (
    editableUser.value.password &&
    editableUser.value.password.length < 6 &&
    !editableUser.value.id
  ) {
    toast.add({
      severity: 'warn',
      summary: 'Mật khẩu không hợp lệ',
      detail: 'Mật khẩu phải có ít nhất 6 ký tự.',
      life: 3000
    })
    return
  }

  savingUser.value = true
  try {
    // Chuẩn bị payload dựa trên DTO backend (AdminCreateUserRequestDto hoặc AdminUpdateUserRequestDto)
    const payload = {
      username: editableUser.value.username,
      email: editableUser.value.email,
      active: editableUser.value.active,
      assignedRoleId: editableUser.value.assignedRoleId,
      departmentId: editableUser.value.departmentId,
      jobTitle: editableUser.value.jobTitle,
      managerId: editableUser.value.managerId,
      employeeId: editableUser.value.employeeId
    }
    if (!editableUser.value.id) {
      // Tạo mới
      payload.password = editableUser.value.password
    } else if (editableUser.value.password?.trim()) {
      // Cập nhật và có nhập password mới
      payload.password = editableUser.value.password // Backend cần API riêng để đổi pass hoặc logic trong updateUser
      // LƯU Ý: API updateUser hiện tại không nhận password. Bạn cần API riêng hoặc sửa API.
      // Tạm thời bỏ password khỏi payload update để tránh lỗi
      delete payload.password
      toast.add({
        severity: 'info',
        summary: 'Thông tin',
        detail: 'Để đổi mật khẩu, vui lòng sử dụng chức năng Reset Password.',
        life: 3000
      })
    }

    if (editableUser.value.id) {
      // Sửa User
      // API updateUser hiện tại của bạn có thể không nhận password
      // và có thể không trả về UserDetailDto mà là UserSummaryDto hoặc chỉ status
      const response = await apiClient.put(`/admin/users/${editableUser.value.id}`, payload)
      // Backend trả về UserDetailDto
      const updatedUserDetail = response.data
      // Cần map lại UserDetailDto sang UserSummaryDto để cập nhật bảng
      const summaryToUpdate = {
        id: updatedUserDetail.id,
        username: updatedUserDetail.username,
        email: updatedUserDetail.email,
        active: updatedUserDetail.active,
        roleName: updatedUserDetail.assignedRole?.name,
        departmentName: updatedUserDetail.department?.name,
        managerUsername: updatedUserDetail.manager?.username,
        createdAt: updatedUserDetail.createdAt // Giữ nguyên createdAt hoặc lấy từ response nếu có
      }
      const index = users.value.findIndex((u) => u.id === editableUser.value.id)
      if (index !== -1) users.value[index] = summaryToUpdate
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Người dùng đã được cập nhật.',
        life: 3000
      })
    } else {
      // Tạo User mới
      const response = await apiClient.post('/admin/users', payload)
      // API tạo user trả về UserDetailDto, cần map sang UserSummaryDto
      const newUserDetail = response.data
      const summaryToPush = {
        id: newUserDetail.id,
        username: newUserDetail.username,
        email: newUserDetail.email,
        active: newUserDetail.active,
        roleName: newUserDetail.assignedRole?.name,
        departmentName: newUserDetail.department?.name,
        managerUsername: newUserDetail.manager?.username,
        createdAt: newUserDetail.createdAt
      }
      users.value.unshift(summaryToPush) // Thêm vào đầu
      totalRecords.value++ // Tăng tổng số bản ghi
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Người dùng đã được tạo.',
        life: 3000
      })
    }
    hideUserDialog()
  } catch (error) {
    console.error('Lỗi khi lưu người dùng:', error.response || error)
    const errMsg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Lỗi không xác định.'
    apiUserError.value = errMsg
    toast.add({ severity: 'error', summary: 'Lỗi', detail: errMsg, life: 4000 })
  } finally {
    savingUser.value = false
  }
}

function confirmDeleteUser(user) {
  userToDelete.value = user
  deleteUserDialogVisible.value = true
}

async function executeDeleteUser() {
  if (!userToDelete.value || userToDelete.value.id == null) return
  isDeleting.value = userToDelete.value.id
  try {
    await apiClient.delete(`/admin/users/${userToDelete.value.id}`)
    users.value = users.value.filter((u) => u.id !== userToDelete.value.id)
    totalRecords.value--
    deleteUserDialogVisible.value = false
    userToDelete.value = null
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Người dùng đã được xóa.',
      life: 3000
    })
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error.response || error)
    const errMsg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Lỗi không xác định.'
    toast.add({ severity: 'error', summary: 'Lỗi Xóa', detail: errMsg, life: 4000 })
  } finally {
    isDeleting.value = null
  }
}

// --- EVENT HANDLERS CHO DATATABLE ---
function onPage(event) {
  lazyParams.value.page = event.page
  lazyParams.value.rows = event.rows
  lazyParams.value.first = event.first
  loadLazyData()
}
function onSort(event) {
  lazyParams.value.sortField = event.sortField
  lazyParams.value.sortOrder = event.sortOrder
  loadLazyData()
}
function onSearch() {
  lazyParams.value.first = 0
  lazyParams.value.page = 0
  loadLazyData()
}

// --- UTILS ---
function formatDate(value) {
  if (value) {
    return new Date(value).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
  return ''
}
</script>

<style scoped>
.admin-user-management {
  padding: 1rem;
}
.toolbar {
  margin-bottom: 1rem;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field {
  margin-bottom: 1rem;
}
.field-checkbox {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.p-error {
  font-size: 0.875rem;
}
.api-error-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.mt-3 {
  margin-top: 1rem;
}
.confirmation-content {
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.confirmation-content i {
  margin-right: 0.5rem;
}
</style>
