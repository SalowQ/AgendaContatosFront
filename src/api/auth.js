import httpClient from './httpClient.js'

// Função para fazer logout (limpa dados locais)
export const logout = () => {
  // Limpar dados locais
  localStorage.removeItem('auth_token')
  localStorage.removeItem('usuarioagendacontato')
}

// Função para verificar se o usuário está autenticado (baseado em dados locais)
export const checkAuth = () => {
  const token = localStorage.getItem('auth_token')
  const user = localStorage.getItem('usuarioagendacontato')

  if (token && user) {
    return {
      isAuthenticated: true,
      user: { username: user }
    }
  }

  return { isAuthenticated: false }
}

// Função para fazer login (versão simplificada para desenvolvimento)
export const login = async (username) => {
  try {
    // Simular login bem-sucedido
    const token = 'dev-token-' + Date.now()

    // Salvar dados locais
    localStorage.setItem('auth_token', token)
    localStorage.setItem('usuarioagendacontato', username)

    return {
      success: true,
      user: { username }
    }
  } catch (error) {
    console.error('Erro no login:', error)
    return {
      success: false,
      error: 'Erro ao fazer login'
    }
  }
} 