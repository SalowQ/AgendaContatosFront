import { ref, computed, readonly } from 'vue'
import { listarContatos, criarContato, excluirContato, atualizarContato } from '@/api/contatos'
import { showError } from '@/composables/useModal'

export interface Contato {
  id: string
  name: string
  phone: string
  email: string
}

export interface ContatosResponse {
  success: boolean
  data?: Contato[]
  error?: string
}

export interface ContatoResponse {
  success: boolean
  data?: Contato
  error?: string
}

export function useContacts() {
  const contatos = ref<Contato[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const carregarContatos = async () => {
    try {
      const response = await listarContatos()
      if (response.success) {
        contatos.value = response.data || []
      } else {
        if (
          response.error &&
          typeof response.error === 'object' &&
          'errorMessages' in response.error
        ) {
          await showError(response.error as any, 'Erro ao carregar contatos')
        } else {
          error.value = response.error || 'Erro ao carregar contatos'
        }
      }
    } catch (err) {
      console.error('Erro ao carregar contatos:', err)
      error.value = 'Erro inesperado ao carregar contatos'
    }
  }

  const adicionarContato = async (contatoData: Omit<Contato, 'id'>) => {
    try {
      const response = await criarContato(contatoData)
      if (response.success) {
        contatos.value.push(response.data!)
        contatos.value.sort((a, b) => a.name.localeCompare(b.name))
        return { success: true }
      } else {
        if (
          response.error &&
          typeof response.error === 'object' &&
          'errorMessages' in response.error
        ) {
          await showError(response.error as any, 'Erro ao adicionar contato')
        } else {
          error.value = response.error || 'Erro ao adicionar contato'
        }
        return { success: false, error: response.error }
      }
    } catch (err) {
      console.error('Erro ao adicionar contato:', err)
      error.value = 'Erro inesperado ao adicionar contato'
      return { success: false, error: 'Erro inesperado ao adicionar contato' }
    }
  }

  const removerContato = async (id: string) => {
    try {
      const response = await excluirContato(id)
      if (response.success) {
        contatos.value = contatos.value.filter((contato) => contato.id !== id)
        return { success: true }
      } else {
        if (
          response.error &&
          typeof response.error === 'object' &&
          'errorMessages' in response.error
        ) {
          await showError(response.error as any, 'Erro ao remover contato')
        } else {
          error.value = response.error || 'Erro ao remover contato'
        }
        return { success: false, error: response.error }
      }
    } catch (err) {
      console.error('Erro ao remover contato:', err)
      error.value = 'Erro inesperado ao remover contato'
      return { success: false, error: 'Erro inesperado ao remover contato' }
    }
  }

  const editarContato = async (id: string, contatoData: Omit<Contato, 'id'>) => {
    try {
      const response = await atualizarContato(id, contatoData)
      if (response.success) {
        const index = contatos.value.findIndex((contato) => contato.id === id)
        if (index !== -1) {
          contatos.value[index] = { ...response.data!, id }
          contatos.value.sort((a, b) => a.name.localeCompare(b.name))
        }
        return { success: true }
      } else {
        if (
          response.error &&
          typeof response.error === 'object' &&
          'errorMessages' in response.error
        ) {
          await showError(response.error as any, 'Erro ao editar contato')
        } else {
          error.value = response.error || 'Erro ao editar contato'
        }
        return { success: false, error: response.error }
      }
    } catch (err) {
      console.error('Erro ao editar contato:', err)
      error.value = 'Erro inesperado ao editar contato'
      return { success: false, error: 'Erro inesperado ao editar contato' }
    }
  }

  const contatosOrdenados = computed(() => {
    return [...contatos.value].sort((a, b) => a.name.localeCompare(b.name))
  })

  return {
    contatos: readonly(contatos),
    contatosOrdenados,
    isLoading: readonly(isLoading),
    error: readonly(error),
    carregarContatos,
    adicionarContato,
    removerContato,
    editarContato,
  }
}
