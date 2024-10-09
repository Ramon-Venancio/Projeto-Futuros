import {Router} from 'express'
import veiculosController from '../controllers/veiculosController.js'

const router = Router()

router.get('/', veiculosController.index)
router.get('/:id', veiculosController.indexID)

router.post('/', veiculosController.create)

router.put('/:id', veiculosController.update)

router.delete('/', veiculosController.delete)
router.delete('/:id', veiculosController.deleteID)

export default router