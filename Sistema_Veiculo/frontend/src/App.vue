<template>
  <div id="app">
  <Header />
  <Navbar />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
