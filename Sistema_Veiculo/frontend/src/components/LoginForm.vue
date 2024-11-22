<template>
  <form @submit.prevent="submitLogin">
    <div>
      <label for="email">Email:</label>
      <input 
        type="email"
        id="email"
        v-model="credentials.email"
        required
        >
    </div>
    <div>
      <label for="password">Senha:</label>
      <input 
        type="password"
        id="password"
        v-model="credentials.password"
        required
        >
    </div>
    <button type="submit" :disabled="isLoading">
      {{isLoading ? 'Entrando...' : 'Entrar'}}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      isLoading: false,
      error: null
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin() {
      this.isLoading = true
      this.error = null

      try {
        await this.login(this.credentials)

        this.$router.push('/home')
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    }
  }

}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>