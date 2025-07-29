<template>
  <div class="mt-2">
    <p class="text-sm text-gray-600 mb-2">A senha deve conter:</p>
    <ul class="space-y-1">
      <li
        v-for="requirement in requirements"
        :key="requirement.id"
        class="flex items-center text-sm"
        :class="requirement.met ? 'text-green-600' : 'text-gray-500'"
      >
        <span
          class="mr-2 w-4 h-4 flex items-center justify-center rounded-full"
          :class="requirement.met ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'"
        >
          <svg v-if="requirement.met" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        {{ requirement.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  password: string
  confirmPassword: string
}

const props = defineProps<Props>()

const requirements = computed(() => [
  {
    id: 'length',
    text: 'Mínimo de 8 caracteres',
    met: props.password.length >= 8,
  },
  {
    id: 'uppercase',
    text: 'Pelo menos uma letra maiúscula',
    met: /[A-Z]/.test(props.password),
  },
  {
    id: 'lowercase',
    text: 'Pelo menos uma letra minúscula',
    met: /[a-z]/.test(props.password),
  },
  {
    id: 'number',
    text: 'Pelo menos um número',
    met: /\d/.test(props.password),
  },
  {
    id: 'special',
    text: 'Pelo menos um caractere especial (!@#$%^&*)',
    met: /[!@#$%^&*(),.?":{}|<>]/.test(props.password),
  },
  {
    id: 'match',
    text: 'As senhas devem ser iguais',
    met: props.password === props.confirmPassword && props.password.length > 0,
  },
])

const allRequirementsMet = computed(() => {
  return requirements.value.every((req) => req.met)
})

defineExpose({
  allRequirementsMet,
})
</script>
