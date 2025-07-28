import Swal from 'sweetalert2'

type NotifyOptions = {
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmText?: string
}

type ConfirmOptions = {
  title: string
  message: string
  type?: 'warning' | 'question'
  confirmText?: string
  cancelText?: string
}

export function useModal() {
  const notify = async ({ title, message, type = 'info', confirmText = 'OK' }: NotifyOptions) => {
    return Swal.fire({
      title,
      text: message,
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
  }: ConfirmOptions) => {
    const result = await Swal.fire({
      title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    })

    return result.isConfirmed
  }

  return { notify, confirm }
}
