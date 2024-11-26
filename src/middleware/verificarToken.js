import jwt from 'jsonwebtoken'

const verificaToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') // Pega o token do header

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado ou token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verifica o token com a chave secreta
        req.user = decoded // Adiciona os dados decodificados à requisição (id, email, etc.)
        next() // Passa para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' })
    }
}

export default verificaToken
