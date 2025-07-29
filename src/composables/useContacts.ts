import { ref, computed, readonly } from 'vue'
import { listarContatos, criarContato, excluirContato, atualizarContato } from '@/api/contatos.js'
import { showError } from '@/composables/useModal'
import { useLoading } from '@/composables/useLoading'

interface Contato {
  id: string
  name: string
  phone: string
  email: string
}

interface ContatosResponse {
  success: boolean
  data?: Contato[] | { data?: Contato[]; contacts?: Contato[]; items?: Contato[] }
  error?: string
}

interface ContatoResponse {
  success: boolean
  data?: Contato
  error?: string
}

interface ContatoInput {
  name: string
  phone: string
  email: string
}

export function useContacts() {
  const contatos = ref<Contato[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const { withLoading } = useLoading()

  const carregarContatos = async () => {
    try {
      const response = (await withLoading(
        listarContatos(),
        'Carregando contatos...',
      )) as ContatosResponse

      if (response.success) {
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          contatos.value = response.data
        } else if (response.data && typeof response.data === 'object' && response.data !== null) {
          // If response.data is an object, try to extract array from it
          const dataObj = response.data as {
            data?: Contato[]
            contacts?: Contato[]
            items?: Contato[]
          }
          const dataArray = Array.isArray(dataObj.data)
            ? dataObj.data
            : Array.isArray(dataObj.contacts)
              ? dataObj.contacts
              : Array.isArray(dataObj.items)
                ? dataObj.items
                : []
          contatos.value = dataArray
        } else {
          contatos.value = []
        }
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
        // Ensure contatos is always an array even on error
        contatos.value = []
      }
    } catch (err) {
      error.value = 'Erro inesperado ao carregar contatos'
      // Ensure contatos is always an array even on error
      contatos.value = []
    }
  }

  const adicionarContato = async (contatoData: ContatoInput) => {
    try {
      const response = (await withLoading(
        criarContato(contatoData),
        'Salvando contato...',
      )) as ContatoResponse

      if (response.success) {
        contatos.value.push(response.data!)
        contatos.value.sort((a, b) => {
          if (!a.name || !b.name) return 0
          return a.name.localeCompare(b.name)
        })
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
      error.value = 'Erro inesperado ao adicionar contato'
      return { success: false, error: 'Erro inesperado ao adicionar contato' }
    }
  }

  const removerContato = async (id: string) => {
    try {
      const response = (await withLoading(excluirContato(id), 'Excluindo contato...')) as {
        success: boolean
        error?: string
      }

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
      error.value = 'Erro inesperado ao remover contato'
      return { success: false, error: 'Erro inesperado ao remover contato' }
    }
  }

  const editarContato = async (id: string, contatoData: ContatoInput) => {
    try {
      const response = (await withLoading(
        atualizarContato(id, contatoData),
        'Atualizando contato...',
      )) as ContatoResponse

      if (response.success) {
        const index = contatos.value.findIndex((contato) => contato.id === id)
        if (index !== -1) {
          contatos.value[index] = { ...response.data!, id }
          contatos.value.sort((a, b) => {
            if (!a.name || !b.name) return 0
            return a.name.localeCompare(b.name)
          })
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
      error.value = 'Erro inesperado ao editar contato'
      return { success: false, error: 'Erro inesperado ao editar contato' }
    }
  }

  const contatosOrdenados = computed(() => {
    return [...contatos.value].sort((a, b) => {
      if (!a.name || !b.name) return 0
      return a.name.localeCompare(b.name)
    })
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
