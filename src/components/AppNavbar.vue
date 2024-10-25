<template>
  <header>
    <h1 class="Email">exemplo@dominio.com</h1>
  </header>
  <nav>
          <ul class="Link_rotas">
            <li><router-link to="/HomeView" class="Style">Home</router-link></li>
            <li><router-link to="/CadastroVeiculos" class="Style">Cadastro</router-link></li>
            <li><router-link to="/ListaAvarias" class="Style">ListaAvarias</router-link></li>
            <li><router-link to="/ListaVeiculos" class="Style">ListaVeiculos</router-link></li>
          </ul>
        </nav>
</template>

<script>
export default{
    name: 'AppNavbar'
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.Email{
  font-size: 16px;
  display: block;
  align-items: center;
  margin-left: 20px;
}

  nav a.router-link-exact-active {
  color: #f6f4f4;
    
  }
  .router-link-inactive {
    color: #757575;
  }

  header{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 30px;
    background-color: #212121;
    display: flex;

  }
nav{
width: 100%;
height: 45px ;
background-color: #757575;
display: flex;
align-items: center;
justify-content: center;
}

.Link_rotas{
  list-style: none;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.Link_rotas li{
  margin: 0 25px;
}
nav a{
  text-decoration: none;
  font-size: 25px;
  
}

.Style {
  color: rgb(28, 25, 25);
  text-decoration: none; 
}

</style>