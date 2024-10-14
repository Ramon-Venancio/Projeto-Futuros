import { Router } from "express";
import veiculosRoutes from './veiculosRoutes.js'
import avariasRoutes from './avariasRoutes.js'
import usuariosRoutes from './usuariosRoutes.js'

const app = Router()

app.use('/veiculos', veiculosRoutes)
app.use('/avarias', avariasRoutes)
app.use('/usuarios', usuariosRoutes)

export default app