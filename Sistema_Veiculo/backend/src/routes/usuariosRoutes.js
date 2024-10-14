import { Router } from 'express'
import usersController from '../controllers/usuariosController.js'

const router = Router()

router.get("/", usersController.index)
router.get("/:id", usersController.indexID)

router.post("/", usersController.create)

export default router