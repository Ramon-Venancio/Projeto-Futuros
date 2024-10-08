import { listarVeiculos, adicionarVeiculo, salvarVeiculos } from "../models/veiculosModel.js";

export const obterVeiculos = async (req, res) => {
    try {
        const veiculos = await listarVeiculos()
        res.json(veiculos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar veículos' })
    }
}

export const criarVeiculo = async (req, res) => {
    try {
        const novoVeiculo = req.body
        const veiculoSalvo = await adicionarVeiculo(novoVeiculo)
        res.status(201).json(veiculoSalvo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar veículo' })
    }
}

export const obterVeiculoPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const veiculos = await listarVeiculos()
        const veiculo = veiculos.find(v => v.id === id)

        if (!veiculo) {
            return res.status(400).json({ error: 'Veículo não encontrado' })
        }

        res.json(veiculo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar veículo' })
    }
}

export const atualizarVeiculo = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const novosDados = req.body

        let veiculos = await listarVeiculos()
        const index = veiculos.findIndex(v => v.id === id)

        if (index === -1) {
            return res.status(404).json({ error: 'Veiculo não encontrado' })
        }

        veiculos[index] = {...veiculos[index], ...novosDados}


        await salvarVeiculos(veiculos)
        res.json(veiculos[index])
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar veículo' })
    }
}

export const deletarVeiculo = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        let veiculos = await listarVeiculos()
        const index = veiculos.findIndex(v => v.id === id)
    
        if (index === -1) {
            return res.status(404).json({ error: 'Veiculo não encontrado' })
        }
    

        const veiculoRemovido = veiculos.splice(index,1)
    
        await salvarVeiculos(veiculos)
        res.json(veiculoRemovido)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar veiculo' })
    }
}

export const deletarVeiculos = async (req, res) => {
    let veiculos = await listarVeiculos()

    veiculos.length = 0

    await salvarVeiculos(veiculos)
}