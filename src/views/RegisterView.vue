<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header da Página -->
      <div class="bg-white rounded-lg shadow-sm text-gray-900 p-4 !mb-6">
        <h1 class="text-3xl font-bold mb-2">Cadastrar Novo Contato</h1>
        <p>Preencha os dados do contato que deseja adicionar</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ContactForm @submit="handleSubmit" />
      </div>

      <!-- Mensagem de Sucesso -->
      <div v-if="successMessage" class="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center">
          <span class="material-icons text-green-500 mr-2">check_circle</span>
          <p class="text-green-700">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Mensagem de Erro -->
      <div v-if="errorMessage" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center">
          <span class="material-icons text-red-500 mr-2">error</span>
          <p class="text-red-700">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '@/composables/useContacts'
import { useModal } from '@/composables/useModal'
import ContactForm from '@/components/ContactForm.vue'

const router = useRouter()
const { adicionarContato } = useContacts()
const { notify } = useModal()

const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async (contatoData: { name: string; phone: string; email: string }) => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const result = await adicionarContato(contatoData)

    if (result.success) {
      notify({
        title: 'Sucesso!',
        message: 'Dados salvos com sucesso.',
        type: 'success',
        confirmText: 'Ok',
      })

      router.push('/')
    } else {
      notify({
        title: 'Erro',
        message: 'Falha ao salvar os dados.',
        type: 'error',
        items: [result.error || ''],
      })
    }
  } catch (err) {
    console.error('Erro ao cadastrar contato:', err)
    notify({
      title: 'Erro',
      message: '',
      type: 'error',
      items: [err instanceof Error ? err.message : 'Erro desconhecido'],
    })
  }
}
</script>
