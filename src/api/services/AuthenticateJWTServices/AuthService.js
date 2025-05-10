import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login(credentials) {
    console.log(
      '[AuthService] login: Attempting with credentials:',
      JSON.parse(JSON.stringify(credentials))
    )
    return axios
      .post(API_URL + 'login', credentials)
      .then((response) => {
        console.log(
          '[AuthService] login: API response received:',
          JSON.parse(JSON.stringify(response.data))
        )
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          console.log('[AuthService] login: User data (with token) stored in localStorage.')
        }
        return response.data
      })
      .catch((error) => {
        console.error('[AuthService] login: API error:', error.response || error)
        throw error
      })
  }

  logout() {
    console.log('[AuthService] logout: Removing user from localStorage.')
    localStorage.removeItem('user')
  }

  register(userData) {
    console.log(
      '[AuthService] register: Attempting with userData:',
      JSON.parse(JSON.stringify(userData))
    )
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }
    console.log('[AuthService] register: Payload to be sent:', payload)
    return axios
      .post(API_URL + 'register', payload)
      .then((response) => {
        console.log(
          '[AuthService] register: API response received:',
          JSON.parse(JSON.stringify(response.data))
        )
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          console.log('[AuthService] register: User data (with token) stored in localStorage.')
        }
        return response.data
      })
      .catch((error) => {
        console.error('[AuthService] register: API error:', error.response || error)
        throw error
      })
  }

  getOAuth2UserAndToken() {
    console.log('[AuthService] getOAuth2UserAndToken: Calling API /api/auth/oauth2/success')
    return axios
      .get(API_URL + 'oauth2/success', { withCredentials: true })
      .then((response) => {
        console.log(
          '[AuthService] getOAuth2UserAndToken: API response received:',
          JSON.parse(JSON.stringify(response.data))
        )
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          console.log(
            '[AuthService] getOAuth2UserAndToken: User data (with token) stored in localStorage.'
          )
        }
        return response.data
      })
      .catch((error) => {
        console.error('[AuthService] getOAuth2UserAndToken: API error:', error.response || error)
        throw error
      })
  }

  // storeUserFromJwt - giữ nguyên nếu bạn dùng nó trong OAuthCallbackPage
  storeUserFromJwt(token) {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        const userData = {
          token: token,
          type: 'Bearer',
          id: decodedToken.sub,
          username: decodedToken.sub, // Hoặc claim khác nếu có
          email: decodedToken.email,
          roles: decodedToken.roles || []
        }
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      } catch (e) {
        console.error('Error decoding JWT in AuthService:', e)
        localStorage.removeItem('user')
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

  initiateOAuth2Login(provider) {
    console.log(
      `[AuthService] initiateOAuth2Login: Redirecting to backend for provider: ${provider}`
    )
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`
  }

  // --- THÊM PHƯƠNG THỨC NÀY VÀO ĐÂY ---
  async activateAccount(activationKey) {
    console.log('[AuthService] activateAccount: Attempting with key:', activationKey)
    const user = this.getCurrentUser() // Lấy user hiện tại (có JWT nhưng chưa active)
    if (!user || !user.token) {
      console.error('AuthService: No user token found for activation.')
      throw new Error('Người dùng chưa đăng nhập hoặc phiên làm việc đã hết hạn để kích hoạt.')
    }
    console.log(
      '[AuthService] activateAccount: Current user token (partial):',
      user.token.substring(0, 20) + '...'
    )

    const headers = {
      Authorization: `Bearer ${user.token}`, // Gửi JWT của user hiện tại
      'Content-Type': 'application/json' // Nên thêm Content-Type
    }

    try {
      // Gọi API backend /api/auth/activate
      const response = await axios.post(API_URL + 'activate', { activationKey }, { headers }) // Gửi activationKey trong body
      console.log(
        '[AuthService] activateAccount: API response received:',
        JSON.parse(JSON.stringify(response.data))
      )
      if (response.data && response.data.token) {
        // API backend đã trả về JWT mới với thông tin user đã cập nhật
        // Lưu lại JWT mới và thông tin user này vào localStorage
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(
          '[AuthService] activateAccount: Account activated, new JWT and user data stored.'
        )
      }
      return response.data // Trả về JwtResponse mới
    } catch (error) {
      console.error('[AuthService] activateAccount: API error:', error.response || error)
      // Ném lại lỗi để component Vue có thể bắt và hiển thị thông báo
      if (error.response && error.response.data) {
        // Cố gắng lấy message lỗi từ backend
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          (typeof error.response.data === 'string'
            ? error.response.data
            : 'Lỗi không xác định từ server')
        throw new Error(errorMessage)
      }
      throw error // Ném lại lỗi gốc nếu không có response.data cụ thể
    }
  }
  // --------------------------------------
}

export default new AuthService()
