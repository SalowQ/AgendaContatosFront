interface Contato {
  id: number
  name: string
  phone: string
  email: string
}

interface APIResponse {
  contacts: Contato[]
}

interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export declare function getContatos(): Promise<APIResponse<APIResponse>>
export declare function getContatoById(id: number): Promise<APIResponse<Contato>>
export declare function createContato(
  contatoData: Omit<Contato, 'id'>,
): Promise<APIResponse<Contato>>
export declare function updateContato(
  id: number,
  contatoData: Partial<Contato>,
): Promise<APIResponse<Contato>>
export declare function deleteContato(id: number): Promise<APIResponse<void>>
export declare function searchContatos(query: string): Promise<APIResponse<Contato[]>>
export declare function getContatosByLetter(letter: string): Promise<APIResponse<Contato[]>>
export declare function getContatosStats(): Promise<APIResponse<any>>
export declare function importContatos(contatosData: any): Promise<APIResponse<any>>
export declare function exportContatos(): Promise<APIResponse<Blob>>
