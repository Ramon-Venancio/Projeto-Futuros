import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Cadastro from '../components/Cadastro.vue';
import Avarias from '../components/Avarias.vue';
import Lista from '../components/Lista.vue';
import ListaVeiculos from '../components/ListaVeiculos.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props:true
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    props:true
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    props:true
  },
  {
    path: '/avarias',
    name: 'Avarias',
    component: Avarias,
    props:true
  },
  {
    path: '/lista',
    name: 'Lista',
    component: Lista,
    props:true
  },
  {
    path: '/listaVeiculos',
    name: 'ListaVeiculos',
    component: ListaVeiculos,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;