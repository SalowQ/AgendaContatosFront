<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header da Página -->
      <div class="bg-white rounded-lg shadow-sm text-gray-900 p-4 mb-6">
        <h1 class="text-3xl font-bold mb-2">Página Não Encontrada</h1>
        <p>A página que você está procurando não existe ou foi movida</p>
      </div>

      <!-- Conteúdo Principal -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 !mt-6 text-center">
        <!-- Título e Descrição -->
        <div class="mb-8">
          <h2 class="text-6xl font-bold text-gray-900 mb-4">404</h2>
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Ops! Página não encontrada</h3>
          <p class="text-gray-600 text-lg leading-relaxed">
            A página que você está procurando pode ter sido removida, renomeada ou não existe.
          </p>
        </div>

        <!-- Botões de Ação -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center !mt-3">
          <button
            @click="goHome"
            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span class="material-icons">home</span>
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAuthenticated } = useAuth()

const goHome = () => {
  if (isAuthenticated.value) {
    router.push('/')
  } else {
    router.push('/login')
  }
}
</script>
