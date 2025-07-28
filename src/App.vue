<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { watch, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useLoading } from '@/composables/useLoading'

const { isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()
const { isLoading, loadingMessage } = useLoading()

const isLoginPage = computed(() => route.name === 'login')

onMounted(() => {
  if (route.name) {
    if (isAuthenticated.value && route.name === 'login') {
      router.push('/')
    }
  }
})

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName && isAuthenticated.value && newRouteName === 'login') {
      router.push('/')
    }
  },
  { immediate: true },
)

watch(
  isAuthenticated,
  (newValue) => {
    if (newValue && route.name !== 'login') {
      router.push('/login')
    } else if (newValue && route.name === 'login') {
      router.push('/')
    }
  },
  { immediate: true },
)

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName && newRouteName !== 'login' && !isAuthenticated.value) {
      router.push('/login')
    }
  },
)
</script>

<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
    <AppHeader />
    <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>

  <div v-else class="min-h-screen" :class="{ 'login-page': isLoginPage }">
    <RouterView />
  </div>

  <!-- Loading Spinner Global -->
  <LoadingSpinner :show="isLoading" :message="loadingMessage" />
</template>
