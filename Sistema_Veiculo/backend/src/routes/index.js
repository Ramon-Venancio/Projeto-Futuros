import { Router } from "express";
import veiculosRoutes from './veiculosRoutes.js'
import avariasRoutes from './avariasRoutes.js'

const app = Router()

app.use('/veiculos', veiculosRoutes)
app.use('/avarias', avariasRoutes)

export default app