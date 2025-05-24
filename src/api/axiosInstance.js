// src/api/axiosInstance.js
import axios from 'axios'
// Đường dẫn đến AuthService của bạn có thể cần điều chỉnh tùy thuộc vào cấu trúc thư mục
// Giả sử AuthService.js nằm trong src/api/services/AuthenticateJWTServices/AuthService.js
import AuthService from './services/AuthenticateJWTServices/AuthService'

// Tạo một instance Axios mới với cấu hình mặc định
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // URL cơ sở cho TẤT CẢ các API backend của bạn
  headers: {
    'Content-Type': 'application/json' // Header mặc định cho các request
  }
})

// Thêm một Request Interceptor
// Interceptor này sẽ được thực thi TRƯỚC KHI mỗi request được gửi đi
apiClient.interceptors.request.use(
  (config) => {
    // Lấy thông tin user hiện tại (bao gồm token) từ AuthService
    const user = AuthService.getCurrentUser()

    if (user && user.token) {
      // Nếu có user và token, thêm token vào header Authorization
      config.headers['Authorization'] = `Bearer ${user.token}`
      console.log('[Axios Interceptor] Token added to request headers.')
    } else {
      console.log('[Axios Interceptor] No token found, request sent without Authorization header.')
    }
    return config // Trả về config đã được sửa đổi (hoặc không)
  },
  (error) => {
    // Xử lý lỗi trong quá trình thiết lập request
    console.error('[Axios Interceptor] Request error:', error)
    return Promise.reject(error)
  }
)

// (Tùy chọn) Thêm một Response Interceptor
// Interceptor này sẽ được thực thi SAU KHI nhận được response từ server, TRƯỚC KHI nó được xử lý bởi .then() hoặc .catch()
apiClient.interceptors.response.use(
  (response) => {
    // Bất kỳ status code nào nằm trong khoảng 2xx đều sẽ vào đây
    console.log('[Axios Interceptor] Response received:', response.status)
    return response // Trả về response để .then() có thể xử lý
  },
  (error) => {
    // Bất kỳ status code nào nằm ngoài khoảng 2xx đều sẽ vào đây
    console.error(
      '[Axios Interceptor] Response error:',
      error.response ? error.response.status : error.message
    )
    if (error.response && error.response.status === 401) {
      // Xử lý lỗi 401 (Unauthorized - thường là token không hợp lệ hoặc hết hạn)
      console.warn(
        '[Axios Interceptor] Unauthorized (401) response. Clearing user data and redirecting to login.'
      )
      AuthService.logout() // Xóa thông tin user và token khỏi localStorage

      // Điều hướng về trang login.
      // Lưu ý: Điều hướng trực tiếp từ interceptor có thể phức tạp nếu router chưa sẵn sàng
      // hoặc gây ra các vấn đề về luồng.
      // Một cách tiếp cận an toàn hơn là phát ra một event toàn cục hoặc cập nhật Pinia store,
      // và để App.vue hoặc router guard xử lý việc điều hướng.
      // Tạm thời dùng window.location để đơn giản, nhưng nó sẽ reload trang:
      if (window.location.pathname !== '/login') {
        // Tránh vòng lặp nếu đang ở trang login
        window.location.href = '/login'
      }
      // Hoặc nếu bạn đã setup router và có thể inject nó (khó hơn trong file JS thường):
      // import router from '@/router'; // Chỉ hoạt động nếu cấu trúc cho phép
      // router.push({ name: 'Login' });
    }
    return Promise.reject(error) // Trả về lỗi để .catch() có thể xử lý
  }
)

// Xuất instance đã cấu hình để các module khác có thể sử dụng
export default apiClient
