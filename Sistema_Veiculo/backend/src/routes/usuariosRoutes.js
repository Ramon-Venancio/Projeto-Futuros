import { Router } from 'express'
import usersController from '../controllers/usuariosController.js'
import verificaToken from '../middleware/verificarToken.js'

const router = Router()

router.get("/",verificaToken, usersController.index)
router.get("/:id",verificaToken, usersController.indexID)
router.get("/tokens", usersController.getTokens)

router.post("/", usersController.create)
router.post("/login". usersController.login)

export default router