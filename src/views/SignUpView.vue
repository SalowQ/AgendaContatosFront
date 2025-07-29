<template>
  <div
    class="flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5 box-border fixed top-0 left-0 z-50"
  >
    <div class="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full mx-auto">
      <h1 class="text-gray-800 mb-4 text-2xl sm:text-3xl font-semibold">Criar Conta</h1>
      <p class="text-gray-600 mb-9 text-base sm:text-lg leading-relaxed">
        Preencha os dados para criar sua conta:
      </p>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-6">
        <div class="flex flex-col text-left">
          <label for="name" class="mb-2 text-gray-800 font-semibold text-base">Nome:</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Digite seu nome completo"
            required
            class="px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            @keyup.enter="handleRegister"
          />
        </div>

        <div class="flex flex-col text-left">
          <label for="email" class="mb-2 text-gray-800 font-semibold text-base">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Digite seu email"
            required
            class="px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            @keyup.enter="handleRegister"
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
            @keyup.enter="handleRegister"
          />
          <PasswordRequirements :password="password" :confirm-password="confirmPassword" />
        </div>

        <div class="flex flex-col text-left">
          <label for="confirmPassword" class="mb-2 text-gray-800 font-semibold text-base"
            >Confirmar Senha:</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            required
            class="px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-500 transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            @keyup.enter="handleRegister"
          />
        </div>

        <button
          type="submit"
          class="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 mt-2 hover:not:disabled:transform hover:not:disabled:-translate-y-1 hover:not:disabled:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          :disabled="!isFormValid"
        >
          Criar Conta
        </button>

        <div class="text-center mt-4">
          <p class="text-gray-600 text-sm">
            Já tem uma conta?
            <router-link
              to="/login"
              class="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Faça login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth.js'
import { useLoading } from '@/composables/useLoading'
import { useModal } from '@/composables/useModal'
import PasswordRequirements from '@/components/PasswordRequirements.vue'

const router = useRouter()
const { withLoading } = useLoading()
const { notify } = useModal()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isFormValid = computed(() => {
  const hasValidPassword =
    password.value.length >= 8 &&
    /[A-Z]/.test(password.value) &&
    /[a-z]/.test(password.value) &&
    /\d/.test(password.value) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password.value) &&
    password.value === confirmPassword.value

  return (
    name.value.trim() &&
    email.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim() &&
    hasValidPassword
  )
})

const handleRegister = async () => {
  if (!isFormValid.value) {
    await notify({
      title: 'Campos Inválidos',
      message: 'Por favor, preencha todos os campos corretamente e atenda aos requisitos de senha',
      type: 'warning',
      confirmText: 'Entendi',
    })
    return
  }

  try {
    const result = await withLoading(
      register(name.value.trim(), email.value.trim(), password.value, confirmPassword.value),
      'Criando conta...',
    )

    if (result.success) {
      await notify({
        title: 'Sucesso!',
        message: result.message || 'Conta criada com sucesso!',
        type: 'success',
        confirmText: 'OK',
      })
      router.push('/login')
    } else {
      await notify({
        title: 'Erro',
        message: result.error || 'Erro ao criar conta',
        type: 'error',
        confirmText: 'OK',
      })
    }
  } catch (err) {
    await notify({
      title: 'Erro',
      message: 'Erro inesperado ao criar conta',
      type: 'error',
      confirmText: 'OK',
    })
  }
}
</script>
