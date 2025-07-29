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

// Função para fazer login via API
export const login = async (email, password) => {
  try {
    const response = await httpClient.post('/login', {
      email: email,
      password: password
    })

    // Se a requisição foi bem-sucedida, salvar dados locais
    if (response.data) {
      const { name, token } = response.data

      // Guardar o token no localStorage
      if (token) {
        localStorage.setItem('auth_token', token)
      }

      // Guardar o nome do usuário
      if (name) {
        localStorage.setItem('usuarioagendacontato', name)
      }

      return {
        success: true,
        user: {
          username: name || email,
          email: email
        }
      }
    }

    return {
      success: false,
      error: 'Resposta inválida do servidor'
    }
  } catch (error) {
    console.error('Erro no login:', error)

    // Tratar diferentes tipos de erro
    if (error.response) {
      // Erro de resposta do servidor (4xx, 5xx)
      const responseData = error.response.data
      let errorMessage = 'Credenciais inválidas'

      // Verificar diferentes formatos de erro que podem vir do backend
      if (responseData) {
        if (responseData.errorMessages && Array.isArray(responseData.errorMessages)) {
          // Formato específico do backend: { errorMessages: ["string"] }
          errorMessage = responseData.errorMessages[0] || errorMessage
        } else if (Array.isArray(responseData)) {
          // Se for um array de erros, pegar a primeira mensagem
          errorMessage = responseData[0] || errorMessage
        } else if (typeof responseData === 'string') {
          // Se for uma string direta
          errorMessage = responseData
        } else if (responseData.message) {
          // Se for um objeto com propriedade message
          errorMessage = responseData.message
        } else if (responseData.error) {
          // Se for um objeto com propriedade error
          errorMessage = responseData.error
        } else if (responseData.errors) {
          // Se for um objeto com array de errors
          errorMessage = Array.isArray(responseData.errors)
            ? responseData.errors[0]
            : responseData.errors
        }
      }

      return {
        success: false,
        error: errorMessage
      }
    } else if (error.request) {
      // Erro de rede
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      }
    } else {
      // Outros erros
      return {
        success: false,
        error: 'Erro ao fazer login'
      }
    }
  }
}

// Função para cadastrar usuário via API
export const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await httpClient.post('/user', {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })

    // Se a requisição foi bem-sucedida
    if (response.data) {
      return {
        success: true,
        message: 'Usuário cadastrado com sucesso!'
      }
    }

    return {
      success: false,
      error: 'Resposta inválida do servidor'
    }
  } catch (error) {
    console.error('Erro no cadastro:', error)

    // Tratar diferentes tipos de erro
    if (error.response) {
      // Erro de resposta do servidor (4xx, 5xx)
      const responseData = error.response.data
      let errorMessage = 'Erro ao cadastrar usuário'

      // Verificar diferentes formatos de erro que podem vir do backend
      if (responseData) {
        if (responseData.errorMessages && Array.isArray(responseData.errorMessages)) {
          // Formato específico do backend: { errorMessages: ["string"] }
          errorMessage = responseData.errorMessages[0] || errorMessage
        } else if (Array.isArray(responseData)) {
          // Se for um array de erros, pegar a primeira mensagem
          errorMessage = responseData[0] || errorMessage
        } else if (typeof responseData === 'string') {
          // Se for uma string direta
          errorMessage = responseData
        } else if (responseData.message) {
          // Se for um objeto com propriedade message
          errorMessage = responseData.message
        } else if (responseData.error) {
          // Se for um objeto com propriedade error
          errorMessage = responseData.error
        } else if (responseData.errors) {
          // Se for um objeto com array de errors
          errorMessage = Array.isArray(responseData.errors)
            ? responseData.errors[0]
            : responseData.errors
        }
      }

      return {
        success: false,
        error: errorMessage
      }
    } else if (error.request) {
      // Erro de rede
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      }
    } else {
      // Outros erros
      return {
        success: false,
        error: 'Erro ao cadastrar usuário'
      }
    }
  }
} 