import httpClient from './httpClient.js'

export const listarContatos = async () => {
  try {
    const response = await httpClient.get('/contacts')
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao listar contatos'
    }
  }
}

export const criarContato = async (contato) => {
  try {
    const response = await httpClient.post('/contacts', contato)
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao criar contato'
    }
  }
}

export const excluirContato = async (id) => {
  try {
    await httpClient.delete(`/contacts/${id}`)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao excluir contato'
    }
  }
}

export const atualizarContato = async (id, contato) => {
  try {
    const response = await httpClient.put(`/contacts/${id}`, contato)
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao atualizar contato'
    }
  }
}
