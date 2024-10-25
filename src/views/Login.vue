<template>
  <div class="background">
    <div class="Login">
      <form @submit.prevent>
        <h1>LOGIN</h1>
        <label>Usuário</label>
        <input type="text" />
        <label>Senha</label>
        <input type="password" />
        <button type="button" @click="goToHome">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  methods: {
    goToHome() {
      this.$router.push('/HomeView');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.Login {
  border: 1px solid black;
  width: 400px;
  height: 500px; 
  display: flex;
  padding-top: 80px;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
  margin: 0px auto; 
  color: rgb(9, 5, 5);
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.75);
  overflow: hidden;
}

form {
  border-radius: 20px;
  display: block;
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  gap: 5px;
  background-color: rgb(61, 61, 61);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  backdrop-filter: brightness(40%);
}

h1 {
  font-weight: normal;
  font-size: 24px;
  text-shadow: 0px 0px 2px rgba(0,0,0,0.5);
  margin-bottom: 60px;
  color: rgb(255, 255, 255);
}

label {
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  padding-left: 10px;
}

input {
  background-color: rgba(255, 255, 255, 0.3);
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  padding: 0 20px;
  border: none;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
}

button {
  background: rgb(45, 126, 231);
  height: 40px;
  border-radius: 40px;
  border: none;
  margin: 10px 0;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  color: white;
  cursor: pointer;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
}

.background {
  height: 100vh;
  width: 100%;
  background: url('~@/assets/Oficina.jpg');
  background-position: center;
  background-size: cover;
}
</style>
