declare module '@/api/auth.js' {
  export interface LoginResponse {
    success: boolean
    user?: {
      username: string
      email: string
    }
    error?: string
  }

  export interface RegisterResponse {
    success: boolean
    message?: string
    error?: string
  }

  export interface AuthCheckResponse {
    isAuthenticated: boolean
    user?: {
      username: string
    }
  }

  export interface ApiLoginResponse {
    name: string
    token: string
  }

  export function login(email: string, password: string): Promise<LoginResponse>
  export function register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<RegisterResponse>
  export function logout(): void
  export function checkAuth(): AuthCheckResponse
}
