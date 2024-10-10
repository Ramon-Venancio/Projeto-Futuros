import {Router} from 'express'
import avariasController from '../controllers/avariasController.js'

const router = Router()

router.get('/', avariasController.index)
router.get('/:parametro', avariasController.indexID)

router.post('/:id', avariasController.create)

router.put('/:id', avariasController.update)

router.delete('/', avariasController.delete)
router.delete('/:id', avariasController.deleteID)

export default router