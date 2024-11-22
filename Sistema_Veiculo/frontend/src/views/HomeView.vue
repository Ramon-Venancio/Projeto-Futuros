<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button type="button" @click="this.$router.push('/criar-veiculo')">Criar Veiculo</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
