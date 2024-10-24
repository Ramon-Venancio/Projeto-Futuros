import { Router } from "express"
import verificaToken from "../middleware/verificarToken.js"
import verficaAdmin from "../middleware/verificarAdmin.js"
import veiculosRoutes from './veiculosRoutes.js'
import avariasRoutes from './avariasRoutes.js'
import usuariosRoutes from './usuariosRoutes.js'

const app = Router()

app.use('/veiculos',verificaToken, verficaAdmin, veiculosRoutes)
app.use('/avarias',verificaToken, avariasRoutes)
app.use('/usuarios', usuariosRoutes)

export default app