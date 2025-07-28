import httpClient from './httpClient.js'

// Função auxiliar para executar com loading
const withLoading = async (promise, message, minDuration = 1000) => {
  // Importação dinâmica para evitar dependência circular
  const { useLoading } = await import('../composables/useLoading.js')
  const { withLoading: executeWithLoading } = useLoading()

  return executeWithLoading(promise, message, minDuration)
}

export const getContatos = async () => {
  return withLoading(
    (async () => {
      try {
        const response = await httpClient.get('/contacts')
        return { success: true, data: response.data }
      } catch (error) {
        console.error('Erro ao buscar contatos:', error)
        return {
          success: false,
          error: error.response?.data?.message || 'Erro ao buscar contatos',
        }
      }
    })(),
    'Carregando contatos...',
    1500, // 1.5 segundos para teste
  )
}

// Criar novo contato
export const createContato = async (contatoData) => {
  return withLoading(
    (async () => {
      try {
        const response = await httpClient.post('/contacts', contatoData)
        return { success: true, data: response.data }
      } catch (error) {
        console.error('Erro ao criar contato:', error)
        return {
          success: false,
          error: error.response?.data?.message || 'Erro ao criar contato',
        }
      }
    })(),
    'Salvando contato...',
    1500, // 1.5 segundos para teste
  )
}

// Excluir contato
export const deleteContato = async (id) => {
  return withLoading(
    (async () => {
      try {
        await httpClient.delete(`/contacts/${id}`)
        return { success: true }
      } catch (error) {
        console.error('Erro ao excluir contato:', error)
        return {
          success: false,
          error: error.response?.data?.message || 'Erro ao excluir contato',
        }
      }
    })(),
    'Excluindo contato...',
    1500, // 1.5 segundos para teste
  )
}

// Atualizar contato
export const updateContato = async (id, contatoData) => {
  return withLoading(
    (async () => {
      try {
        const response = await httpClient.put(`/contacts/${id}`, contatoData)
        return { success: true, data: response.data }
      } catch (error) {
        console.error('Erro ao atualizar contato:', error)
        return {
          success: false,
          error: error.response?.data?.message || 'Erro ao atualizar contato',
        }
      }
    })(),
    'Atualizando contato...',
    1500, // 1.5 segundos para teste
  )
}
