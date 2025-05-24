<!-- src/views/admin/AdminDepartmentManagementPage.vue -->
<template>
  <div class="department-management-page">
    <h2>Quản lý Phòng Ban</h2>

    <div class="toolbar">
      <Button
        label="Thêm Phòng Ban Mới"
        icon="pi pi-plus"
        class="p-button-success"
        @click="openNewDepartmentDialog"
      />
    </div>

    <DataTable
      :value="departments"
      :paginator="true"
      :rows="10"
      responsiveLayout="scroll"
      :loading="loadingTable"
      emptyMessage="Không tìm thấy phòng ban nào."
    >
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="Tên Phòng Ban" :sortable="true"></Column>
      <Column field="code" header="Mã Phòng Ban" :sortable="true"></Column>
      <Column header="Hành động" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="openEditDepartmentDialog(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteDepartment(slotProps.data)"
            :disabled="isDeleting === slotProps.data.id"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Dialog Tạo/Sửa Phòng Ban -->
    <Dialog
      v-model:visible="departmentDialogVisible"
      :header="dialogHeader"
      :modal="true"
      class="p-fluid"
      :style="{ width: '450px' }"
    >
      <div class="field">
        <label for="deptName">Tên Phòng Ban</label>
        <InputText
          id="deptName"
          v-model.trim="editableDepartment.name"
          required
          autofocus
          :class="{ 'p-invalid': submitted && !editableDepartment.name }"
        />
        <small class="p-error" v-if="submitted && !editableDepartment.name"
          >Tên phòng ban là bắt buộc.</small
        >
      </div>
      <div class="field">
        <label for="deptCode">Mã Phòng Ban (VD: MKT, HR_PSN)</label>
        <InputText
          id="deptCode"
          v-model.trim="editableDepartment.code"
          required
          :class="{ 'p-invalid': submitted && !editableDepartment.code }"
        />
        <small class="p-error" v-if="submitted && !editableDepartment.code"
          >Mã phòng ban là bắt buộc.</small
        >
      </div>

      <div v-if="apiError" class="p-error api-error-message">{{ apiError }}</div>

      <template #footer>
        <Button label="Hủy" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button
          :label="editableDepartment.id ? 'Lưu thay đổi' : 'Tạo mới'"
          icon="pi pi-check"
          @click="saveDepartment"
          :loading="saving"
        />
      </template>
    </Dialog>

    <!-- Dialog Xác nhận Xóa -->
    <Dialog
      v-model:visible="deleteDepartmentDialogVisible"
      header="Xác nhận Xóa"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="departmentToDelete"
          >Bạn có chắc chắn muốn xóa phòng ban <b>{{ departmentToDelete.name }}</b> (Mã:
          {{ departmentToDelete.code }})?</span
        >
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDepartmentDialogVisible = false"
        />
        <Button
          label="Có"
          icon="pi pi-check"
          class="p-button-text"
          @click="executeDeleteDepartment"
          :loading="isDeleting === departmentToDelete.id"
        />
      </template>
    </Dialog>

    <Toast />
    <!-- Để hiển thị thông báo thành công/lỗi -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast' // Import Toast
import { useToast } from 'primevue/usetoast' // Import useToast

import apiClient from '@/api/axiosInstance'

const departments = ref([])
const departmentDialogVisible = ref(false)
const deleteDepartmentDialogVisible = ref(false)
const editableDepartment = ref({})
const departmentToDelete = ref(null)
const dialogHeader = ref('')
const submitted = ref(false)
const saving = ref(false)
const loadingTable = ref(true)
const apiError = ref('')
const isDeleting = ref(null) // Để theo dõi ID của department đang được xóa

const toast = useToast() // Khởi tạo toast service

async function fetchDepartments() {
  loadingTable.value = true
  apiError.value = ''
  try {
    const response = await apiClient.get('/admin/departments')
    departments.value = response.data
    console.log('[AdminDeptPage] Departments fetched:', departments.value)
  } catch (error) {
    console.error('Lỗi khi tải danh sách phòng ban:', error.response || error)
    apiError.value =
      'Không thể tải danh sách phòng ban. ' +
      (error.response?.data?.message || error.response?.data || error.message || '')
    toast.add({ severity: 'error', summary: 'Lỗi', detail: apiError.value, life: 3000 })
  } finally {
    loadingTable.value = false
  }
}

