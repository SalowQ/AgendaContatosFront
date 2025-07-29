declare module '@/api/contatos.js' {
  export interface Contato {
    id: string
    name: string
    phone: string
    email: string
  }

  export interface ContatosResponse {
    success: boolean
    data?: Contato[]
    error?: string
  }

  export interface ContatoResponse {
    success: boolean
    data?: Contato
    error?: string
  }

  export interface ContatoInput {
    name: string
    phone: string
    email: string
  }

  export function listarContatos(): Promise<ContatosResponse>
  export function criarContato(contato: ContatoInput): Promise<ContatoResponse>
  export function excluirContato(id: string): Promise<{ success: boolean; error?: string }>
  export function atualizarContato(id: string, contato: ContatoInput): Promise<ContatoResponse>
}
