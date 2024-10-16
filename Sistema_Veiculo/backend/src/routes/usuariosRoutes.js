import { Router } from 'express'
import usersController from '../controllers/usuariosController.js'
import verificaToken from '../middleware/verificarToken.js'

const router = Router()

router.get("/", verificaToken, usersController.index)
router.get("/:id", verificaToken, usersController.indexID)

router.post("/", usersController.create)
router.post("/login", usersController.login)

router.put("/:id", verificaToken, usersController.update)

router.delete("/", verificaToken, usersController.delete)
router.delete("/:id", verificaToken, usersController.deleteID)

export default router