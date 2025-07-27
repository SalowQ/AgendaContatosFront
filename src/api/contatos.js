import httpClient from './httpClient.js'

export const getContatos = async () => {
  try {
    const response = await httpClient.get('/contacts')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao buscar contatos'
    }
  }
}

