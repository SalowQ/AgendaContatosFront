<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <main>
    <h1>Agenda de Contatos</h1>
    <p>Bem-vindo ao seu sistema de gerenciamento de contatos.</p>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
</style>
