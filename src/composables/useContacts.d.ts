import { Ref } from 'vue'

interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

export interface UseContactsReturn {
  contatos: Ref<Contato[]>
  error: Ref<string | null>
  carregarContatos: () => Promise<void>
  adicionarContato: (
    contatoData: Omit<Contato, 'id'>,
  ) => Promise<{ success: boolean; error?: string }>
}

export declare function useContacts(): UseContactsReturn
