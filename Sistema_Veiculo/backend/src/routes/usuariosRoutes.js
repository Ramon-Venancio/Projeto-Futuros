import { Router } from 'express'
import usersController from '../controllers/usuariosController.js'
import verificaToken from '../middleware/verificarToken.js'
import verficaAdmin from '../middleware/verificarAdmin.js'

const router = Router()

router.get("/", verificaToken, verficaAdmin, usersController.index)
router.get("/:id", verificaToken, verficaAdmin, usersController.indexID)

router.post("/", usersController.createFuncionario)
router.post("/admin", verificaToken, verficaAdmin, usersController.createAdmin)
router.post("/login", usersController.login)

router.put("/:id", verificaToken, verficaAdmin, usersController.update)

router.delete("/", verificaToken, verficaAdmin, usersController.delete)
router.delete("/:id", verificaToken, verficaAdmin, usersController.deleteID)

export default router