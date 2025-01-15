import Usuario from "../models/usuariosModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const usersController = {
    index: async (req, res) => {
        try {
            const usuarios = await Usuario.find()
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = req.params.id
            let usuario
            
            if (/^[0-9a-fA-F]{24}$/.test(id)) {
                usuario = Usuario.findById(id)
            } else {
                return res.status(404).json({ error: 'ID errado!' })
            }

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
            let dados = req.body

            const usuarioExistente = Usuario.exists( dados.email )

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            dados.password = await bcrypt.hash(String(dados.password), 10)
            dados.role = 'funcionario'

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()
            

            res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: usuarioSalvo })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    createAdmin: async (req, res) => {
        try {
            let dados = req.body
            
            const usuarioExistente = Usuario.exists( dados.email )

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuário já existente' })
            }

            dados.password = await bcrypt.hash(String(dados.password), 10)
            dados.role = 'admin'

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()

            res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: usuarioSalvo })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar usuário' })
        }
    },
    createSuperAdmin: async (req, res) => {
        try {
            let dados = req.body;

            // Valida a chave secreta
            if (dados.secretKey !== process.env.SUPER_ADMIN_KEY) {
                return res.status(403).json({ error: "Chave secreta inválida!" });
            }

            const usuarioExistente = await Usuario.exists( {email: dados.email} );

            if (usuarioExistente) {
                return res.status(409).json({ error: "Usuário já existente!" });
            }
            console.log("antes do password")
            dados.password = await bcrypt.hash(String(dados.password), 10)
            console.log("antes do role")
            dados.role = 'admin'
            console.log("isSuperAdmin")
            dados.isSuperAdmin = true

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()

            res.status(201).json({ message: "Superusuário criado com sucesso!", usuario: usuarioSalvo });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar superusuário" });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body

            const usuarioAtualizado = await Usuario.findByIdAndUpdate( id, novosDados, {
                new: true,
                runValidators: true
            })

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuario não encontrado' })
            }

            res.json({ message: 'Alteração feita com sucesso!', usuario: usuarioAtualizado })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' })
        }
    },
    delete: async (req, res) => {
        try {
            await Usuario.deleteMany()

            res.json({message: 'Todos os usuario foram deletados com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const usuarioRemovido = await Usuario.findByIdAndDelete(id)

            res.json({ message: 'Usuário deletado com sucesso!', usuario: usuarioRemovido })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const usuario = Usuario.findOne({ email })

            if (!usuario) {
                return res.status(401).json({ error: 'Email inválido' })
            }

            const senhaValida = await bcrypt.compare(String(password), usuario.password)

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
            res.json({ token, user: usuario, message: 'Login realizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar logar' })
        }
    }
}

export default usersController