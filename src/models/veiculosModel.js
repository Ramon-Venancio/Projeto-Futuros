import mongoose from 'mongoose'

// Modelo de veículo
const VeiculoSchema = new mongoose.Schema({
    placa: { type: String, required: true, unique: true },
    modelo: { type: String, required: true },
    marca: { type: String, required: true },
    ano: { type: Number, required: true },
    data_de_manutencao: { type: Date, default: null, },
})

const Veiculo = mongoose.model('Veiculo', VeiculoSchema)

export default Veiculo