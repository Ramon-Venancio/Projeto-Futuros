<template>
    <div>
        <h1>Login</h1>
        <LoginForm/>
        <button type="button" @click="this.$router.push('/cadastrar')">Registrar</button>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
    name: 'LoginView',
    components: { LoginForm },
}
</script>

<style>
button {
    margin-top: 10px;
}
</style>