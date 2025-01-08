import mongoose from 'mongoose'
const VeiculoSchema = new mongoose.Schema({
    placa: { type: String, required: true, unique: true },
    modelo: { type: String, required: true },
    marca: { type: String, required: true },
    ano: { type: Number, required: true },
    status: { type: String, default: 'Disponível' },
})

const Veiculo = mongoose.model('Veiculo', VeiculoSchema)

export default Veiculo