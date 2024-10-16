<template>
    <header id="header"> 
      <img :src="logo" alt="Logo da Empresa" class="Logo">
      <h1 class="Titulo">Gestao de veiculos</h1>
    </header>
    <nav>
        <div class="opcoes"> 
          <ul>
            <li><a href="./Home.vue">Home</a></li>
            <li><a href="./Cadastro.vue">Cadastro de veiculos</a></li>
            <li><router-link to="./avarias">Avarias de Veículos</router-link></li>
            <li><router-link to="./lista">Lista de Avarias</router-link></li>
            <li><router-link to="./listaVeiculos">Lista de Veículos</router-link></li>
          </ul>
        </div>
      </nav>
  </template>
  
  <script>
  export default {
    name: 'AppHeaderNav',
    data() {
      return {
        logo: require('@/assets/logo.png')
      };
    }
  }
  </script>
  
  <style scoped>
  #header {
    margin: 0px 20%;
    background-color: #007192;
    padding: 1rem;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  
  .Logo {
    width: 100px;
    height: 100px;
    display: block;
    margin-right: 30px;
  }
  
  .Titulo {
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  
  .opcoes {
    margin: 0 20%;
    padding: 8px;
    background-color: #1683a5;
    border-radius: 0 0 10px 10px;
  }
  
  nav li {
    text-align: center;
    flex: 1;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }
  
  nav a {
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 8px 0;
    display: block;
    border-radius: 25px;
  }
  
  nav a:hover {
    background-color: #2c95b7;
  }
  </style>
  