import apiClient from '@/config/axiosConfig'
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: null,
    role: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
      state.role = user.role
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.role = null;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const url = '/api/usuarios/login'
        
        const response = await apiClient.post(url, credentials)
        const {token, user} = response.data

        commit('setToken', token)
        commit('setUser', user)

        localStorage.setItem('jwtToken', token)

        return true
      } catch (error) {
        console.error(error);
        throw new Error('Credenciais inválidas');
      }
    },

    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('jwtToken')
    },

    initializeStore({ commit }) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        commit('setToken', token);
      }
    },

    async registerUser(credentials) {
      const url = "/api/usuarios"
      
      await apiClient.post(url, credentials)
    }
  },
  modules: {
  }
})
