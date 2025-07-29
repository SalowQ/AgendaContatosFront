import { ref } from 'vue'
import { login as apiLogin, logout as apiLogout, checkAuth as apiCheckAuth } from '@/api/auth.js'

const USER_STORAGE_KEY = 'usuarioagendacontato'

let authInstance: ReturnType<typeof createAuth> | null = null

function createAuth() {
  const user = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const error = ref<string | null>(null)

  const checkAuth = () => {
    const authResult = apiCheckAuth()
    if (authResult.isAuthenticated) {
      user.value = authResult.user?.username || null
      isAuthenticated.value = true
    } else {
      user.value = null
      isAuthenticated.value = false
    }
  }

  const login = async (email: string, password: string) => {
    error.value = null

    try {
      const result = await apiLogin(email, password)

      if (result.success) {
        user.value = result.user?.username || email
        isAuthenticated.value = true
        return { success: true }
      } else {
        error.value = result.error || 'Erro ao fazer login'
        return { success: false, error: result.error }
      }
    } catch (err) {
      error.value = 'Erro inesperado ao fazer login'
      return { success: false, error: 'Erro inesperado ao fazer login' }
    }
  }

  const logout = () => {
    apiLogout()
    user.value = null
    isAuthenticated.value = false
    error.value = null
  }

  checkAuth()

  return {
    user,
    isAuthenticated,
    error,
    login,
    logout,
    checkAuth,
  }
}

export function useAuth() {
  if (!authInstance) {
    authInstance = createAuth()
  }
  return authInstance
}
