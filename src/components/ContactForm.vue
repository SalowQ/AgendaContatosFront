<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Nome -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
        Nome Completo *
      </label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        placeholder="Digite o nome completo"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': nameError }"
        @input="nameError = ''"
      />
      <p v-if="nameError" class="mt-1 text-sm text-red-600">{{ nameError }}</p>
    </div>

    <!-- Telefone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2"> Telefone * </label>
      <input
        id="phone"
        v-model="phone"
        type="tel"
        required
        placeholder="Digite o número de telefone"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': phoneError }"
        @input="handlePhoneInput"
      />
      <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email * </label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="Digite o email"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': emailError }"
        @input="emailError = ''"
      />
      <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
    </div>

    <!-- Botões -->
    <div class="flex flex-col sm:flex-row gap-3 pt-4">
      <button
        type="submit"
        class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span class="material-icons pr-2">{{ isEditing ? 'edit' : 'save' }}</span>
        {{ isEditing ? 'Atualizar Contato' : 'Salvar Contato' }}
      </button>

      <button
        type="button"
        @click="clearForm"
        class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span class="material-icons pr-2">clear</span>
        Limpar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  contact?: {
    id: string
    name: string
    phone: string
    email: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  contact: undefined,
})

const emit = defineEmits<{
  submit: [data: { name: string; phone: string; email: string }]
}>()

const name = ref('')
const phone = ref('')
const email = ref('')
const nameError = ref('')
const phoneError = ref('')
const emailError = ref('')

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return value
}

const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatPhoneNumber(target.value)
  phone.value = formatted
  phoneError.value = ''
}

const isFormValid = computed(() => {
  return (
    name.value.trim() &&
    phone.value.trim() &&
    email.value.trim() &&
    !nameError.value &&
    !phoneError.value &&
    !emailError.value
  )
})

const validateForm = () => {
  nameError.value = ''
  phoneError.value = ''
  emailError.value = ''

  if (!name.value.trim()) {
    nameError.value = 'Nome é obrigatório'
  }

  if (!phone.value.trim()) {
    phoneError.value = 'Telefone é obrigatório'
  } else {
    const phoneDigits = phone.value.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      phoneError.value = 'Telefone deve ter 10 ou 11 dígitos'
    }
  }

  if (!email.value.trim()) {
    emailError.value = 'Email é obrigatório'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      emailError.value = 'Email inválido'
    }
  }

  return !nameError.value && !phoneError.value && !emailError.value
}

const clearForm = () => {
  name.value = ''
  phone.value = ''
  email.value = ''
  nameError.value = ''
  phoneError.value = ''
  emailError.value = ''
}

const fillForm = (contact: { name: string; phone: string; email: string }) => {
  name.value = contact.name
  phone.value = formatPhoneNumber(contact.phone)
  email.value = contact.email
}

const formatPhoneForDisplay = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}

const handleSubmit = () => {
  if (validateForm()) {
    const phoneDigits = phone.value.replace(/\D/g, '')
    emit('submit', {
      name: name.value.trim(),
      phone: phoneDigits,
      email: email.value.trim(),
    })
    clearForm()
  }
}

watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      fillForm(newContact)
    } else {
      clearForm()
    }
  },
  { immediate: true },
)
</script>
