<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { watch, onMounted, computed } from 'vue'

const { isAuthenticated, user, logout } = useAuth()
const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => route.name === 'login')

const handleLogout = () => {
  logout()
  router.push('/login')
}

// Verificar autenticação quando o componente for montado
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

// Observar mudanças na autenticação
watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push('/login')
  }
})
</script>

<template>
  <div v-if="isAuthenticated" class="app-container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>

        <div class="user-info">
          <span class="welcome-text">Olá, {{ user }}!</span>
          <button @click="handleLogout" class="logout-button">Sair</button>
        </div>
      </div>
    </header>

    <RouterView />
  </div>

  <div v-else class="app-container" :class="{ 'login-page': isLoginPage }">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

nav {
  width: auto;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 2rem;
}

.welcome-text {
  color: var(--color-text);
  font-size: 14px;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background: #c82333;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  .user-info {
    margin-top: 0;
  }
}
</style>
