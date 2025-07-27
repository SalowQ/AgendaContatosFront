<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 shadow-sm backdrop-blur-sm bg-indigo-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e Título -->
        <div class="flex items-center space-x-4 gap-2">
          <div
            class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md pr-1"
          >
            <span class="material-icons text-white text-xl">calendar_today</span>
          </div>
          <div class="hidden sm:block pr-2">
            <h1 class="text-xl font-bold text-gray-900">Agenda de Contatos</h1>
            <p class="text-xs text-gray-500">Gerencie seus contatos</p>
          </div>
        </div>

        <!-- Navegação -->
        <nav class="hidden md:flex items-center space-x-6">
          <button
            v-for="item in menuItems"
            :key="item.label"
            @click="item.command"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium pr-2"
          >
            <span class="material-icons text-lg">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Menu Mobile -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 pr-1"
          >
            <span class="material-icons text-xl">menu</span>
          </button>
        </div>

        <!-- Área do Usuário (Desktop) -->
        <div class="hidden md:flex items-center space-x-4 gap-2">
          <div class="flex items-center space-x-3 gap-2 pr-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm font-semibold">{{ userInitials }}</span>
            </div>
            <div class="hidden lg:block pr-1">
              <p class="text-sm font-medium text-gray-900">Olá, {{ user }}!</p>
              <p class="text-xs text-gray-500">Bem-vindo de volta</p>
            </div>
          </div>

          <button
            @click="handleLogout"
            class="flex items-center space-x-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            title="Sair"
          >
            <span class="material-icons text-lg">logout</span>
            <span class="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      <!-- Menu Mobile Expandido -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <!-- Área do Usuário Mobile -->
        <div class="flex items-center space-x-3 px-4 py-3 mb-4 bg-gray-50 rounded-lg gap-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-sm font-semibold">{{ userInitials }}</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">Olá, {{ user }}!</p>
            <p class="text-xs text-gray-500">Bem-vindo de volta</p>
          </div>
        </div>

        <!-- Navegação Mobile -->
        <nav class="flex flex-col space-y-2 mb-4">
          <button
            v-for="item in menuItems"
            :key="item.label"
            @click="handleMobileMenuClick(item.command)"
            class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium pr-2 gap-2"
          >
            <span class="material-icons text-lg">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Botão Sair Mobile -->
        <div class="border-t border-gray-200 pt-4">
          <button
            @click="handleMobileLogout"
            class="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium gap-2"
          >
            <span class="material-icons text-lg">logout</span>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const isMobileMenuOpen = ref(false)

const menuItems = [
  {
    label: 'Início',
    icon: 'home',
    command: () => router.push('/'),
  },
  {
    label: 'Adicionar Contato',
    icon: 'person_add',
    command: () => router.push('/about'),
  },
]

const userInitials = computed(() => {
  if (!user.value) return 'U'
  return user.value
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleLogout = () => {
  logout()
  router.push('/login')
}

const handleMobileLogout = () => {
  logout()
  router.push('/login')
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleMobileMenuClick = (command: () => void) => {
  command()
  isMobileMenuOpen.value = false
}
</script>
