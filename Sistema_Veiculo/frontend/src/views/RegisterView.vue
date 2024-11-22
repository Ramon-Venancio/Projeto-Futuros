<template>
  <div>
    <h1>Registrar</h1>
    <RegisterForm/>
    <button type="button" @click="this.$router.push('/login')">Login</button>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  name: 'LoginView',
  components: { RegisterForm }
}
</script>

<style>
</style>