// Import "công cụ" apiClient đã được cấu hình sẵn (với baseURL, interceptors...)
import apiClient from '../axiosInstance'

class CrmApiService {
  /**
   * Lấy tin nhắn chào mừng từ backend.
   * Sẽ gọi đến GET http://localhost:8080/api/crm/hello
   */
  getHelloMessage() {
    // Chỉ cần truyền vào đường dẫn tương đối từ sau '/api'
    // apiClient sẽ tự động xử lý token và lỗi 401.
    return apiClient.get('/crm/hello')
  }

  /**
   * Lấy danh sách các items từ backend.
   * Sẽ gọi đến GET http://localhost:8080/api/crm/items
   */
  getItems() {
    return apiClient.get('/crm/items')
  }

  // ... bạn có thể thêm các hàm khác như createContact, getContacts ở đây ...
}

// Xuất ra một instance của class để các component khác có thể import và sử dụng
export default new CrmApiService()
