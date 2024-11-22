import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Aqui está a URL da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient