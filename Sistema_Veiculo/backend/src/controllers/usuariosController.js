import { listarUsuarios, salvarUsuarios } from "../models/usuariosModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
    createFuncionario: async (req, res) => {
        try {
            const { username, password, email } = req.body
            const usuarios = await listarUsuarios()
            const usuarioExistente = usuarios.find(user => user.email === email)

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            const novoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                username,
                password,
                email,
                role: "funcionario"
            };

            usuarios.push(novoUsuario)

            await salvarUsuarios(usuarios)

            res.status(201).json({message: 'Usuário criado com sucesso!', usuario: novoUsuario})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    createAdmin: async (req, res) => {
        try {
            const { username, password, email } = req.body
            const usuarios = await listarUsuarios()
            const usuarioExistente = usuarios.find(user => user.email === email)

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            const novoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                username,
                password,
                email,
                role: "admin"
            };

            usuarios.push(novoUsuario)

            await salvarUsuarios(usuarios)

            res.status(201).json({message: 'Usuário criado com sucesso!', usuario: novoUsuario})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const novosDados = req.body
            const usuarios = await listarUsuarios()
            const index = usuarios.findIndex(u => u.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            usuarios[index] = { ...usuarios[index], ...novosDados }

            await salvarUsuarios(usuarios)

            res.json({message: 'Alteração feita com sucesso!', usuario: usuarios[index]})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' })
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

            res.json({message: 'Usuário deletado com sucesso!',usuario: usuarioRemovido})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const usuarios = await listarUsuarios()
            const usuario = usuarios.find(u => u.email === email)

            if (!usuario) {
                return res.status(401).json({ error: 'Email inválido' })
            }
            
            const senhaValida = bcrypt.compare(String(password), usuario.password)

            if (!senhaValida) {
                return res.status(401).json({ erro: 'Senha inválidos' });
            }
            
            // Gera o token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, role: usuario.role }, // Payload: dados do usuário
                process.env.JWT_SECRET, // Chave secreta
                { expiresIn: '7d' } // Token válido por 7 dias
            )

            // Envia o token para o cliente
            res.json({ token, message: 'Login realizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar logar' })
        }
    }
}

export default usersController