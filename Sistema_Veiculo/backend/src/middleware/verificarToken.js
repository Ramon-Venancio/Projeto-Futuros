import jwt from 'jsonwebtoken'
import { tokens } from '../controllers/usuariosController.js' // Acessando o objeto tokens

const verificaToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') // Pega o token do header
    const email = req.header('email') // Pega o email do usuário

    if (!token || !email || tokens[email] !== token) {
        return res.status(401).json({ error: 'Acesso negado ou token inválido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verifica o token
        req.user = decoded // Adiciona os dados decodificados à requisição
        next() // Passa para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' })
    }
}

export default verificaToken