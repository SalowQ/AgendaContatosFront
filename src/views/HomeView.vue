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
