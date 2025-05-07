import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/' // URL API backend của bạn
const OAUTH2_INITIATE_URL = 'http://localhost:8080/oauth2/initiate/' // URL để bắt đầu OAuth2

class AuthService {
  login(credentials) {
    console.log('AuthService login called with credentials:', credentials) // <<-- THÊM LOG NÀY
    return axios.post(API_URL + 'login', credentials).then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
  }

  logout() {
    localStorage.removeItem('user')
    // Gọi API logout của backend nếu có
  }

  register(userData) {
    // <<-- Bỏ selectedRole
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }
    return axios.post(API_URL + 'register', payload).then((response) => {
      // <<-- response ở đây là của Axios
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      // --- SỬA LẠI DÒNG NÀY ---
      return response.data // <<-- TRẢ VỀ ĐÚNG DATA JSON (JwtResponse)
      // ----------------------
    })
  }

  // Hàm này sẽ được gọi bởi OAuthCallbackPage.vue sau khi backend redirect về
  getOAuth2UserAndToken() {
    // Endpoint này sẽ trả về JWT sau khi OAuth2 thành công ở backend
    return axios
      .get(API_URL + 'oauth2/success', { withCredentials: true }) // withCredentials quan trọng để gửi session cookie
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  storeUserFromJwt(token) {
    if (token) {
      // Decode token để lấy thông tin user
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        const userData = {
          token: token,
          type: 'Bearer',
          id: decodedToken.sub, // Hoặc claim chứa ID
          username: decodedToken.sub, // Hoặc claim chứa username
          email: decodedToken.email,
          roles: decodedToken.roles || []
        }
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      } catch (e) {
        console.error('Error decoding JWT in AuthService:', e)
        localStorage.removeItem('user') // Xóa nếu token lỗi
        return null
      }
    }
    return null
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  }

  // Hàm để bắt đầu luồng OAuth2 với role đã chọn
  initiateOAuth2Login(provider, role) {
    // Chuyển hướng trình duyệt đến endpoint backend để bắt đầu luồng OAuth2
    window.location.href = `${OAUTH2_INITIATE_URL}${provider}?role=${role}`
  }
}

export default new AuthService()
