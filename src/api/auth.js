import httpClient from './httpClient.js'

export const logout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('usuarioagendacontato')
}

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

export const login = async (email, password) => {
  try {
    const response = await httpClient.post('/login', {
      email: email,
      password: password
    })

    if (response.data) {
      const { name, token } = response.data

      if (token) {
        localStorage.setItem('auth_token', token)
      }

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

    if (error.response) {
      const responseData = error.response.data
      let errorMessage = 'Credenciais inválidas'

      if (responseData) {
        if (responseData.errorMessages && Array.isArray(responseData.errorMessages)) {
          errorMessage = responseData.errorMessages[0] || errorMessage
        } else if (Array.isArray(responseData)) {
          errorMessage = responseData[0] || errorMessage
        } else if (typeof responseData === 'string') {
          errorMessage = responseData
        } else if (responseData.message) {
          errorMessage = responseData.message
        } else if (responseData.error) {
          errorMessage = responseData.error
        } else if (responseData.errors) {
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
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      }
    } else {
      return {
        success: false,
        error: 'Erro ao fazer login'
      }
    }
  }
}

export const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await httpClient.post('/user', {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })

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

    if (error.response) {
      const responseData = error.response.data
      let errorMessage = 'Erro ao cadastrar usuário'

      if (responseData) {
        if (responseData.errorMessages && Array.isArray(responseData.errorMessages)) {
          errorMessage = responseData.errorMessages[0] || errorMessage
        } else if (Array.isArray(responseData)) {
          errorMessage = responseData[0] || errorMessage
        } else if (typeof responseData === 'string') {
          errorMessage = responseData
        } else if (responseData.message) {
          errorMessage = responseData.message
        } else if (responseData.error) {
          errorMessage = responseData.error
        } else if (responseData.errors) {
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
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      }
    } else {
      return {
        success: false,
        error: 'Erro ao cadastrar usuário'
      }
    }
  }
} 