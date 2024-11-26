const verficaAdmin = (req, res, next) => {
    try {
            const usuarioLogado = req.user
            
            if (usuarioLogado.role !== 'admin') {
                return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem criar contas de administrador.' })
            }

            next()
        } catch (error) {
        
    }
}

export default verficaAdmin