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
            let novoUsuario = req.body
            const usuarios = await listarUsuarios()
            const usuarioExistente = usuarios.find(user => user.email === novoUsuario.email)

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            novoUsuario.password = await bcrypt.hash(String(novoUsuario.password), 10)

            novoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                ...novoUsuario,
                role: "funcionario"
            }

            usuarios.push(novoUsuario)

            await salvarUsuarios(usuarios)

            res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario })
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

            const hashedPassword = await bcrypt.hash(String(password), 10)

            const novoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                username,
                password: hashedPassword,
                email,
                role: "admin"
            };

            usuarios.push(novoUsuario)

            await salvarUsuarios(usuarios)

            res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    createSuperAdmin: async (req, res) => {
        try {
            const { secretKey, username, email, password } = req.body;

            // Valida a chave secreta
            if (secretKey !== process.env.SUPER_ADMIN_KEY) {
                return res.status(403).json({ error: "Chave secreta inválida!" });
            }

            const usuarios = await listarUsuarios();
            const usuarioExistente = usuarios.find(user => user.email === email);

            if (usuarioExistente) {
                return res.status(409).json({ error: "Usuário já existente!" });
            }

            const hashedPassword = await bcrypt.hash(String(password), 10)

            const novoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                username,
                email,
                password: hashedPassword,
                role: "admin",
                isProtected: true
            };

            usuarios.push(novoUsuario);
            await salvarUsuarios(usuarios);

            res.status(201).json({ message: "Superusuário criado com sucesso!", usuario: novoUsuario });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar superusuário" });
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

            res.json({ message: 'Alteração feita com sucesso!', usuario: usuarios[index] })
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

            if (usuarios[index].isProtected) {
                return res.status(403).json({ error: "Este usuário não pode ser deletado" });
            }    

            const usuarioRemovido = usuarios.splice(index, 1)

            await salvarUsuarios(usuarios)

            res.json({ message: 'Usuário deletado com sucesso!', usuario: usuarioRemovido })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const usuarios = await listarUsuarios()
            const usuario = usuarios.find(u => u.email === email)
            console.log(usuario)

            if (!usuario) {
                return res.status(401).json({ error: 'Email inválido' })
            }

            const senhaValida = await bcrypt.compare(String(password), usuario.password)
            console.log(senhaValida)

            if (!senhaValida) {
                return res.status(401).json({ erro: 'Senha inválidos' });
            }
            console.log('JWT Secret:', process.env.JWT_SECRET);
            // Gera o token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, role: usuario.role }, // Payload: dados do usuário
                process.env.JWT_SECRET, // Chave secreta
                { expiresIn: '7d' } // Token válido por 7 dias
            )
            console.log(token)

            // Envia o token para o cliente
            res.json({ token, user: usuario, message: 'Login realizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar logar' })
        }
    }
}

export default usersController