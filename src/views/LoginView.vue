<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Bem-vindo à Agenda de Contatos</h1>
      <p>Por favor, insira seu nome para continuar:</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Nome:</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Digite seu nome"
            required
            class="form-input"
            @keyup.enter="handleLogin"
          />
        </div>

        <button type="submit" class="login-button" :disabled="!username.trim()">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const username = ref('')

const handleLogin = () => {
  if (username.value.trim()) {
    login(username.value.trim())
    router.push('/')
  }
}
</script>

<style scoped>
.login-container {
  display: flex !important;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.login-card {
  background: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
}

.login-card h1 {
  color: #333;
  margin-bottom: 15px;
  font-size: 28px;
  font-weight: 600;
}

.login-card p {
  color: #666;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
  font-size: 16px;
}

.form-input {
  padding: 15px 18px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .login-container {
    padding: 15px;
  }

  .login-card {
    padding: 40px 30px;
    max-width: 100%;
  }

  .login-card h1 {
    font-size: 24px;
  }

  .login-card p {
    font-size: 16px;
  }

  .form-input {
    padding: 12px 16px;
    font-size: 16px;
  }

  .login-button {
    padding: 12px 24px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .login-card h1 {
    font-size: 22px;
  }

  .login-card p {
    font-size: 15px;
  }
}
</style>
