import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7289/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient 