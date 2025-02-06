import Usuario from "../models/usuariosModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const usersController = {
    index: async (req, res) => {
        try {
            const usuarios = await Usuario.find().select('-password')
            
            res.status(200).json(usuarios)
        } catch (error) {
            console.error('Erro ao listar usuarios:', error.message)
            res.status(500).json({ error: 'Erro ao listar usuarios' })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = req.params.id
            
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ error: 'ID errado!' })
            }
            
            const usuario = await Usuario.findById(id).select('-password')
            
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario não encontrado' })
            }

            res.status(200).json(usuario)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error.message)
            res.status(500).json({ error: 'Erro ao procurar usuario' })
        }
    },
    createFuncionario: async (req, res) => {
        try {
            let dados = req.body

            const usuarioExistente = await Usuario.exists( { email: dados.email } )

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuario ja existente' })
            }

            dados.password = await bcrypt.hash(String(dados.password), 10)
            dados.role = 'funcionario'

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()
            

            res.status(201).json({ message: 'Usuario criado com sucesso!', usuario: usuarioSalvo })
        } catch (error) {
            console.error('Erro ao adicionar funcionario:', error.message)
            res.status(500).json({ error: 'Erro ao adicionar usuario' })
        }
    },
    createAdmin: async (req, res) => {
        try {
            let dados = req.body
            
            const usuarioExistente = await Usuario.exists( { email: dados.email } )

            if (usuarioExistente) {
                return res.status(409).json({ error: 'Usuario ja existente' })
            }

            dados.password = await bcrypt.hash(String(dados.password), 10)
            dados.role = 'admin'

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()

            res.status(201).json({ message: 'Usuario criado com sucesso!', usuario: usuarioSalvo })
        } catch (error) {
            console.error('Erro ao adicionar administrador:', error.message)
            res.status(500).json({ error: 'Erro ao adicionar usuario' })
        }
    },
    createSuperAdmin: async (req, res) => {
        try {
            let dados = req.body;

            // Valida a chave secreta
            if (dados.secretKey !== process.env.SUPER_ADMIN_KEY) {
                return res.status(403).json({ error: "Chave secreta invalida!" });
            }

            const usuarioExistente = await Usuario.exists( {email: dados.email} );

            if (usuarioExistente) {
                return res.status(409).json({ error: "Usuario ja existente!" });
            }

            dados.password = await bcrypt.hash(String(dados.password), 10)
            dados.role = 'admin'
            dados.isSuperAdmin = true

            const novoUsuario = new Usuario(dados)
            const usuarioSalvo = await novoUsuario.save()

            res.status(201).json({ message: "Superusuario criado com sucesso!", usuario: usuarioSalvo });
        } catch (error) {
            console.error('Erro ao adicionar super administrador:', error.message)
            res.status(500).json({ error: "Erro ao criar superusuario" });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body

            const usuario = await Usuario.findById(id)

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (novosDados.password) {
                const salt = await bcrypt.genSalt(10);
                novosDados.password = await bcrypt.hash(String(novosDados.password), salt)
            }

            Object.assign(usuario, novosDados)

            await usuario.save()

            res.status(200).json({ message: 'Alteração feita com sucesso!', usuario })
        } catch (error) {
            console.error('Erro ao atualizar usuario:', error.message)
            res.status(500).json({ error: 'Erro ao atualizar usuario' })
        }
    },
    delete: async (req, res) => {
        try {
            await Usuario.deleteMany()

            res.status(200).json({message: 'Todos os usuarios foram deletados com sucesso!'})
        } catch (error) {
            console.error('Erro ao deletar usuarios:', error.message)
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = req.params.id

            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ error: 'ID invalido!' })
            }

            const usuarioRemovido = await Usuario.findByIdAndDelete(id)

            res.status(204).json({ message: 'Usuario deletado com sucesso!', usuario: usuarioRemovido })
        } catch (error) {
            console.error('Erro ao deletar usuario:', error.message)
            res.status(500).json({ error: 'Erro ao deletar usuario' })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const usuario = await Usuario.findOne({ email })

            if (!usuario) {
                return res.status(401).json({ error: 'Email invalido!' })
            }

            const senhaValida = await bcrypt.compare(String(password), usuario.password)

            if (!senhaValida) {
                return res.status(401).json({ erro: 'Senha invalida!' });
            }

            // Gera o token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, role: usuario.role }, // Payload: dados do usuario
                process.env.JWT_SECRET, // Chave secreta
                { expiresIn: '7d' } // Token valido por 7 dias
            )

            // Envia o token para o cliente
            res.status(200).json({ token, user: usuario, message: 'Login realizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar logar' })
        }
    }
}

export default usersController