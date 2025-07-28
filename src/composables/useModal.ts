import Swal from 'sweetalert2'

export type ErrorResponse = {
  errorMessages: string[]
}

type NotifyOptions = {
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmText?: string
  items?: string[]
}

type ConfirmOptions = {
  title: string
  message: string
  type?: 'warning' | 'question'
  confirmText?: string
  cancelText?: string
  items?: string[]
}

export function useModal() {
  const formatMessage = (message: string, items?: string[]): string => {
    if (!items || items.length === 0) {
      return message
    }

    const itemsList = items.map((item) => `• ${item}`).join('\n')
    return itemsList
  }

  const notify = async ({
    title,
    message,
    type = 'info',
    confirmText = 'OK',
    items,
  }: NotifyOptions) => {
    const formattedMessage = formatMessage(message, items)

    return Swal.fire({
      title,
      text: formattedMessage,
      icon: type,
      confirmButtonText: confirmText,
    })
  }

  const confirm = async ({
    title,
    message,
    type = 'question',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    items,
  }: ConfirmOptions) => {
    const formattedMessage = formatMessage(message, items)

    const result = await Swal.fire({
      title,
      text: formattedMessage,
      icon: type,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    })

    return result.isConfirmed
  }

  return { notify, confirm }
}

export function showError(error: ErrorResponse, title: string = 'Erro') {
  const { notify } = useModal()

  return notify({
    title,
    message: '',
    type: 'error',
    items: error.errorMessages,
  })
}
