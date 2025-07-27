<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { watch, computed, onMounted } from 'vue'

const { isAuthenticated, user, logout } = useAuth()
const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => route.name === 'login')

const handleLogout = () => {
  logout()
  router.push('/login')
}

const menuItems = [
  {
    label: 'Home',
    icon: '🏠',
    command: () => router.push('/'),
  },
  {
    label: 'About',
    icon: 'ℹ️',
    command: () => router.push('/about'),
  },
]

onMounted(() => {
  if (route.name) {
    if (isAuthenticated.value && route.name === 'login') {
      router.push('/')
    }
  }
})

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName && isAuthenticated.value && newRouteName === 'login') {
      router.push('/')
    }
  },
  { immediate: true },
)

watch(
  isAuthenticated,
  (newValue) => {
    if (newValue && route.name !== 'login') {
      router.push('/login')
    } else if (newValue && route.name === 'login') {
      router.push('/')
    }
  },
  { immediate: true },
)

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName && newRouteName !== 'login' && !isAuthenticated.value) {
      router.push('/login')
    }
  },
)
</script>

<template>
  <div v-if="isAuthenticated" class="app-container">
    <header class="header-menubar">
      <div class="header-content">
        <div class="header-start">
          <div class="flex align-items-center gap-2">
            <span class="header-icon">📅</span>
            <span class="header-title">Agenda de Contatos</span>
          </div>
        </div>

        <nav class="header-nav">
          <ul class="nav-list">
            <li v-for="item in menuItems" :key="item.label" class="nav-item">
              <button @click="item.command" class="nav-button">
                <span class="nav-icon">{{ item.icon }}</span>
                <span class="nav-label">{{ item.label }}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div class="header-end">
          <div class="flex align-items-center gap-2">
            <span class="user-greeting">Olá, {{ user }}!</span>
            <button class="logout-button" @click="handleLogout" title="Sair">🚪</button>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>

  <div v-else class="app-container" :class="{ 'login-page': isLoginPage }">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-menubar {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.header-start {
  display: flex;
  align-items: center;
}

.header-icon {
  font-size: 1.5rem;
  margin-right: 8px;
}

.header-title {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-item {
  margin: 0;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #666;
  font-size: 14px;
}

.nav-button:hover {
  background-color: #f5f5f5;
  color: #333;
}

.nav-icon {
  font-size: 16px;
}

.nav-label {
  font-weight: 500;
}

.header-end {
  display: flex;
  align-items: center;
}

.user-greeting {
  font-size: 14px;
  color: #666;
  margin-right: 12px;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: #c82333;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 15px;
  }

  .main-content {
    padding: 15px;
  }

  .nav-list {
    gap: 10px;
  }

  .nav-label {
    display: none;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 10px;
  }

  .header-title {
    font-size: 1rem;
  }
}
</style>
