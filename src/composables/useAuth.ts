import { ref, onMounted } from 'vue'

const USER_STORAGE_KEY = 'usuarioagendacontato'

export function useAuth() {
  const user = ref<string | null>(null)
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (storedUser) {
      user.value = storedUser
      isAuthenticated.value = true
    } else {
      user.value = null
      isAuthenticated.value = false
    }
  }

  const login = (username: string) => {
    localStorage.setItem(USER_STORAGE_KEY, username)
    user.value = username
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
    user.value = null
    isAuthenticated.value = false
  }

  onMounted(() => {
    checkAuth()
  })

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  }
}
