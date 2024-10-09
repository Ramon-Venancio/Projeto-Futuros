import {Router} from 'express'
import { obterVeiculos, criarVeiculo, obterVeiculoPorId, atualizarVeiculo, deletarVeiculo, deletarVeiculos } from '../controllers/veiculosController.js'

const router = Router()

router.get('/', obterVeiculos)
router.get('/:id', obterVeiculoPorId)

router.post('/', criarVeiculo)

router.put('/:id', atualizarVeiculo)

router.delete('/:id', deletarVeiculo)
router.delete('/', deletarVeiculos)

export default router