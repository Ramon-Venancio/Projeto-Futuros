import axios from 'axios'
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
    isFuncionario: (state) => state.role === 'funcionario',
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
    async login({ commit }, { credentials, isAdmin }) {
      try {
        const url = isAdmin ?
          'http://localhost:3000/api/usuarios/admin'
          : 'http://localhost:3000/api/usuarios/login'
        
        const response = await axios.post(url, credentials)
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
  },
  modules: {
  }
})
