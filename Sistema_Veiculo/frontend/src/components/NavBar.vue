<template>
  <div class="navbar">
    <ul>
      <li v-for="link in navLinks" :key="link.path">
        <router-link :to="link.path">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      navLinks: [], // Certifique-se de que o nome esteja correto
    };
  },
  mounted() {
    const ignorarRotas = ["/login", "/cadastrar"];

    // Corrige a referência para `navLinks`
    this.navLinks = this.$router.getRoutes()
      .filter(route => !ignorarRotas.includes(route.path))
      .map(route => ({
        path: route.path,
        name: route.name,
      }));
  },
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
.navbar a {
  color: white;
  text-decoration: none;
}
.navbar a.router-link-active {
  font-weight: bold; /* Realça a página ativa */
  border-bottom: 2px solid white;
}
</style>