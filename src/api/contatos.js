import httpClient from './httpClient.js'
import { withLoading } from '@/composables/useLoading.js'

export const listarContatos = async () => {
  return withLoading(
    httpClient.get('/contatos'),
    1500
  )
}

export const criarContato = async (contato) => {
  return withLoading(
    httpClient.post('/contatos', contato),
    1500
  )
}

export const excluirContato = async (id) => {
  return withLoading(
    httpClient.delete(`/contatos/${id}`),
    1500
  )
}

export const atualizarContato = async (id, contato) => {
  return withLoading(
    httpClient.put(`/contatos/${id}`, contato),
    1500
  )
}
