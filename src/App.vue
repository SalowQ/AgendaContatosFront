<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { watch, computed, onMounted } from 'vue'
import Header from '@/components/Header.vue'

const { isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()

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
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-500">
    <Header />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>

  <div v-else class="min-h-screen" :class="{ 'login-page': isLoginPage }">
    <RouterView />
  </div>
</template>
