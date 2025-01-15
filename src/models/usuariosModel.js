import mongoose from "mongoose"

const UsuarioSchema = new mongoose.Schema({
    username: { type: 'string', required: true },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    role: { type: 'string', required: true },
    isSuperAdmin: { type: 'boolean', default: false },
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export default Usuario