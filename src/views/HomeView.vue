<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useContacts } from '@/composables/useContacts'
import { useAuth } from '@/composables/useAuth'
import { useModal, showError, type ErrorResponse } from '@/composables/useModal'
import { deleteContato } from '@/api/contatos.js'

interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

const { contatos, error, carregarContatos } = useContacts()
const { isAuthenticated } = useAuth()
const { confirm, notify } = useModal()

// Organizar contatos por ordem alfabética
const contactsByLetter = computed(() => {
  const grouped: Record<string, typeof contatos.value> = contatos.value.reduce(
    (acc: Record<string, typeof contatos.value>, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(contact)
      return acc
    },
    {},
  )

  // Ordenar as letras e os contatos dentro de cada letra
  return Object.keys(grouped)
    .sort()
    .reduce(
      (acc, letter) => {
        acc[letter] = grouped[letter].sort((a, b) => a.name.localeCompare(b.name))
        return acc
      },
      {} as Record<string, typeof contatos.value>,
    )
})

// Todas as letras do alfabeto para mostrar seções vazias
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Função para formatar número de telefone
const formatarTelefone = (phone: string): string => {
  if (!phone) return ''

  // Remove caracteres não numéricos
  const numeros = phone.replace(/\D/g, '')

  // Verifica se tem exatamente 11 dígitos (DDD + número)
  if (numeros.length === 10 || numeros.length === 11) {
    const ddd = numeros.substring(0, 2)
    const numero = numeros.substring(2)

    // Formata baseado no tamanho do número
    if (numero.length === 8) {
      // (11) 1234-5678
      return `(${ddd}) ${numero.substring(0, 4)}-${numero.substring(4)}`
    } else if (numero.length === 9) {
      // (11) 12345-6789
      return `(${ddd}) ${numero.substring(0, 5)}-${numero.substring(5)}`
    } else {
      // Formato genérico se não se encaixar nos padrões
      return `(${ddd}) ${numero}`
    }
  }

  // Retorna o número original se não conseguir formatar
  return phone
}

// Função para excluir contato
const excluirContato = async (contact: Contato) => {
  const confirmed = await confirm({
    title: 'Confirmar Exclusão',
    message: `Tem certeza que deseja excluir o contato "${contact.name}"?`,
    type: 'warning',
    confirmText: 'Excluir',
    cancelText: 'Cancelar',
  })

  if (confirmed) {
    try {
      const result = await deleteContato(contact.id)

      if (result.success) {
        // Modal de sucesso
        await notify({
          title: 'Contato Excluído',
          message: `O contato "${contact.name}" foi excluído com sucesso!`,
          type: 'success',
          confirmText: 'OK',
        })

        // Recarregar contatos
        await carregarContatos()
      } else {
        // Verifica se o erro tem o formato ErrorResponse
        if (result.error && typeof result.error === 'object' && 'errorMessages' in result.error) {
          await showError(result.error as ErrorResponse, 'Erro ao excluir contato')
        } else {
          await notify({
            title: 'Erro ao Excluir',
            message: result.error || 'Erro ao excluir contato',
            type: 'error',
            confirmText: 'OK',
          })
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      await notify({
        title: 'Erro ao Excluir',
        message: '',
        type: 'error',
        items: [errorMessage],
      })
    }
  }
}

// Lifecycle
onMounted(() => {
  if (isAuthenticated.value) {
    carregarContatos()
  }
})
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header da Página -->
      <div class="bg-white rounded-lg shadow-sm text-gray-900 p-4">
        <h1 class="text-3xl font-bold mb-2">Agenda de Contatos</h1>
        <p>Visualize e gerencie seus contatos organizados alfabeticamente</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <span class="material-icons text-red-500 mr-2">error</span>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>

      <!-- Estatísticas -->
      <div v-if="!error" class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center gap-2">
            <span class="material-icons text-blue-500 !text-5xl mr-3">people</span>
            <div>
              <p class="text-sm font-medium text-gray-600">Total de Contatos</p>
              <p class="text-2xl font-bold text-gray-900">{{ contatos.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center gap-2">
            <span class="material-icons text-green-500 !text-5xl mr-3">category</span>
            <div>
              <p class="text-sm font-medium text-gray-600">Letras Utilizadas</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ Object.keys(contactsByLetter).length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid Alfabético -->
      <div v-if="!error" class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Contatos por Ordem Alfabética</h2>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="letter in alphabet"
              :key="letter"
              class="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <!-- Cabeçalho da Letra -->
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-bold text-gray-900">{{ letter }}</h3>
                <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {{ contactsByLetter[letter]?.length || 0 }}
                </span>
              </div>

              <!-- Contatos da Letra -->
              <div
                v-if="contactsByLetter[letter] && contactsByLetter[letter].length > 0"
                class="space-y-2"
              >
                <div
                  v-for="contact in contactsByLetter[letter]"
                  :key="contact.id"
                  class="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div class="flex items-center space-x-3 gap-2">
                    <div
                      class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white text-sm font-semibold">{{
                        contact.name.charAt(0).toUpperCase()
                      }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ contact.name }}</p>
                      <p class="text-xs text-gray-500 truncate">
                        {{ formatarTelefone(contact.phone) }}
                      </p>
                      <p class="text-xs text-gray-500 truncate">
                        {{ contact.email }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1">
                      <button
                        class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        title="Editar contato"
                      >
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button
                        class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Excluir contato"
                        @click="excluirContato(contact)"
                      >
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Estado Vazio -->
              <div v-else class="text-center py-4">
                <span class="material-icons text-gray-300 text-2xl mb-2">person_off</span>
                <p class="text-xs text-gray-500">Nenhum contato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