onMounted(() => {
  fetchDepartments()
})

function openNewDepartmentDialog() {
  editableDepartment.value = { name: '', code: '' }
  dialogHeader.value = 'Tạo Phòng Ban Mới'
  submitted.value = false
  apiError.value = ''
  departmentDialogVisible.value = true
}

function openEditDepartmentDialog(dept) {
  editableDepartment.value = { ...dept }
  dialogHeader.value = 'Chỉnh sửa Phòng Ban'
  submitted.value = false
  apiError.value = ''
  departmentDialogVisible.value = true
}

function hideDialog() {
  departmentDialogVisible.value = false
  submitted.value = false
}

async function saveDepartment() {
  submitted.value = true
  apiError.value = ''

  if (!editableDepartment.value.name?.trim() || !editableDepartment.value.code?.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: 'Vui lòng điền đầy đủ thông tin.',
      life: 3000
    })
    return
  }

  saving.value = true
  try {
    let response
    if (editableDepartment.value.id) {
      response = await apiClient.put(
        `/admin/departments/${editableDepartment.value.id}`,
        editableDepartment.value
      )
      const index = departments.value.findIndex((d) => d.id === editableDepartment.value.id)
      if (index !== -1) {
        departments.value[index] = response.data
      }
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Phòng ban đã được cập nhật.',
        life: 3000
      })
    } else {
      response = await apiClient.post('/admin/departments', editableDepartment.value)
      departments.value.push(response.data)
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Phòng ban đã được tạo mới.',
        life: 3000
      })
    }
    hideDialog()
  } catch (error) {
    console.error('Lỗi khi lưu phòng ban:', error.response || error)
    const errMsg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Lỗi không xác định.'
    apiError.value = errMsg // Hiển thị lỗi trong dialog
    toast.add({ severity: 'error', summary: 'Lỗi Lưu Phòng Ban', detail: errMsg, life: 4000 })
  } finally {
    saving.value = false
  }
}

function confirmDeleteDepartment(dept) {
  departmentToDelete.value = dept
  deleteDepartmentDialogVisible.value = true
}

async function executeDeleteDepartment() {
  if (!departmentToDelete.value || departmentToDelete.value.id == null) return
  isDeleting.value = departmentToDelete.value.id // Đánh dấu đang xóa ID này
  apiError.value = ''
  try {
    await apiClient.delete(`/admin/departments/${departmentToDelete.value.id}`)
    departments.value = departments.value.filter((d) => d.id !== departmentToDelete.value.id)
    deleteDepartmentDialogVisible.value = false
    departmentToDelete.value = null
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Phòng ban đã được xóa.',
      life: 3000
    })
  } catch (error) {
    console.error('Lỗi khi xóa phòng ban:', error.response || error)
    const errMsg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Lỗi không xác định.'
    // Hiển thị lỗi bằng Toast thay vì apiError trong dialog xóa
    toast.add({ severity: 'error', summary: 'Lỗi Xóa Phòng Ban', detail: errMsg, life: 4000 })
    // Không đóng dialog xóa nếu có lỗi để user biết
  } finally {
    isDeleting.value = null // Hoàn tất xóa (dù thành công hay thất bại)
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end; /* Đẩy nút sang phải */
}
.field {
  /* PrimeVue class cho form field */
  margin-bottom: 1rem;
}
.p-error {
  /* PrimeVue class cho message lỗi validation */
  font-size: 0.9em;
}
.api-error-message {
  margin-top: 10px;
  display: block;
  color: var(--red-500); /* Sử dụng biến màu của PrimeVue nếu có */
}
.mr-2 {
  margin-right: 0.5rem;
}
.confirmation-content {
  display: flex;
  align-items: center;
}
</style>
