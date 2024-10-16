<template>
  <div id="app">
    <router-view />
  <HeaderNav />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
  name: 'App',
  components: {
    HeaderNav
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
