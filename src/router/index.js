import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastroVeiculos from '@/views/CadastroVeiculos.vue'
import Login from '@/views/Login.vue'
import ListaAvarias from '@/views/ListaAvarias.vue'
import ListaVeiculos from '@/views/ListaVeiculos.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/CadastroVeiculos',
    name: 'Cadastro',
    component: CadastroVeiculos
  },
  {
    path: '/HomeView',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ListaAvarias',
    name: 'Avaria',
    component: ListaAvarias
  },
  {
    path: '/ListaVeiculos',
    name: 'Veiculos',
    component: ListaVeiculos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
