<template>
  <div
    class="flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5 box-border fixed top-0 left-0 z-50"
  >
    <div class="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full mx-auto">
      <h1 class="text-gray-800 mb-4 text-2xl sm:text-3xl font-semibold">
        Bem-vindo à Agenda de Contatos
      </h1>
      <p class="text-gray-600 mb-9 text-base sm:text-lg leading-relaxed">
        Por favor, insira suas credenciais para continuar:
      </p>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
        <div class="flex flex-col text-left">
          <label for="email" class="mb-2 text-gray-800 font-semibold text-base">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Digite seu email"
            required
            class="px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            @keyup.enter="handleLogin"
          />
        </div>

        <div class="flex flex-col text-left">
          <label for="password" class="mb-2 text-gray-800 font-semibold text-base">Senha:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            required
            class="px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Mensagem de erro -->
        <div
          v-if="error"
          class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
        >
          {{ error }}
        </div>

        <button
          type="submit"
          class="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 mt-2 hover:not:disabled:transform hover:not:disabled:-translate-y-1 hover:not:disabled:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          :disabled="!email.trim() || !password.trim() || isLoading"
        >
          <span v-if="isLoading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (email.value.trim() && password.value.trim()) {
    const result = await login(email.value.trim(), password.value.trim())
    if (result.success) {
      router.push('/')
    }
  }
}
</script>
