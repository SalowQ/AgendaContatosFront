import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:7289/api'
console.log('API Base URL:', baseURL)

const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Request config:', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  (error) => {
    console.error('Response error:', error)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('usuarioagendacontato')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default httpClient 