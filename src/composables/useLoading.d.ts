import { Ref } from 'vue'

export interface UseLoadingReturn {
  isLoading: Ref<boolean>
  loadingMessage: Ref<string>
  showLoading: (message?: string) => void
  hideLoading: () => void
  withLoading: <T>(promise: Promise<T>, message?: string, minDuration?: number) => Promise<T>
}

export declare function useLoading(): UseLoadingReturn
