import { ref } from 'vue'

const USER_STORAGE_KEY = 'usuarioagendacontato'

let authInstance: ReturnType<typeof createAuth> | null = null

function createAuth() {
  const user = ref<string | null>(null)
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (storedUser && storedUser.trim()) {
      user.value = storedUser
      isAuthenticated.value = true
    } else {
      user.value = null
      isAuthenticated.value = false
    }
  }

  const login = (username: string) => {
    const cleanUsername = username.trim()
    if (cleanUsername) {
      localStorage.setItem(USER_STORAGE_KEY, cleanUsername)
      user.value = cleanUsername
      isAuthenticated.value = true
    }
  }

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
    user.value = null
    isAuthenticated.value = false
  }

  checkAuth()

  return {
    user,
    isAuthenticated,
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
