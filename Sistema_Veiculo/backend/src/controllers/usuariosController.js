import { listarUsuarios, salvarUsuarios } from "../models/usuariosModel.js"


const usersController = {
    index: async (req, res) => {
        try {
            const usuarios = await listarUsuarios()
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const usuarios = await listarUsuarios()
            const usuario = usuarios.find(u => u.id === id)

            if(!usuario) {
                res.status(404).json({ error: 'Usuário não encontrado' })
            }

            res.json(usuario)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao procurar usuário' })
        }
    },
    create: async (req, res) => {
        try {
            const novoUsuario = req.body
    
            const usuarios = await listarUsuarios();
    
            const usuarioExistente = usuarios.find(user => user.email === novoUsuario.email);
    
            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' });
            }

            if (usuarios.length === 0) {
                novoUsuario.id = 1;
            } else {
                const maiorID = usuarios.reduce((maior, atual) => {
                    return atual.id > maior ? atual.id : maior;
                }, 0);
    
                novoUsuario.id = maiorID + 1;
            }
    
            usuarios.push(novoUsuario);
            await salvarUsuarios(usuarios);
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' });
        }
    }    
}

export default usersController