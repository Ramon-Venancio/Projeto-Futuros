// função para criação de uma rota:
import { Router } from "express"

// Importação dos middlewares:
import verificaToken from "../middleware/verificarToken.js"
import verficaAdmin from "../middleware/verificarAdmin.js"

// Importação das rotas:
import veiculosRoutes from './veiculosRoutes.js'
import avariasRoutes from './avariasRoutes.js'
import usuariosRoutes from './usuariosRoutes.js'

const app = Router()

// Rota de veiculos (Precisa está logado e ser admin)
app.use('/veiculos',verificaToken, verficaAdmin, veiculosRoutes)

// Rota de avarias (Precisa está logado)
app.use('/avarias',verificaToken, avariasRoutes)

// Rota de usuarios
app.use('/usuarios', usuariosRoutes)

export default app