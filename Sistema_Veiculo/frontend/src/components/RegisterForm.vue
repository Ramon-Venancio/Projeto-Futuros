<template>
  <form @submit.prevent="submitRegister">
    <div>
      <label for="username">Nome de Usuário:</label>
      <input
        type="text"
        id="username"
        v-model="credentials.username"
        required
      />
    </div>
    <div>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="credentials.email"
        required 
      />
    </div>
    <div>
      <label for="password">Senha:</label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        required
      />
    </div>
    <button type="submit">Registrar</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
import apiClient from "@/config/axiosConfig";

export default {
  name: "RegisterForm",
  data() {
    return {
      credentials: {
        username: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async submitRegister() {
      const url = '/api/usuarios'
      this.error = null

      try {
        await apiClient.post(url, this.credentials);

        this.$router.push('/login')
      } catch (err) {
        this.error = err.message
      }
    },
  },
};
</script>

<style>
</style>