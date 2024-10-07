import express from 'express'
import { obterVeiculos, criarVeiculo, obterVeiculoPorId, atualizarVeiculo } from '../controllers/veiculoscontroller.js'

const router = express.Router()

router.get('/veiculos', obterVeiculos)
router.get('/veiculos/:id', obterVeiculoPorId)

router.post('/veiculos', criarVeiculo)

router.put('/veiculos/:id', atualizarVeiculo)

export default router