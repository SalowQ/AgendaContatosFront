import { ref, readonly } from 'vue'
import * as contatosAPI from '@/api/contatos.js'
import { useModal, showError, type ErrorResponse } from '@/composables/useModal'

interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

const contatos = ref<Contato[]>([])
const error = ref<string | null>(null)
const { notify } = useModal()

export const useContacts = () => {
  const carregarContatos = async () => {
    error.value = null

    try {
      const result = await contatosAPI.getContatos()
      if (result.success && result.data) {
        contatos.value = result.data.contacts || []
      } else {
        error.value = result.error || 'Erro ao carregar contatos'

        // Verifica se o erro tem o formato ErrorResponse
        if (result.error && typeof result.error === 'object' && 'errorMessages' in result.error) {
          await showError(result.error as ErrorResponse, 'Erro ao carregar contatos')
        } else {
          notify({
            title: 'Erro',
            message: result.error || 'Erro ao carregar contatos',
            type: 'error',
          })
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      notify({
        title: 'Erro',
        message: '',
        type: 'error',
        items: [errorMessage],
      })
      error.value = 'Erro ao carregar contatos'
      console.error(err)
    }
  }

  const adicionarContato = async (contatoData: Omit<Contato, 'id'>) => {
    try {
      const result = await contatosAPI.createContato(contatoData)
      if (result.success && result.data) {
        // Adiciona o novo contato à lista
        contatos.value.push(result.data)
        // Reordena a lista alfabeticamente
        contatos.value.sort((a, b) => a.name.localeCompare(b.name))
        return { success: true }
      } else {
        // Verifica se o erro tem o formato ErrorResponse
        if (result.error && typeof result.error === 'object' && 'errorMessages' in result.error) {
          await showError(result.error as ErrorResponse, 'Erro ao adicionar contato')
        } else {
          notify({
            title: 'Erro',
            message: result.error || 'Erro ao adicionar contato',
            type: 'error',
          })
        }
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      notify({
        title: 'Erro',
        message: 'Erro ao adicionar contato',
        type: 'error',
        items: [errorMessage],
      })
      console.error('Erro ao adicionar contato:', err)
      return { success: false, error: 'Erro ao adicionar contato' }
    }
  }

  return {
    contatos,
    error: readonly(error),
    carregarContatos,
    adicionarContato,
  }
}
