<template>
  <div>
      <h1>Veiculo</h1>
      <div class="form">
        <VeiculoForm/>
      </div>
  </div>
</template>

<script>
import VeiculoForm from "@/components/VeiculoForm.vue";
export default {
  name: "VeiculoView",
  components: { VeiculoForm },
};
</script>

<style>
.form {
    padding: 20px;
}
</style>