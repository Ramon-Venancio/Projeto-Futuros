import { listarVeiculos, salvarVeiculos } from "../models/veiculosModel.js";

const veiculosController = {
    index: async (req, res) => {
        try {
            const veiculos = await listarVeiculos()
            res.json(veiculos)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar veículos' })
        }
    },
    indexID: async (req, res) => {
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
    },
    create: async (req, res) => {
        try {
            const novoVeiculo = req.body
            const veiculos = await listarVeiculos()

            if (veiculos.length === 0) {
                novoVeiculo.id = veiculos.length + 1;
                veiculos.push(novoVeiculo)
            } else {
                const maiorID = veiculos.reduce((maior,atual) => {
                    return atual.id > maior ? atual.id : maior
                }, 0)
                novoVeiculo.id = maiorID + 1
                veiculos.push(novoVeiculo)
            }

            await salvarVeiculos(veiculos)
            res.status(201).json(novoVeiculo)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar veículo' })
        }
    },
    update: async (req, res) => {
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
    },
    delete: async (req, res) => {
        try {
            let veiculos = await listarVeiculos()
        
            veiculos.length = 0
        
            await salvarVeiculos(veiculos)
            res.json('Banco de dados deletado com sucesso.')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados'})
        }
    },
    deleteID: async (req, res) => {
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
}

export default veiculosController