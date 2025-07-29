// Declaração de módulo para auth.js
declare module '@/api/auth.js' {
  export interface LoginResponse {
    success: boolean
    user?: {
      username: string
      email: string
    }
    error?: string
  }

  export interface AuthCheckResponse {
    isAuthenticated: boolean
    user?: {
      username: string
    }
  }

  // Interface para a resposta da API de login
  export interface ApiLoginResponse {
    name: string
    token: string
  }

  export function login(email: string, password: string): Promise<LoginResponse>
  export function logout(): void
  export function checkAuth(): AuthCheckResponse
}
