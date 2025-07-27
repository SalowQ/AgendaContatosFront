<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <main>
    <h1>Bem-vindo à Agenda de Contatos</h1>
    <p v-if="user">Olá, {{ user }}! Aqui você pode gerenciar seus contatos.</p>
    <p>Esta é a página inicial da sua agenda de contatos.</p>
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
