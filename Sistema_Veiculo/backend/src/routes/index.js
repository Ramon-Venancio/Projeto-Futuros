import { Router } from "express"
import verificaToken from "../middleware/verificarToken.js"
import veiculosRoutes from './veiculosRoutes.js'
import avariasRoutes from './avariasRoutes.js'
import usuariosRoutes from './usuariosRoutes.js'

const app = Router()

app.use('/veiculos',verificaToken, veiculosRoutes)
app.use('/avarias',verificaToken, avariasRoutes)
app.use('/usuarios', usuariosRoutes)

export default app