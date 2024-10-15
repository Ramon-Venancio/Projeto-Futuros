import { listarUsuarios, salvarUsuarios } from "../models/usuariosModel.js"
import jwt from 'jsonwebtoken'

const tokens = {}
secretKey = 'Pudim Amassado'

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

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            res.json(usuario)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao procurar usuário' })
        }
    },
    create: async (req, res) => {
        try {
            const novoUsuario = req.body
            const usuarios = await listarUsuarios()
            const usuarioExistente = usuarios.find(user => user.email === novoUsuario.email)

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            if (usuarios.length === 0) {
                novoUsuario.id = 1
            } else {
                const maiorID = usuarios.reduce((maior, atual) => {
                    return atual.id > maior ? atual.id : maior
                }, 0);

                novoUsuario.id = maiorID + 1
            }

            usuarios.push(novoUsuario)
            await salvarUsuarios(usuarios)
            res.status(201).json(novoUsuario)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body
            const usuarios = await listarUsuarios()
            const index = usuarios.findIndex(u => u.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            usuarios[index] = { ...usuarios[index], ...novosDados }

            await salvarUsuarios(usuarios)
            res.json(usuarios[index])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            let usuarios = await listarUsuarios()

            usuarios.length = 0

            await salvarUsuarios(usuarios)
            res.json('Banco de dados deletado com sucesso!')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            let usuarios = await listarUsuarios()
            const index = usuarios.findIndex(a => a.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'usuário não encontrado' })
            }

            const usuarioRemovido = usuarios.splice(index, 1)

            await salvarUsuarios(usuarios)
            res.json(usuarioRemovido)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' })
        }
    },
    login: async (req, res) => {
        try {
            const {username, email, password} = req.body
            const usuarios = await listarUsuarios()
            const usuario = usuarios.find(u => u.username === username && u.email === email && u.password === password)

            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas'})
            }
            
            const token = jwt.sign({id: usuario.id, email: usuario.email}. secretKey, {expiresIn: '1h'})

            tokens[usuario.id] = token

            res.json('login realizado com sucesso!')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar logar' });
        }
    },
    getTokens: (req, res) => {
        res.json(tokens)
    }
}

export default usersController