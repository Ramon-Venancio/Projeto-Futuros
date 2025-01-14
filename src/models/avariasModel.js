import mongoose from "mongoose"

// Modelo de avaria
const AvariaSchema = new mongoose.Schema({
     idVeiculo: { type: mongoose.Types.ObjectId, ref: 'Veiculo', required: true },
     localizacao: { type: String, required: true },
     descricao: { type: String, required: true },
     data: { type: Date, default: Date.now },
})

const Avaria = mongoose.model('Avaria', AvariaSchema)

export default Avaria