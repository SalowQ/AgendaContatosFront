<template>
  <div v-if="show" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 flex flex-col items-center shadow-xl">
      <VueSpinner :size="40" color="#3B82F6" class="mb-4" />
      <p class="text-gray-700 font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueSpinner } from 'vue3-spinners'

interface Props {
  show: boolean
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Carregando...',
})
</script>
