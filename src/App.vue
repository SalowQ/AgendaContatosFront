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
    <header class="header">
      <div class="header-content">
        <div class="nav-container">
          <nav class="nav-menu">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </nav>
        </div>

        <div class="user-section">
          <span class="welcome-text">Olá, {{ user }}!</span>
          <button @click="handleLogout" class="logout-button">Sair</button>
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

.header {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu {
  display: flex;
  gap: 0;
  align-items: center;
}

.nav-link {
  display: inline-block;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 5px;
}

.nav-link:hover {
  background-color: var(--color-background-soft);
  color: var(--color-heading);
}

.nav-link.router-link-active {
  color: var(--color-heading);
  background-color: var(--color-background-soft);
  font-weight: 600;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.welcome-text {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background: #c82333;
  transform: translateY(-1px);
}

.main-content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 15px;
    height: 60px;
  }

  .nav-link {
    padding: 10px 15px;
    font-size: 14px;
  }

  .welcome-text {
    font-size: 12px;
  }

  .logout-button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .user-section {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 10px;
    height: 55px;
  }

  .nav-link {
    padding: 8px 12px;
    font-size: 13px;
    margin: 0 2px;
  }

  .welcome-text {
    display: none;
  }

  .logout-button {
    padding: 6px 10px;
    font-size: 11px;
  }

  .user-section {
    gap: 8px;
  }
}

@media (max-width: 360px) {
  .nav-link {
    padding: 6px 8px;
    font-size: 12px;
    margin: 0 1px;
  }

  .logout-button {
    padding: 5px 8px;
    font-size: 10px;
  }
}
</style>
