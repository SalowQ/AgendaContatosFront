import { ref, readonly } from 'vue'
import * as contatosAPI from '@/api/contatos.js'

interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

const contatos = ref<Contato[]>([])
const error = ref<string | null>(null)

export const useContacts = () => {
  const carregarContatos = async () => {
    error.value = null

    try {
      const result = await contatosAPI.getContatos()
      if (result.success && result.data) {
        contatos.value = result.data.contacts || []
      } else {
        error.value = result.error || 'Erro ao carregar contatos'
      }
    } catch (err) {
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
        return { success: false, error: result.error }
      }
    } catch (err) {
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
