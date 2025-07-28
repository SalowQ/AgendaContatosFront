<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useLoading } from '@/composables/useLoading'

const { isAuthenticated } = useAuth()
const route = useRoute()
const { isLoading, loadingMessage } = useLoading()

const isNotFoundPage = computed(() => route.name === 'not-found')
</script>

<template>
  <div
    v-if="isAuthenticated && !isNotFoundPage"
    class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600"
  >
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>

  <div v-else class="min-h-screen">
    <RouterView />
  </div>

  <LoadingSpinner :show="isLoading" :message="loadingMessage" />
</template>
