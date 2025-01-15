import mongoose from "mongoose";

// Definindo o schema para Manutencao
const manutencaoSchema = new mongoose.Schema({
     idVeiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Veiculo', required: true, },
     idAvarias: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Avaria', required: true} ],
     encarregado: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
     data: { type: Date, required: true },
     finalizado: { type: Boolean, default: false, },
});

// Criando o modelo Manutencao com o schema
const Manutencao = mongoose.model('Manutencao', manutencaoSchema);

export default Manutencao