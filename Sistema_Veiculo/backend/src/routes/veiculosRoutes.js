import express from 'express'
import { obterVeiculos, criarVeiculo, obterVeiculoPorId, atualizarVeiculo, deletarVeiculo, deletarVeiculos } from '../controllers/veiculoscontroller.js'

const router = express.Router()

router.get('/veiculos', obterVeiculos)
router.get('/veiculos/:id', obterVeiculoPorId)

router.post('/veiculos', criarVeiculo)

router.put('/veiculos/:id', atualizarVeiculo)

router.delete('/veiculos/:id', deletarVeiculo)
router.delete('/veiculos', deletarVeiculos)

export default router