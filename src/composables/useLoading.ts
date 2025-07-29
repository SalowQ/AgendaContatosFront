import { ref, readonly } from 'vue'

const isLoading = ref(false)
const loadingMessage = ref('Carregando...')

export const useLoading = () => {
  const showLoading = (message = 'Carregando...') => {
    loadingMessage.value = message
    isLoading.value = true
  }

  const hideLoading = () => {
    isLoading.value = false
  }

  const withLoading = async <T>(
    promise: Promise<T>,
    message = 'Carregando...',
    minDuration = 1000,
  ): Promise<T> => {
    const startTime = Date.now()

    try {
      showLoading(message)
      const result = await promise

      const elapsedTime = Date.now() - startTime
      if (elapsedTime < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsedTime))
      }

      return result
    } finally {
      hideLoading()
    }
  }

  return {
    isLoading: readonly(isLoading),
    loadingMessage: readonly(loadingMessage),
    showLoading,
    hideLoading,
    withLoading,
  }
}
