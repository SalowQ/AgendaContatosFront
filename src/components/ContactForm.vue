<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Nome -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
        Nome Completo *
      </label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        placeholder="Digite o nome completo"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.name }"
        @input="errors.name = ''"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <!-- Telefone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2"> Telefone * </label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        required
        placeholder="Digite o número de telefone"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.phone }"
        @input="handlePhoneInput"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email * </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        placeholder="Digite o email"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email }"
        @input="errors.email = ''"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
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
        @click="limparFormulario"
        class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span class="material-icons pr-2">clear</span>
        Limpar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

interface Props {
  contact?: Contato
  isEditing?: boolean
}

interface Emits {
  (e: 'submit', data: Omit<Contato, 'id'>): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

// Formulário
const form = reactive({
  name: '',
  phone: '',
  email: '',
})

// Erros de validação
const errors = reactive({
  name: '',
  phone: '',
  email: '',
})

// Função para formatar telefone durante digitação
const formatarTelefoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')

  if (value.length > 11) {
    value = value.substring(0, 11)
  }

  if (value.length >= 2) {
    const ddd = value.substring(0, 2)
    const numero = value.substring(2)

    if (numero.length <= 4) {
      value = `(${ddd}) ${numero}`
    } else if (numero.length <= 8) {
      value = `(${ddd}) ${numero.substring(0, 4)}-${numero.substring(4)}`
    } else {
      value = `(${ddd}) ${numero.substring(0, 5)}-${numero.substring(5)}`
    }
  }

  form.phone = value
}

// Função para lidar com input do telefone (formatação + limpeza de erro)
const handlePhoneInput = (event: Event) => {
  formatarTelefoneInput(event)
  errors.phone = ''
}

// Validação do formulário
const validarFormulario = (): boolean => {
  let isValid = true

  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })

  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }

  const phoneNumbers = form.phone.replace(/\D/g, '')
  if (!phoneNumbers) {
    errors.phone = 'Telefone é obrigatório'
    isValid = false
  } else if (phoneNumbers.length !== 10) {
    errors.phone = 'Telefone deve ter exatamente 10 dígitos'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  return isValid
}

// Limpar formulário
const limparFormulario = () => {
  form.name = ''
  form.phone = ''
  form.email = ''

  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })
}

// Preencher formulário com dados do contato (para edição)
const preencherFormulario = (contact: Contato) => {
  form.name = contact.name
  form.phone = formatarTelefone(contact.phone)
  form.email = contact.email
}

// Função para formatar número de telefone
const formatarTelefone = (phone: string): string => {
  if (!phone) return ''

  const numeros = phone.replace(/\D/g, '')

  if (numeros.length === 10 || numeros.length === 11) {
    const ddd = numeros.substring(0, 2)
    const numero = numeros.substring(2)

    if (numero.length === 8) {
      return `(${ddd}) ${numero.substring(0, 4)}-${numero.substring(4)}`
    } else if (numero.length === 9) {
      return `(${ddd}) ${numero.substring(0, 5)}-${numero.substring(5)}`
    } else {
      return `(${ddd}) ${numero}`
    }
  }

  return phone
}

// Submissão do formulário
const handleSubmit = async () => {
  if (!validarFormulario()) {
    return
  }

  const contatoData = {
    name: form.name.trim(),
    phone: form.phone.replace(/\D/g, ''),
    email: form.email.trim().toLowerCase(),
  }

  emit('submit', contatoData)
}

// Watch para preencher formulário quando contact mudar (edição)
watch(
  () => props.contact,
  (newContact) => {
    if (newContact && props.isEditing) {
      preencherFormulario(newContact)
    }
  },
  { immediate: true },
)
</script>
