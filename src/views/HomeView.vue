<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()

// Dados de exemplo - será substituído por dados reais
const contacts = ref([
  { id: 1, name: 'Ana Silva', phone: '(11) 99999-1111', email: 'ana@email.com' },
  { id: 2, name: 'Bruno Santos', phone: '(11) 99999-2222', email: 'bruno@email.com' },
  { id: 3, name: 'Carlos Oliveira', phone: '(11) 99999-3333', email: 'carlos@email.com' },
  { id: 4, name: 'Daniel Costa', phone: '(11) 99999-4444', email: 'daniel@email.com' },
  { id: 11, name: 'Eliana Lima Ferreira', phone: '(11) 99999-5555', email: 'eliana@email.com' },
  { id: 5, name: 'Elena Ferreira', phone: '(11) 99999-5555', email: 'elena@email.com' },
  { id: 6, name: 'Fernando Lima', phone: '(11) 99999-6666', email: 'fernando@email.com' },
  { id: 7, name: 'Gabriela Rocha', phone: '(11) 99999-7777', email: 'gabriela@email.com' },
  { id: 8, name: 'Henrique Alves', phone: '(11) 99999-8888', email: 'henrique@email.com' },
  { id: 9, name: 'Isabela Martins', phone: '(11) 99999-9999', email: 'isabela@email.com' },
  { id: 10, name: 'João Pereira', phone: '(11) 99999-0000', email: 'joao@email.com' },
])

// Organizar contatos por ordem alfabética
const contactsByLetter = computed(() => {
  const grouped = contacts.value.reduce(
    (acc, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(contact)
      return acc
    },
    {} as Record<string, typeof contacts.value>,
  )

  // Ordenar as letras e os contatos dentro de cada letra
  return Object.keys(grouped)
    .sort()
    .reduce(
      (acc, letter) => {
        acc[letter] = grouped[letter].sort((a, b) => a.name.localeCompare(b.name))
        return acc
      },
      {} as Record<string, typeof contacts.value>,
    )
})

// Todas as letras do alfabeto para mostrar seções vazias
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header da Página -->
      <div class="mb-8 text-gray-900">
        <h1 class="text-3xl font-bold mb-2">Agenda de Contatos</h1>
        <p>Visualize e gerencie seus contatos organizados alfabeticamente</p>
      </div>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <span class="material-icons text-blue-500 !text-5xl mr-3">people</span>
            <div>
              <p class="text-sm font-medium text-gray-600">Total de Contatos</p>
              <p class="text-2xl font-bold text-gray-900">{{ contacts.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
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
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
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
                        contact.name.charAt(0)
                      }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ contact.name }}</p>
                      <p class="text-xs text-gray-500 truncate">{{ contact.phone }}</p>
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
