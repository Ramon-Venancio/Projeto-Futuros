import { Router } from "express";
import veiculosRoutes from './veiculosRoutes.js'

const app = Router()

app.use('/veiculos', veiculosRoutes)

export default app