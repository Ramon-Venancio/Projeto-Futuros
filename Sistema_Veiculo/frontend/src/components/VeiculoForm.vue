<template>
  <div class="criar-veiculo">
    <h2>Criar Novo Veículo</h2>
    <form @submit.prevent="criarVeiculo">
      <div>
        <label for="modelo">Modelo:</label>
        <input type="text" v-model="veiculo.modelo" id="modelo" required />
      </div>
      <div>
        <label for="placa">Placa:</label>
        <input type="text" v-model="veiculo.placa" id="placa" required />
      </div>
      <div>
        <label for="ano">Ano:</label>
        <input type="number" v-model="veiculo.ano" id="ano" required />
      </div>
      <div>
        <label for="marca">Marca:</label>
        <input type="text" v-model="veiculo.marca" id="marca" required />
      </div>
      <button type="submit">Criar Veículo</button>
    </form>

    <div v-if="message" :class="message.type">
      {{ message.text }}
    </div>
  </div>
</template>
  
<script>
import apiClient from "@/config/axiosConfig";

export default {
  name: "VeiculoForm",
  data() {
    return {
      veiculo: {
        modelo: "",
        placa: "",
        ano: "",
        marca: "",
      },
      message: null,
    };
  },
  methods: {
    async criarVeiculo() {
      try {
        await apiClient.post("/api/veiculos", this.veiculo)
        this.message = {
          type: "success",
          text: "Veículo criado com sucesso!",
        };
        this.veiculo = { modelo: "", placa: "", ano: "", marca: "" };
      } catch (error) {
        this.message = {
          type: "error",
          text: "Erro ao criar veículo. Tente novamente.",
        };
      }
    },
  },
};
</script>
  
<style scoped>
.criar-veiculo {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

form div {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>  